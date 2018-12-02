var mysql = require("mysql");
var con = mysql.createConnection('mysql://root:Khedia@123@host/Smartify?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700');
//set connection to database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Khedia@123",
  database: "Smartify"
});

var tablename= "users";
module.exports = {
  tablename : tablename,
  connection : con
}
