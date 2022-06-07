const express = require('express');
const cardRouter = express.Router();

const {
    getCard,
    updateCard,
    getAllCards,
    postCard
} = require('../controllers/cardControllers');

const {
    protect,
    restrictTo
} = require('../controllers/accountControllers');

cardRouter
    .route('/')
    .get(protect, getAllCards)
    .post(protect, restrictTo(['Personal', 'Business']), postCard);

cardRouter
    .route('/:id')
    .get(protect, getCard)
    .put(protect, restrictTo(['Business, Personal']), updateCard);

module.exports = cardRouter;