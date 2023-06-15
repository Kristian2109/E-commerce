const { sendInternalServerErrorMessage, computeOffsetOfPage } = require("../utils/helpers");
const Promotion = require("../models/promotion.model");

async function createPromotionHttp(req, res) {
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

async function updatePromotionHttp(req, res) {
    const { promotionId }  = req.params;
    const { title, description, discountRate, startDate, endDate  } = req.body;
    
    try {
        const oldPromotion = await Promotion.getById(promotionId);
        
        if (!oldPromotion) { 
            return res.status(400).json({error: "Invalid promotion id!", success: false});
        }

        const newPromotion = {
            id: promotionId,
            title: title || oldPromotion.title,
            description: description || oldPromotion.description,
            discount_rate: discountRate || oldPromotion.discount_rate,
            start_date: startDate || oldPromotion.start_date,
            end_date: endDate || oldPromotion.end_date,
        }
        console.log(newPromotion);

        await Promotion.update(newPromotion);

        return res.status(201).json({msg: "Promotion updated!", success: true});
    } catch (error) {
        sendInternalServerErrorMessage(res, error);
    }
}

async function deletePromotionHttp(req, res) {
    const { promotionId } = req.params;
    try {

        const promotion = await Promotion.getById(promotionId);

        if (!promotion) {
            return res.status(404).json({msg: "No existing promotion!", success: false});
        }

        await Promotion.removePromotionFromCategories(promotionId);
        await Promotion.removePromotionFromProducts(promotionId);
        await Promotion.deletePromotion(promotionId);

        return res.status(204).json({msg: "Promotion deleted!", success: true});
    } catch (error) {
        sendInternalServerErrorMessage(res, error);
    }
}

async function getPromotionHttp(req, res) {
    const { promotionId } = req.params;
    try {
        const promotion = await Promotion.getById(promotionId);

        if (!promotion) {
            return res.status(404).json({msg: "No existing promotion!", success: false});
        }

        return res.status(200).json({data: promotion, success: true});

    } catch (error) {
        sendInternalServerErrorMessage(res, error);
    }
}

async function getPromotionsWithPaginationHttp(req, res) {
    let { limit, page }= req.query;

    const offset = computeOffsetOfPage(limit, page);

    try {
        const promotions = await Promotion.getPromotionsWithPagination(limit, offset);
        return res.status(200).json({data: promotions, success: true});

    } catch (error) {
        sendInternalServerErrorMessage(res, error);
    }
}

module.exports = {
    createPromotionHttp,
    getPromotionsWithPaginationHttp,
    deletePromotionHttp,
    updatePromotionHttp,
    getPromotionHttp
}