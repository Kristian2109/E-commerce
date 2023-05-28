require("dotenv").config();

const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE
});

db.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log("Database running");
    }
})

module.exports = {
    db
}

