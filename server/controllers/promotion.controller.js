const { sendInternalServerErrorMessage } = require("../utils/helpers");
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
        console.log(promotionId);
        const oldPromotion = await Promotion.getById(promotionId);
        console.log(oldPromotion);
        
        if (!oldPromotion) { 
            return res.status(400).json({error: "Invalid promotion id!", success: false});
        }

        const newPromotion = {
            title: title || oldPromotion.title,
            description: description || oldPromotion.description,
            discount_rate: discountRate || oldPromotion.discount_rate,
            start_date: startDate || oldPromotion.start_date,
            end_date: endDate || oldPromotion.end_date,
        }
        console.log(newPromotion);

        await Promotion.update(promotionId, newPromotion);

        return res.status(201).json({msg: "Promotion update!", success: true});
    } catch (error) {
        sendInternalServerErrorMessage(res, error);
    }
}

async function deletePromotionHttp(req, res) {
    
}

async function getPromotionHttp(req, res) {
    
}

async function getAllPromotionsHttp(req, res) {
    
}

async function getPromotionHttp(req, res) {
    
}

module.exports = {
    createPromotionHttp,
    getAllPromotionsHttp,
    deletePromotionHttp,
    updatePromotionHttp,
    getPromotionHttp
}