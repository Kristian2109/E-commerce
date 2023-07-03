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
    const startDate = criterias.startDate || "1970-07-03 09:44:20";
    const endDate = criterias.endDate || "2030-07-03 09:44:20";
    const categoryId = criterias.categoryId || null;
    const order = sortOrder || 1;

    console.log(criterias);

    return new Promise((resolve, reject) => {
        const query = `SELECT 
                            p.*, prom.discount_rate, prom.start_date, prom.end_date
                        FROM
                            products as p
                        LEFT JOIN
                            promotions as prom ON prom.id = p.promotion_id
                        WHERE p.is_active AND
                        p.price >= ${minPrice} AND p.price <= ${maxPrice} AND
                        p.created_at >= '${startDate}' AND p.created_at <= '${endDate}'
                        `
                        +
                        (categoryId ? `p.categoryId = ${categoryId}` : "")
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

function create(name, description, price, promotion_id, category_id, in_stock, is_active) {
    
    const query = "INSERT INTO products set ?, ?, ?, ?, ?, ?, ?";

    const parameters = [
        { name },
        { description } ,
        { price },
        { promotion_id },
        { category_id },
        { in_stock },
        { is_active: is_active || false }
    ];

    return new Promise((resolve, reject) => {
        db.query(query, parameters, (error, result) => {
            if (error) {
                reject(error);
            } else if (result) {
                resolve(result.insertId);
            } else {
                resolve(null);
            }
        })
    });
}

async function getById(id) {
    return new Promise((resolve, reject) => {

        const query = `SELECT 
                            p.*, prom.*, c.*
                        FROM
                            products AS p
                                LEFT JOIN
                            categories AS c ON p.category_id = c.id
                                LEFT JOIN 
                            promotions as prom ON p.promotion_id = prom.id
                        WHERE ?`;
    
        db.query(query, {"p.id" :id}, (error, result) => {
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

async function update(updatedProduct) {
    const query = "UPDATE products set ? where ?";

    return new Promise((resolve, reject) => {
        db.query(query, [ updatedProduct, { id: updatedProduct.id} ], (error, result) => {
            if (error) {
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
    getMany,
    getById,
    create,
    update
}