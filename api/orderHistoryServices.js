const express = require('express');
const cardRouter = express.Router();

const {
    getOrderHistory,
    updateOrderHistory,
    getAllOrderHistories,
    postOrderHistory
} = require('../controllers/orderHistoryControllers');

cardRouter
    .route('/')
    .get(getAllOrderHistories)
    .post(postOrderHistory);

cardRouter
    .route('/:id')
    .get(getOrderHistory)
    .put(updateOrderHistory);

module.exports = cardRouter;