var express = require('express');
var router = express.Router();

var isLogin = require('../others/middleware').isLogin;
var db = require('../others/db');

router.get('/', isLogin, function (req, res, next) {
    req.session.message = null;
    res.render('search');
});

router.post('/', isLogin, function (req, res, next) {
    req.session.message = null;

    var age = req.body.age;

    var conn = db.conect();
    var results = null;
    db.selectStudent(conn, age, function (results) {
        if (results === undefined || results.length < 1) {
            req.flash('error', 'Find Nothing!');
            res.redirect('back');
        } else {
            var len = results.length;
            if (len == 1) {
                req.flash('success', 'Find 1 Result!');
            } else {
                req.flash('success', 'Find ' + len + ' Results!');
            }
            ;
            req.session.message = results;
            res.redirect('/search');
        }
    })
})

module.exports = router;