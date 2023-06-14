const Category = require("../models/category.model");
const { sendInternalServerErrorMessage, computeOffsetOfPage } = require("../utils/helpers");

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
    try {
        const { categoryId } = req.params;

        const result = await Category.deleteById(categoryId);

        if (result.affectedRows < 1) {
            return res.status(200).json({msg: "Category no existing!", success: false});
        }

        return res.status(200).json({msg: "Category deleted!", success: true});

    } catch (error) {
        return sendInternalServerErrorMessage(res, error);
    } 
}

async function updateCategoryHttp(req, res) {
    try {
        const { name, description, promotionId } = req.body;
        const { categoryId } = req.params;

        const oldCategory = await Category.getById(categoryId);

        if (!oldCategory) { 
            return res.status(400).json({error: "Invalid category id!", success: false});
        }

        const newCategory = {
            ...oldCategory,
            name: name || oldCategory.name,
            description: description || oldCategory.description,
            promotion_id: promotionId || oldCategory.promotion_id
        }

        await Category.update(newCategory);
        return res.status(201).json({msg: "Category updated!", data: newCategory, success: true});
    } catch (error) {
        return sendInternalServerErrorMessage(res, error);
    }
}

async function getCategoryHttp(req, res) {
    try {
        const { categoryId } = req.params;

        const result = await Category.getById(categoryId);

        return res.status(200).json({msg: "Category retrieved!", data: result, success: true});

    } catch (error) {
        return sendInternalServerErrorMessage(res, error);
    }
}

async function getCategoriesWithPaginationHttp(req, res) {
    try {
        const { page, limit, sortOrder } = req.query;

        const offset = computeOffsetOfPage(page, limit);
        const result = await Category.getMany(offset, limit, sortOrder);
        return res.status(201).json({msg: "Categories successfully retrieved!", data: result, success: true});

    } catch (error) {
        return sendInternalServerErrorMessage(res, error);
    }
}

module.exports = {
    getCategoryHttp,
    createCategoryHttp,
    deleteCategoryHttp,
    updateCategoryHttp,
    getCategoriesWithPaginationHttp
}