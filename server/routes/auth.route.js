const authRouter = require("express").Router();

const { loginUserHttp,
        registerUserHttp,
        verifyRegistrationHttp,
        logoutCustomerHttp,
        createRestorePasswordUrlHttp,
        restorePasswordHttp } = require("../controllers/customer.controller");

authRouter.post("/login", loginUserHttp);
authRouter.post("/register", registerUserHttp);
authRouter.get("/verifyRegistration/:verifyToken", verifyRegistrationHttp);
authRouter.post("/logout", logoutCustomerHttp);
authRouter.post("/restore-password", createRestorePasswordUrlHttp);
authRouter.patch("/restore-password/:urlToken", restorePasswordHttp);

module.exports = authRouter;
