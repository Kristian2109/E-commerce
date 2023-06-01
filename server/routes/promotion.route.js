const { createPromotionHttp, updatePromotionHttp } = require("../controllers/promotion.controller");
const { verifyAuth } = require("../middleware/verifyAuth");

const promotionRouter = require("express").Router();

promotionRouter.post("/", verifyAuth, createPromotionHttp);
promotionRouter.put("/:promotionId", verifyAuth, updatePromotionHttp);

module.exports = promotionRouter;