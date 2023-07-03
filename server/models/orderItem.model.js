const { db }= require("../config/database");

async function createMany(orderItems, orderId) {
    let query = `Insert into order_items (order_id, product_id, quantity) values`

    for (let i = 0; i < orderItems.length; i++) {
        query += `(${orderId}, ${orderItems[i].productId}, ${orderItems[i].quantity})`;
        if (i != orderItems.length - 1) {
            query += `,`
        }
    }
    console.log(query);

    return new Promise((resolve, reject) => {
        db.query(query, (error, result) => {
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

module.exports = {
    createMany
}