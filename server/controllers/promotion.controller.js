const { sendInternalServerErrorMessage } = require("../utils/helpers");
const Promotion = require("../models/promotion.model");

async function createPromotionForProductHttp(req, res) {
    const { productId } = req.params;
    const { title, description, discountRate, startDate, endDate  } = req.body;
    
    try {
        if (!title || !description || !discountRate || !startDate || !endDate) {
            return res.status(400).json({error: "Invalid data or insufficient data!", success: false});
        }
        await Promotion.create(title, description, discountRate, startDate, endDate);
        return res.status(201).json({error: "Promotion created!", success: true});
    } catch (error) {
        sendInternalServerErrorMessage(res, error);
    }
}

async function createPromotionForCategoryHttp(req, res) {
    
}

async function updatePromotionHttp(req, res) {
    
}

async function deletePromotionHttp(req, res) {
    
}

async function getPromotionHttp(req, res) {
    
}

async function getAllPromotionsHttp(req, res) {
    
}

async function getAllPromotionsForCategoryHttp(req, res) {
    
}

async function getPromotionHttp(req, res) {
    
}

module.exports = {
    createPromotionForProductHttp,
    createPromotionForCategoryHttp,
    getAllPromotionsForCategoryHttp,
    getAllPromotionsHttp,
    deletePromotionHttp,
    updatePromotionHttp,
    getPromotionHttp
}