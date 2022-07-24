const express = require('express');
const apiRouter = express.Router();

const cardServices = require('./cardServices');
const orderHistoryServices = require('./orderHistoryServices');
const cardOwnerInfoServices = require('./cardOwnerInfoServices');
const accountServices = require('./accountServices');

apiRouter.use('/card', cardServices);
apiRouter.use('/orderhistory', orderHistoryServices);
apiRouter.use('/cardownerinfo', cardOwnerInfoServices);
apiRouter.use('/account', accountServices);

module.exports = apiRouter;