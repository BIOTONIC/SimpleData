var mysql = require('mysql');
var conf = require('./config');

function connet() {
    var conn = mysql.createConnection({
        host: conf.db.host,
        user: conf.db.user,
        password: conf.db.password,
        database: conf.db.database
    });
    return conn;
}

function insertUser(conn, username, password, callback) {
    console.log('insert into user value(' + username + ',' + password + ');');
    conn.query('insert into user value(?,?);', [username, password], function (err, results, fields) {
        if (err)
            throw err;
        callback(results);
    })
}

function selectUser(conn, username, callback) {
    console.log('select upass from user where uname = "' + username + '";');
    conn.query('select upass from user where uname ="' + username + '";', function (err, results) {
        if (err)
            return err;
        callback(results);
    })
}

function selectStudent(conn, age, callback) {
    console.log('select * from student where sage ="' + age + '";');
    conn.query('select * from student where sage ="' + age + '";', function (err, results) {
        if (err)
            return err;
        callback(results);
    })
}
exports.conect = connet;
exports.insertUser = insertUser;
exports.selectUser = selectUser;
exports.selectStudent = selectStudent;