require("dotenv").config();

const mysql = require("mysql");

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE
});

db.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log("MYSQL database running!");
    }
})

module.exports = {
    db
}

