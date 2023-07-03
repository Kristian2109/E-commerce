const { db }= require("../config/database");



function create(title, description, discountRate, startDate, endDate) {
    
    const query = "INSERT INTO promotions set ?, ?, ?, ?, ?";

    const parameters = [
        { title },
        { description } ,
        { discount_rate: discountRate },
        { start_date: startDate },
        { end_date: endDate }
    ];

    return new Promise((resolve, reject) => {
        db.query(query, parameters, (error, result) => {
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

function getById(promotionId) {
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


function update(newPromotion) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE promotions set ? where ?`;

        db.query(query, [newPromotion, {id: newPromotion.id}], (error, result) => {
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

function deletePromotion(promotionId) {
    return new Promise((resolve, reject) => {
        const query = `DELETE from promotions where id = ${promotionId}`;

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

function removePromotionFromCategories(promotionId) {
    return new Promise((resolve, reject) => {
        const query = `update categories set promotion_id = null where promotion_id = ${promotionId}`;

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

function removePromotionFromProducts(promotionId) {
    return new Promise((resolve, reject) => {
        const query = `update products set promotion_id = null where promotion_id = ${promotionId}`;

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

function getPromotionsWithPagination(limit, offset) {
    return new Promise((resolve, reject) => {
        const query = `SELECT 
                            *
                        FROM
                            promotions
                        ORDER BY start_date
                        LIMIT ${limit} OFFSET ${offset}`;
        
        db.query(query, (error, result) => {
            if (error) {
                console.log(error.message);
                reject(error);
            } else if (result.length > 0) {
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
    getById,
    deletePromotion,
    getPromotionsWithPagination,
    removePromotionFromProducts,
    removePromotionFromCategories,
}