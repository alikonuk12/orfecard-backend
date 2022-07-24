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
    .get(protect, restrictTo('Admin'), getAllCards)
    .post(protect, restrictTo('Admin'), postCard);

cardRouter
    .route('/:id')
    .get(protect, restrictTo('Admin'), getCard)
    .put(protect, restrictTo('Admin'), updateCard);

module.exports = cardRouter;