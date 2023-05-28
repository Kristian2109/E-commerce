const authRouter = require("express").Router();
const { loginUserHttp, registerUserHttp, verifyRegistrationHttp } = require("../controllers/customer.controller");

authRouter.post("/login", loginUserHttp);
authRouter.post("/register", registerUserHttp);
authRouter.get("/verifyRegistration/:email", verifyRegistrationHttp);

module.exports = authRouter;
