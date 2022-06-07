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
    .get(protect, getAllOrderHistories)
    .post(protect, restrictTo(['Personal', 'Business']), postOrderHistory);

orderHistoryRouter
    .route('/:id')
    .get(protect, getOrderHistory)
    .put(protect, updateOrderHistory);

module.exports = orderHistoryRouter;