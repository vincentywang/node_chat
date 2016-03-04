var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : credential.db_host,
  user     : credential.db_user,
  password : credential.db_pwd,
  database : credential.db_database
});

module.exports = connection;