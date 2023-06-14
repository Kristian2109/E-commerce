const { 
    getCategoriesWithPaginationHttp,
    createCategoryHttp,
    deleteCategoryHttp,
    updateCategoryHttp,
    getCategoryHttp } = require("../controllers/category.controller");
    
const { verifyAuth } = require("../middleware/verifyAuth");

const categoryRouter = require("express").Router();

categoryRouter.post("/", verifyAuth, createCategoryHttp);
categoryRouter.delete("/:categoryId", verifyAuth, deleteCategoryHttp);
categoryRouter.put("/:categoryId", verifyAuth, updateCategoryHttp);
categoryRouter.get("/", verifyAuth, getCategoriesWithPaginationHttp);
categoryRouter.get("/:categoryId", verifyAuth, getCategoryHttp);

module.exports = categoryRouter;