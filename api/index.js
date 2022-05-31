const express = require('express');
const apiRouter = express.Router();

const cardServices = require('./cardServices');
const orderHistoryServices = require('./orderHistoryServices');
const cardOwnerInfoServices = require('./cardOwnerInfoServices');

apiRouter.use('/card', cardServices);
apiRouter.use('/orderhistory', orderHistoryServices);
apiRouter.use('/cardownerinfo', cardOwnerInfoServices);

module.exports = apiRouter;