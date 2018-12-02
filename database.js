var mysql = require("mysql");

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
