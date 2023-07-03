const { 
    createOrderHttp,
    getOrderInfoHttp,
    updateOrderStatusHttp
 } = require("../controllers/order.controller");
const { verifyAuth } = require("../middleware/verifyAuth");

const orderRoute = require("express").Router();

orderRoute.post("/", verifyAuth, createOrderHttp);
orderRoute.get("/:orderId", verifyAuth, getOrderInfoHttp);
orderRoute.patch("/:orderId", verifyAuth, updateOrderStatusHttp);

module.exports = orderRoute;