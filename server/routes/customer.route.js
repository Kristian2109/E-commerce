const customerRouter = require("express").Router();
const { updateCustomerAddressHttp, updateCustomerDetailsHttp } = require("../controllers/customer.controller");
const { verifyAuth } = require("../middleware/verifyAuth");

customerRouter.post("/:customerId/address", verifyAuth, updateCustomerAddressHttp);
customerRouter.put("/:customerId/details", verifyAuth, updateCustomerDetailsHttp);

module.exports = customerRouter;