const productRouter = require("express").Router();
const { verifyAuth } = require("../middleware/verifyAuth");

const {
    getManyProductsHttp,
    getOneProductHttp,
    createProductHttp,
    updateProductHttp
} = require("../controllers/product.controller");

productRouter.get("/", verifyAuth, getManyProductsHttp);
productRouter.get("/:productId", verifyAuth, getOneProductHttp);
productRouter.post("/", verifyAuth, createProductHttp);
productRouter.put("/:productId", verifyAuth, updateProductHttp);

module.exports = productRouter;