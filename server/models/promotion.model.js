const { db }= require("../config/database");

async function create(title, description, discountRate, startDate, endDate) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO promotions 
        (title, description, discount_rate, start_date, end_date) VALUES
        ('${title}', '${description}', ${discountRate}, '${startDate}', '${endDate}')`;

        db.query(query, (error, result) => {
            if (error) {
                console.log(error.message);
                reject(error);
            } else if (result) {
                resolve(true);
            } else {
                resolve(null);
            }
        })
    });
}

async function getById(promotionId) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * from promotions 
                    where id = ${Number(promotionId)}`;

        db.query(query, (error, result) => {
            if (error) {
                console.log(error.message);
                reject(error);
            } else if (result.length > 0) {
                resolve(result[0]);
            } else {
                resolve(null);
            }
        })
    });
}

async function update(promotionId, newPromotion) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE promotions set ? where id = ${promotionId}`;

        db.query(query, newPromotion, (error, result) => {
            if (error) {
                console.log(error.message);
                reject(error);
            } else if (result.length > 0) {
                resolve(result[0]);
            } else {
                resolve(null);
            }
        })
    });
}

module.exports = {
    update,
    create,
    getById
}