const { db }= require("../config/database");

async function assignPromotion(productId, promotionId) {
    return new Promise((resolve, reject) => {


        
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

async function getMany(offset, limit, sortOrder, criterias) {
    const maxPrice = criterias.maxPrice || 10000;
    const minPrice = criterias.minPrice || 0;
    const fromDate = criterias.fromDate || new Date(1970).toISOString().slice(0, 19).replace('T', ' ');;
    const toDate = criterias.toDate || new Date().toISOString().slice(0, 19).replace('T', ' ');;
    const categoryId = criterias.categoryId || null;
    const order = sortOrder || 1;

    return new Promise((resolve, reject) => {
        const query = `SELECT 
                            *
                        FROM
                            products
                        WHERE 
                        price >= ${minPrice} AND price <= ${maxPrice} AND
                        created_at >= '${fromDate}' AND created_at <= '${toDate}'
                        `
                        +
                        (categoryId ? `categoryId = ${categoryId}` : "")
                        +
                        `
                        ORDER BY ${order}
                        LIMIT ${limit} OFFSET ${offset};`;

        console.log(query);
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
    })
}

async function create() {
    return new Promise((resolve, reject) => {
        
    });
}

async function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        
    });
}

async function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        
    });
}

module.exports = {
    getMany
}