var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

var notLogin = require('../others/middleware').notLogin;
var db = require('../others/db');

router.get('/', notLogin, function (req, res, next) {
    res.render('signup');
})

router.post('/', notLogin, function (req, res, next) {
    var name = req.body.name;
    var password = req.body.password;
    var rePassword = req.body.repassword;

    if (name.length != 3) {
        req.flash('error', 'Name Only Has 3 Words!');
        return res.redirect('/signup');
    }
    else if (password.length < 6 || password.length > 10) {
        req.flash('error', 'Password Must Have 6-10 Words!');
        return res.redirect('/signup');
    }
    else if (password != rePassword) {
        req.flash('error', 'Two Passwords Are Inconsistent');
        return res.redirect('/signup');
    }

    delete rePassword;
    password = sha1(password);

    var conn = db.conect();
    db.insertUser(conn, name, password, function (err) {
        if (err) {
            req.flash('error','Signup Fail!');
            return res.redirect('/signup');
        }
        else{
            req.flash('success', 'Signup Success!');
        }
    })

    delete password;
    req.session.user = name;
    res.redirect('/search');
})

module.exports = router;