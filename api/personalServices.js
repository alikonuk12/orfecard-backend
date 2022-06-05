const express = require('express');
const personalRouter = express.Router();

const {
    getPersonal,
    updatePersonal,
    getAllPersonals,
    postPersonal
} = require('../controllers/personalControllers');

personalRouter
    .route('/')
    .get(getAllPersonals)
    .post(postPersonal);

personalRouter
    .route('/:id')
    .get(getPersonal)
    .put(updatePersonal);

module.exports = personalRouter;