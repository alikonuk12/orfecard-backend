const { OrderHistory } = require('../models');

const getOrderHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const orderHistory = await OrderHistory.findById(id);
        if (!orderHistory) return res.json({ status: 'failure' });
        return res.json({ status: 'success', data: orderHistory });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const updateOrderHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const orderHistory = await OrderHistory.findByIdAndUpdate(id, req.body, { new: true });
        if (!orderHistory) return res.json({ status: 'failure' });
        return res.json({ status: 'success' });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const getAllOrderHistories = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const orderHistories = await OrderHistory.find(req.query).limit(limit).skip((page - 1) * limit);;
        return res.json({ status: 'success', data: orderHistories });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const postOrderHistory = async (req, res) => {
    try {
        const orderHistory = await OrderHistory.create(req.body);
        if (!orderHistory) return res.json({ status: 'failure' });
        return res.json({ status: 'success' });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

module.exports = {
    getOrderHistory,
    updateOrderHistory,
    getAllOrderHistories,
    postOrderHistory
};