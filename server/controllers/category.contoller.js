const Category = require("../models/category.model");
const { sendInternalServerErrorMessage } = require("../utils/helpers");

async function createCategoryHttp(req, res) {
    try {
        const { name, description, promotionId } = req.body;

        await Category.create(name, description, promotionId);
        return res.status(201).json({msg: "Category created!", success: true});

    } catch (error) {
        return sendInternalServerErrorMessage(res, error);
    }
}

async function deleteCategoryHttp(req, res) {
    
}

async function updateCategoryHttp(req, res) {
    
}

module.exports = {
    createCategoryHttp,
    deleteCategoryHttp,
    updateCategoryHttp
}