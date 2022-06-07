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
    .get(protect, restrictTo(['Business', 'Admin']), getAllCardOwnerInfos)
    .post(protect, restrictTo(['Business', 'Personal']), postCardOwnerInfo);

cardOwnerInfoRouter
    .route('/:id')
    .get(protect, getCardOwnerInfo)
    .put(protect, restrictTo(['Business', 'Personal']), updateCardOwnerInfo);

module.exports = cardOwnerInfoRouter;