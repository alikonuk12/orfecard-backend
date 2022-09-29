const { OrderDetail } = require('../models');

const getOrderDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const orderDetail = await OrderDetail.findById(id);
        if (!orderDetail) return res.json({ status: 'failure' });
        return res.json({ status: 'success', data: orderDetail });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const updateOrderDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const orderDetail = await OrderDetail.findByIdAndUpdate(id, req.body, { new: true });
        if (!orderDetail) return res.json({ status: 'failure' });
        return res.json({ status: 'success' });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const getAllOrderDetails = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const orderDetails = await OrderDetail.find(req.query).limit(limit).skip((page - 1) * limit);;
        return res.json({ status: 'success', data: orderDetails });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const postOrderDetail = async (req, res) => {
    try {
        const orderDetail = await OrderDetail.create(req.body);
        if (!orderDetail) return res.json({ status: 'failure' });
        return res.json({ status: 'success' });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

module.exports = {
    getOrderDetail,
    updateOrderDetail,
    getAllOrderDetails,
    postOrderDetail
};