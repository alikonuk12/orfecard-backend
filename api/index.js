const express = require('express');
const apiRouter = express.Router();

const cardServices = require('./cardServices');
const orderHistoryServices = require('./orderHistoryServices');

apiRouter.use('/card', cardServices);
apiRouter.use('/orderhistory', orderHistoryServices);

module.exports = apiRouter;