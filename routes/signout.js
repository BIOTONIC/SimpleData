var express = require('express');
var router = express.Router();

var isLogin = require('../others/middleware').isLogin;

router.get('/', isLogin, function(req, res, next) {
    req.session.user = null;
    req.flash('success', 'Already Signout!');
    res.redirect('/login');
});

module.exports = router;