const express = require('express');
const orderDetailRouter = express.Router();

const {
    getOrderDetail,
    updateOrderDetail,
    getAllOrderDetails,
    postOrderDetail
} = require('../controllers/orderDetailControllers');

const {
    protect,
    restrictTo
} = require('../controllers/accountControllers');

orderDetailRouter
    .route('/')
    .get(protect, restrictTo('Admin'), getAllOrderDetails)
    .post(protect, restrictTo('Admin'), postOrderDetail);

orderDetailRouter
    .route('/:id')
    .get(protect, restrictTo('Admin'), getOrderDetail)
    .put(protect, restrictTo('Admin'), updateOrderDetail);

module.exports = orderDetailRouter;