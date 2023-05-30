const promotionRouter = require("express").Router();

const { createPromotionForProductHttp } = require("../controllers/promotion.controller");
const { verifyAuth } = require("../middleware/verifyAuth");

promotionRouter.post("/", verifyAuth, createPromotionForProductHttp);

module.exports = promotionRouter;