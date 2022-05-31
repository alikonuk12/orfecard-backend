const express = require('express');
const cardRouter = express.Router();

const {
    getCard,
    updateCard,
    getAllCards,
    postCard
} = require('../controllers/cardControllers');

cardRouter
    .route('/')
    .get(getAllCards)
    .post(postCard);

cardRouter
    .route('/:id')
    .get(getCard)
    .put(updateCard);

module.exports = cardRouter;