const express = require('express');
const businessRouter = express.Router();

const {
    getBusiness,
    updateBusiness,
    getAllBusinesses,
    postBusiness
} = require('../controllers/businessControllers');

businessRouter
    .route('/')
    .get(getAllBusinesses)
    .post(postBusiness);

    businessRouter
    .route('/:id')
    .get(getBusiness)
    .put(updateBusiness);

module.exports = businessRouter;