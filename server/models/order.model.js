const { db }= require("../config/database");

async function createOrder(customer_id, address_id) {
    
    const query = "Insert into orders set ?;"

    const parameters = {
        customer_id,
        address_id,
        status: 1
    }

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

async function deleteById(id) {
    
    const query = "delete from orders where ?;"

    return new Promise((resolve, reject) => {
        db.query(query, {id}, (error, result) => {
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

async function getInfoById(id) {
    const query = `SELECT 
                o.id AS order_id,
                o.customer_id,
                o.address_id,
                o.created_at AS creation_date_order,
                s.description AS status_name,
                s.id AS status_id,
                prom.id AS promotion_id,
                prom.title AS promotion_title,
                prom.start_date,
                prom.end_date,
                prom.discount_rate,
                prom.discount_rate,
                i.id AS order_item_id,
                i.quantity,
                p.description AS product_description,
                p.price,
                p.name AS product_name
            FROM
                orders AS o
                    LEFT JOIN
                order_status AS s ON s.id = o.status
                    LEFT JOIN
                order_items AS i ON i.order_id = o.id
                    LEFT JOIN
                products AS p ON p.id = i.product_id
                    LEFT JOIN
                promotions AS prom ON prom.id = p.promotion_id
                    AND NOW() BETWEEN prom.start_date AND prom.end_date
            WHERE ?;`

    return new Promise((resolve, reject) => {
        db.query(query, {"o.id": id}, (error, result) => {
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

async function updateStatus(orderId, orderStatusId) {
    
    const query = "UPDATE orders SET ? WHERE ?;"

    return new Promise((resolve, reject) => {
        db.query(query, [{status: orderStatusId}, {id: orderId}], (error, result) => {
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
    createOrder,
    deleteById,
    getInfoById,
    updateStatus
}