const express = require('express');
const apiRouter = express.Router();

const cardServices = require('./cardServices');

apiRouter.use('/card', cardServices);

module.exports = apiRouter;