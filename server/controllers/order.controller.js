const Order = require("../models/order.model");
const OrderItem = require("../models/orderItem.model");
const { OUT_OF_STOCK, RELATIONSHIP_ERROR_NO } = require("../constants")

const { sendInternalServerErrorMessage } = require("../utils/helpers");

async function createOrderHttp(req, res) {
    let newOrderId;
    const { addressId, orderItems } = req.body;
    const { id: customerId } = req.user;

    try {
        newOrderId = await Order.createOrder(customerId, addressId);
        
        const orderItemResults = await OrderItem.createMany(orderItems, newOrderId);

        return res.status(201).json({msg: "Order created!", data: {
            newOrderId,
            orderItemResults
        }, success: true});

    } catch (error) {
        if (error.errno === OUT_OF_STOCK) {
            await Order.deleteById(newOrderId);
            return res.status(400).json({ msg: "Products out of stock!", success: false });
        }
        sendInternalServerErrorMessage(res, error);
    }
}

async function getOrderInfoHttp(req, res) {
    try {
        const orderInfo = await Order.getInfoById(req.params.orderId);

        return res.status(200).json({data: orderInfo, success: true});
    } catch (error) {
        sendInternalServerErrorMessage(res, error);
    }
}

async function updateOrderStatusHttp(req, res) {
    const { orderId } = req.params;
    const { orderStatusId } = req.body;

    try {
        const result = await Order.updateStatus( orderId, orderStatusId);

        return res.status(200).json({data: result, success: true});
    } catch (error) {
        if (error.errno === RELATIONSHIP_ERROR_NO) {
            return res.status(400).json({msg: "Invalid status id", success: false});
        }
        sendInternalServerErrorMessage(res, error);
    }
}

module.exports = {
    createOrderHttp,
    getOrderInfoHttp,
    updateOrderStatusHttp
}