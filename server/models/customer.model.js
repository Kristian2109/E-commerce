const { db }= require("../config/database");

async function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        const query = `Select * from customers where ?`;
        console.log(query);
        db.query(query, {"email": email}, (error, result) => {
            if (error) {
                console.log(error.message);
                reject(error);
            } else if (result.length !== 0) {
                resolve(result[0]);
            } else {
                resolve(null);
            }
        })
    });
}

async function create(email, hashedPassowd, firstName, lastName, phoneNumber, roleId) {
    return new Promise((resolve, reject) => {
        const query = `Insert into customers set ?`;
        const customer = {"email": email, "password": hashedPassowd,
                          "first_name": firstName, "last_name": lastName,
                          "phone_number": phoneNumber, "role_id": roleId }
        db.query(query, customer, (error, result) => {
            if (error) {
                console.log(error.message);
                reject(error);
            } else if (result) {
                resolve(result);
            } else {
                resolve(null);
            }
        })
    })
}


module.exports = {
    getUserByEmail,
    create
}