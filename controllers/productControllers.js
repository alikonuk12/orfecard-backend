const { Product } = require('../models');

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id, { _id: 0, productName: 1, price: 1 });
        if (!product) return res.json({ status: 'failure' });
        return res.json({ status: 'success', data: product });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) return res.json({ status: 'failure' });
        return res.json({ status: 'success' });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const products = await Product.find(req.query).limit(limit).skip((page - 1) * limit);
        return res.json({ status: 'success', data: products });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const postProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        if (!product) return res.json({ status: 'failure' });
        return res.json({ status: 'success' });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

module.exports = {
    getProduct,
    updateProduct,
    getAllProducts,
    postProduct
};