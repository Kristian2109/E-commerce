const customerRouter = require("express").Router();
const { updateCustomerAddressHttp,
        updateCustomerDetailsHttp,
        deleteCustomerProfileHttp,
        getCustomerDataHttp,
        changePasswordHttp } = require("../controllers/customer.controller");
const { verifyAuth } = require("../middleware/verifyAuth");

customerRouter.post("/:customerId/address", verifyAuth, updateCustomerAddressHttp);
customerRouter.put("/:customerId/details", verifyAuth, updateCustomerDetailsHttp);
customerRouter.patch("/:customerId/password", verifyAuth, changePasswordHttp);
customerRouter.delete("/:customerId", verifyAuth, deleteCustomerProfileHttp);
customerRouter.get("/:customerId/profile", verifyAuth, getCustomerDataHttp)

module.exports = customerRouter;