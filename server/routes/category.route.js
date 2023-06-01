const { createCategoryHttp } = require("../controllers/category.contoller");
const { verifyAuth } = require("../middleware/verifyAuth");

const categoryRouter = require("express").Router();

categoryRouter.post("/", verifyAuth, createCategoryHttp);

module.exports = categoryRouter;