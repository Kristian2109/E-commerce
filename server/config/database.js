require("dotenv").config();

const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE
});

function connectDatabase() {
    return new Promise((resolve, reject) => {
        db.connect((err) => {
            if (err) {
                console.log(err.message);
                reject(err);
            }
            else {
                console.log("Database running");
                resolve(true);
            }
        }); 
    }) 
}

module.exports = connectDatabase;

