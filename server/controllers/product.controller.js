const { sendInternalServerErrorMessage } = require("../utils/helpers");
const { computeOffsetOfPage } = require("../utils/helpers")
const Product = require("../models/product.model");

async function getAllProductsHttp(req, res) {
    try {
        const { page, limit, sortOrder, maxPrice, minPrice, startDate, endDate, categoryId } = req.query;

        const offset = computeOffsetOfPage(page, limit);

        const products = await Product.getMany(offset, limit ? limit : 20, sortOrder, {
            maxPrice, minPrice, startDate, endDate, categoryId
        })

        return res.status(200).json({data: products, success: true});

    } catch (error) {
        sendInternalServerErrorMessage(res, error);
    }
}

async function getProductsWithFilterHttp(req, res) {
    try {
        
    } catch (error) {
        sendInternalServerErrorMessage(res, error);
    }
}

async function getOneProductHttp(req, res) {
    try {
        
    } catch (error) {
        sendInternalServerErrorMessage(res, error);
    }
}

async function getOneProductsWithPaginationHttp(req, res) {
    try {
        
    } catch (error) {
        sendInternalServerErrorMessage(res, error);
    }
}

async function getCategoriesHttp(req, res) {
    try {
        
    } catch (error) {
        sendInternalServerErrorMessage(res, error);
    }
}

async function getProductsFromCategoryHttp(req, res) {
    try {
        
    } catch (error) {
        sendInternalServerErrorMessage(res, error);
    }
}

async function createProductHttp(req, res) {
    try {
        
    } catch (error) {
        sendInternalServerErrorMessage(res, error);
    }
}

async function updateProductHttp(req, res) {
    try {
        
    } catch (error) {
        sendInternalServerErrorMessage(res, error);
    }
}

module.exports = {
    getAllProductsHttp,
    getOneProductHttp,
    getOneProductsWithPaginationHttp,
    getProductsWithFilterHttp,
    getCategoriesHttp,
    getProductsFromCategoryHttp,
    createProductHttp,
    updateProductHttp
}