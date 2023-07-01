const productRouter = require("express").Router();
const { verifyAuth } = require("../middleware/verifyAuth");

const {
    getAllProductsHttp
} = require("../controllers/product.controller");

productRouter.get("/", verifyAuth, getAllProductsHttp);

module.exports = productRouter;