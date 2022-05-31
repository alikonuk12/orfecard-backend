const { Card } = require('../models');

const getCard = async (req, res) => {
    const { id } = req.params;
    const card = await Card.findById(id);
    if (!card) return res.json({ status: 'failure' });
    return res.json({ status: 'success', data: card });
};

const updateCard = async (req, res) => {
    const { id } = req.params;
    const card = await Card.findByIdAndUpdate(id, req.body, { new: true });
    if (!card) return res.json({ status: 'failure' });
    return res.json({ status: 'success', data: card });
};

const getAllCards = async (req, res) => {
    const card = await Card.find(req.query);
    return res.json({ status: 'success', data: card });
};

const postCard = async (req, res) => {
    const card = await Card.create(req.body);
    if (!card) return res.json({ status: 'failure' });
    return res.json({ status: 'success', data: card });
};

module.exports = {
    getCard,
    updateCard,
    getAllCards,
    postCard
};