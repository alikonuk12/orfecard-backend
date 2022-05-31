const { OrderHistory } = require('../models');

const getOrderHistory = async (req, res) => {
    const { id } = req.params;
    const orderHistory = await OrderHistory.findById(id);
    if (!orderHistory) return res.json({ status: 'failure' });
    return res.json({ status: 'success', data: orderHistory });
};

const updateOrderHistory = async (req, res) => {
    const { id } = req.params;
    const orderHistory = await OrderHistory.findByIdAndUpdate(id, req.body, { new: true });
    if (!orderHistory) return res.json({ status: 'failure' });
    return res.json({ status: 'success', data: orderHistory });
};

const getAllOrderHistories = async (req, res) => {
    const orderHistories = await OrderHistory.find(req.query);
    return res.json({ status: 'success', data: orderHistories });
};

const postOrderHistory = async (req, res) => {
    const orderHistory = await OrderHistory.create(req.body);
    if (!orderHistory) return res.json({ status: 'failure' });
    return res.json({ status: 'success', data: orderHistory });
};

module.exports = {
    getOrderHistory,
    updateOrderHistory,
    getAllOrderHistories,
    postOrderHistory
};