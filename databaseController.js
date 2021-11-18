const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

var connection = mysql.createConnection({
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  multipleStatements: true
});

connection.connect(function(err) {
  if (err) {
    console.error(`[DB] There was an error connecting:\n ${err.stack}`);
    connection.connect();
    return;
  }
  console.log(`[DB] Database connection is successful. Your connection ID is ${connection.threadId}.`);
});

module.exports = connection;
