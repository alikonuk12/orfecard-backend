const express = require('express');
const orderHistoryRouter = express.Router();

const {
    getOrderHistory,
    updateOrderHistory,
    getAllOrderHistories,
    postOrderHistory
} = require('../controllers/orderHistoryControllers');

const {
    protect,
    restrictTo
} = require('../controllers/accountControllers');

orderHistoryRouter
    .route('/')
    .get(protect, restrictTo('Admin'), getAllOrderHistories)
    .post(protect, restrictTo('Admin'), postOrderHistory);

orderHistoryRouter
    .route('/:id')
    .get(protect, restrictTo('Admin'), getOrderHistory)
    .put(protect, restrictTo('Admin'), updateOrderHistory);

module.exports = orderHistoryRouter;