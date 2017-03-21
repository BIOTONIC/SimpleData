var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

var notLogin = require('../others/middleware').notLogin;
var db = require('../others/db');

router.get('/', notLogin, function (req, res, next) {
    res.render('login');
});

router.post('/', notLogin, function (req, res, next) {
    var name = req.body.name;
    var password = sha1(req.body.password);

    var conn = db.conect();
    var results = null;
    db.selectUser(conn, name, function (results) {
        if (results[0] === undefined) {
            req.flash('error', 'User Doesn\'t Exist!');
            return res.redirect('/login');
        } else if (results[0].upass != password) {
            req.flash('error', 'Username Or Password Is Wrong!');
            return res.redirect('/login');
        } else {
            req.flash('success', 'Login Successful!');
            delete password;
            req.session.user = name;
            res.redirect('/search');
        }
    })
})

module.exports = router;