const { db }= require("../config/database");


async function getById(id) {
    return new Promise((resolve, reject) => {
        const query = `Select * from categories where ?`;

        db.query(query, {id: Number(id)}, (error, result) => {
            if (error) {
                console.log(error.message);
                reject(error);
            } else if (result) {
                console.log(result);
                resolve(result[0]);
            } else {
                resolve(null);
            }
        })
    });
}

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

async function deleteById(categoryId) {
    return new Promise((resolve, reject) => {

        const query = "DELETE FROM categories where ?";

        db.query(query, {id: categoryId }, (error, result) => {
            if (error) {
                console.log(error.message);
                reject(error);
            } else if (result) {
                resolve(result);
            } else {
                resolve(null);
            }
        })
    });
}

async function update(category) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE categories set ? where ?`;

        db.query(query, [ category, {id: category.id} ], (error, result) => {
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

async function getMany(offset, limit, sortOrder) {
    return new Promise((resolve, reject) => {
        const query = `SELECT 
                            *
                        FROM
                            categories
                        ORDER BY ${sortOrder}
                        LIMIT ${limit} OFFSET ${offset}
                        ;`;

        db.query(query, (error, result) => {
            if (error) {
                console.log(error.message);
                reject(error);
            } else if (result) {
                resolve(result);
            } else {
                resolve(null);
            }
        })
    });
}

module.exports = {
    update,
    create,
    getMany,
    getById,
    deleteById
}