const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jwt",
});

db.connect((err) => {
  if (err) {
    console.log("Error: " + err.message);
    return;
  }
  console.log("Connected to MySQL Server");
});

module.exports = {
  db,
};
