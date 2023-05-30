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

module.exports = {
    create
}