const customerRouter = require("express").Router();
const { updateCustomerAddressHttp,
        updateCustomerDetailsHttp,
        deleteCustomerProfileHttp,
        changePasswordHttp } = require("../controllers/customer.controller");
const { verifyAuth } = require("../middleware/verifyAuth");

customerRouter.post("/:customerId/address", verifyAuth, updateCustomerAddressHttp);
customerRouter.put("/:customerId/details", verifyAuth, updateCustomerDetailsHttp);
customerRouter.patch("/:customerId/password", verifyAuth, changePasswordHttp);
customerRouter.delete("/:customerId", verifyAuth, deleteCustomerProfileHttp);

module.exports = customerRouter;