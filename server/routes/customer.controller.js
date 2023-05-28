const customerRouter = require("express").Router();
const { updateCustomerAddressHttp } = require("../controllers/customer.controller");
const { verifyAuth } = require("../middleware/verifyAuth");

customerRouter.post("/address", verifyAuth, updateCustomerAddressHttp);

module.exports = customerRouter;