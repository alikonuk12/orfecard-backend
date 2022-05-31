const express = require('express');
const cardOwnerInfoRouter = express.Router();

const {
    getCardOwnerInfo,
    updateCardOwnerInfo,
    getAllCardOwnerInfos,
    postCardOwnerInfo
} = require('../controllers/cardOwnerInfoControllers');

cardOwnerInfoRouter
    .route('/')
    .get(getAllCardOwnerInfos)
    .post(postCardOwnerInfo);

cardOwnerInfoRouter
    .route('/:id')
    .get(getCardOwnerInfo)
    .put(updateCardOwnerInfo);

module.exports = cardOwnerInfoRouter;