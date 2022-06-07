const express = require('express');
const businessRouter = express.Router();

const {
    getBusiness,
    updateBusiness,
    getAllBusinesses,
    postBusiness
} = require('../controllers/businessControllers');

const {
    protect,
    restrictTo
} = require('../controllers/accountControllers');

businessRouter
    .route('/')
    .get(protect, restrictTo('Admin'), getAllBusinesses)
    .post(protect, restrictTo('Business'), postBusiness);

    businessRouter
    .route('/:id')
    .get(protect, restrictTo(['Business', 'Admin']), getBusiness)
    .put(protect, restrictTo(['Business', 'Admin']), updateBusiness);

module.exports = businessRouter;