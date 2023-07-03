const { RELATIONSHIP_ERROR_NO } = require("../constants");
const { sendInternalServerErrorMessage,
        getSortOrderParameter,
        computeOffsetOfPage 
    } = require("../utils/helpers");
const Product = require("../models/product.model");

async function getManyProductsHttp(req, res) {
    try {
        const { page, limit, sortOrder, maxPrice, minPrice, startDate, endDate, categoryId, quantity } = req.query;

        const offset = computeOffsetOfPage(page, limit);

        const sortOrderParameter = getSortOrderParameter(sortOrder);

        const products = await Product.getMany(offset, limit ? limit : 20, sortOrderParameter, {
            maxPrice, minPrice, startDate, endDate, categoryId
        })

        return res.status(200).json({data: products, success: true});

    } catch (error) {
        sendInternalServerErrorMessage(res, error);
    }
}

async function getOneProductHttp(req, res) {
    try {
        const product = await Product.getById(req.params.productId);

        return res.status(200).json({data: product, success: true});
    } catch (error) {
        sendInternalServerErrorMessage(res, error);
    }
}

async function createProductHttp(req, res) {
    try {
        console.log(req.body);

        const { description, price, name, promotionId, categoryId, inStock, isActive } = req.body;

        if (!description || ! price || !name || !inStock || !categoryId) {
            return res.status(400).json({msg: "Missing necessary data!", success: false});
        }
        
        const newProductId = await Product.create(name, description, price, promotionId, categoryId, inStock, isActive)

        return res.status(200).json({data: { newProductId }, success: true});
    }
    catch (error) {
        if (error.errno === RELATIONSHIP_ERROR_NO) {
            return res.status(400).json({msg: "Invalid relationship with categories or promotions!", success: false});
        }
        return sendInternalServerErrorMessage(res, error);
    }
}

async function updateProductHttp(req, res) {
    try {
        const productId = req.params.productId; 
        const { description, price, name, promotionId, categoryId, inStock, isActive } = req.body;

        const oldProduct = await Product.getById(productId);

        if (!oldProduct) { 
            return res.status(400).json({error: "Invalid product id!", success: false});
        }

        const newProduct = {
            id: productId,
            name: name || oldProduct.name,
            description: description || oldProduct.description,
            price: price || oldProduct.price,
            promotion_id: promotionId || oldProduct.promotion_id,
            category_id: categoryId || oldProduct.category_id,
            in_stock: inStock || oldProduct.in_stock,
            is_active: isActive || oldProduct.is_active
        }

        await Product.update(newProduct);

        return res.status(201).json({msg: "Product updated!", success: true});

    } catch (error) {
        if (error.errno === RELATIONSHIP_ERROR_NO) {
            return res.status(400).json({msg: "Invalid relationship with categories or promotions!", success: false});
        }
        sendInternalServerErrorMessage(res, error);
    }
}

module.exports = {
    getManyProductsHttp,
    getOneProductHttp,
    createProductHttp,
    updateProductHttp,
}