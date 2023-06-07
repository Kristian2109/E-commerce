const { createPromotionHttp,
        updatePromotionHttp,
        deletePromotionHttp,
        getPromotionHttp,
        getPromotionsWithPaginationHttp } = require("../controllers/promotion.controller");
const { verifyAuth } = require("../middleware/verifyAuth");

const promotionRouter = require("express").Router();

promotionRouter.post("/", verifyAuth, createPromotionHttp);
promotionRouter.put("/:promotionId", verifyAuth, updatePromotionHttp);
promotionRouter.delete("/:promotionId", verifyAuth, deletePromotionHttp);
promotionRouter.get("/:promotionId", verifyAuth, getPromotionHttp);
promotionRouter.get("/", verifyAuth, getPromotionsWithPaginationHttp);

module.exports = promotionRouter;