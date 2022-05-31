const express = require('express');
const orderHistoryRouter = express.Router();

const {
    getOrderHistory,
    updateOrderHistory,
    getAllOrderHistories,
    postOrderHistory
} = require('../controllers/orderHistoryControllers');

orderHistoryRouter
    .route('/')
    .get(getAllOrderHistories)
    .post(postOrderHistory);

orderHistoryRouter
    .route('/:id')
    .get(getOrderHistory)
    .put(updateOrderHistory);

module.exports = orderHistoryRouter;