const express = require('express');
const cardOwnerInfoRouter = express.Router();

const {
    getCardOwnerInfo,
    updateCardOwnerInfo,
    getAllCardOwnerInfos,
    postCardOwnerInfo
} = require('../controllers/cardOwnerInfoControllers');

const {
    protect,
    restrictTo
} = require('../controllers/accountControllers');

cardOwnerInfoRouter
    .route('/')
    .get(protect, restrictTo('Admin'), getAllCardOwnerInfos)
    .post(protect, restrictTo('Admin'), postCardOwnerInfo);

cardOwnerInfoRouter
    .route('/:id')
    .get(protect, restrictTo('Admin'), getCardOwnerInfo)
    .put(protect, restrictTo('Admin'), updateCardOwnerInfo);

module.exports = cardOwnerInfoRouter;