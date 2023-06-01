const { db }= require("../config/database");

async function create(name, description, promotionId) {
    return new Promise((resolve, reject) => {
        const queryWithoutPromotion = `INSERT INTO categories 
        (name, description) VALUES
        ('${name}', '${description}')`;

        const queryWithPromotion = `INSERT INTO categories 
        (name, description, promotion_id) VALUES
        ('${name}', '${description}', ${promotionId})`;

        let query = queryWithoutPromotion;
        if (promotionId !== null) {
            query = queryWithPromotion;
        }

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