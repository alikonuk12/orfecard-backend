const express = require('express');
const apiRouter = express.Router();

const cardServices = require('./cardServices');
const orderHistoryServices = require('./orderHistoryServices');
const orderDetailServices = require('./orderDetailServices');
const accountServices = require('./accountServices');
const productServices = require('./productServices');

apiRouter.use('/card', cardServices);
apiRouter.use('/orderhistory', orderHistoryServices);
apiRouter.use('/orderdetail', orderDetailServices);
apiRouter.use('/account', accountServices);
apiRouter.use('/product', productServices);

module.exports = apiRouter;