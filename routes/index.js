var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('/login');
});

router.use('/login', require('./login'));
router.use('/signup', require('./signup'));
router.use('/search', require('./search'));
router.use('/signout', require('./signout'));

router.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = router;
