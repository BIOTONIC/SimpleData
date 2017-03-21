var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mysql = require('mysql');
var flash = require('connect-flash');
var conf = require('./others/config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// use body parser so we can grab information from POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('Secret'));
app.use(session({
    secret: 'Secret',
    resave: false,
    saveUninitialized: true
}))
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

app.locals.conf = {
    title: conf.title,
    desc: conf.desc,
    author: conf.author
}

app.use(function(req, res, next){
    res.locals.user = req.session.user;
    res.locals.message = req.session.message;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});

app.use('/', require('./routes/index'));

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
