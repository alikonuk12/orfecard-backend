const express = require('express');
const productRouter = express.Router();

const {
    getProduct,
    updateProduct,
    getAllProducts,
    postProduct
} = require('../controllers/productControllers');

const {
    protect,
    restrictTo
} = require('../controllers/accountControllers');

productRouter
    .route('/')
    .get(getAllProducts)
    .post(protect, restrictTo('Admin'), postProduct);

productRouter
    .route('/:id')
    .get(getProduct)
    .put(protect, restrictTo('Admin'), updateProduct);

module.exports = productRouter;