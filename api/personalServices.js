const express = require('express');
const personalRouter = express.Router();

const {
    getPersonal,
    updatePersonal,
    getAllPersonals,
    postPersonal
} = require('../controllers/personalControllers');

const {
    protect,
    restrictTo
} = require('../controllers/accountControllers');

personalRouter
    .route('/')
    .get(protect, restrictTo('Admin'), getAllPersonals)
    .post(protect, restrictTo('Personal'), postPersonal);

personalRouter
    .route('/:id')
    .get(protect, restrictTo(['Personal', 'Admin']), getPersonal)
    .put(protect, restrictTo(['Personal', 'Admin']), updatePersonal);

module.exports = personalRouter;