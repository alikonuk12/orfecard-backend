const { Card } = require('../models');

const getCard = async (req, res) => {
    try {
        const { id } = req.params;
        const card = await Card.findById(id);
        if (!card) return res.json({ status: 'failure' });
        return res.json({ status: 'success', data: card });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const updateCard = async (req, res) => {
    try {
        const { id } = req.params;
        const card = await Card.findByIdAndUpdate(id, req.body, { new: true });
        if (!card) return res.json({ status: 'failure' });
        return res.json({ status: 'success' });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const getAllCards = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const cards = await Card.find(req.query).limit(limit).skip((page - 1) * limit);
        return res.json({ status: 'success', data: cards });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const postCard = async (req, res) => {
    try {
        const card = await Card.create(req.body);
        if (!card) return res.json({ status: 'failure' });
        return res.json({ status: 'success' });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

module.exports = {
    getCard,
    updateCard,
    getAllCards,
    postCard
};