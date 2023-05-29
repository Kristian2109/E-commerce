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

async function getById(id) {
    return new Promise((resolve, reject) => {
        const query = `Select id, first_name, last_name, email, phone_number, created_at, created_at from customers where ?`;
        console.log(query);
        db.query(query, {"id": id}, (error, result) => {
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

async function update(user) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE customers 
                    SET 
                        first_name = '${user.first_name}',
                        last_name = '${user.last_name}',
                        phone_number = '${user.phone_number}'
                    where id = ${user.id}`;

        console.log(query);
        db.query(query, (error, result) => {
            if (error) {
                console.log(error.message);
                reject(error);
            } else if (result) {
                resolve(true);
            }
        })
    })
}

async function updatePassword(email, newPassword) {
    return new Promise((resolve, reject) => {
        console.log(email, newPassword)
        const query = `UPDATE customers 
                    SET 
                        password = '${newPassword}'
                    where email = ${email}`;

        console.log(query);
        db.query(query, (error, result) => {
            if (error) {
                console.log(error.message);
                reject(error);
            } else if (result) {
                resolve(true);
            }
        })
    })
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
    updatePassword,
    getUserByEmail,
    getById,
    update,
    create
}