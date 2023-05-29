const authRouter = require("express").Router();
const { loginUserHttp, registerUserHttp, verifyRegistrationHttp, logoutCustomerHttp } = require("../controllers/customer.controller");

authRouter.post("/login", loginUserHttp);
authRouter.post("/register", registerUserHttp);
authRouter.get("/verifyRegistration/:email", verifyRegistrationHttp);
authRouter.post("/logout", logoutCustomerHttp);

module.exports = authRouter;
