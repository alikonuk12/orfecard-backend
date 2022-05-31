const { CardOwnerInfo } = require('../models');

const getCardOwnerInfo = async (req, res) => {
    const { id } = req.params;
    const cardOwnerInfo = await CardOwnerInfo.findById(id);
    if (!cardOwnerInfo) return res.json({ status: 'failure' });
    return res.json({ status: 'success', data: cardOwnerInfo });
};

const updateCardOwnerInfo = async (req, res) => {
    const { id } = req.params;
    const cardOwnerInfo = await CardOwnerInfo.findByIdAndUpdate(id, req.body, { new: true });
    if (!cardOwnerInfo) return res.json({ status: 'failure' });
    return res.json({ status: 'success', data: cardOwnerInfo });
};

const getAllCardOwnerInfos = async (req, res) => {
    const cardOwnerInfos = await CardOwnerInfo.find(req.query);
    return res.json({ status: 'success', data: cardOwnerInfos });
};

const postCardOwnerInfo = async (req, res) => {
    const cardOwnerInfo = await CardOwnerInfo.create(req.body);
    if (!cardOwnerInfo) return res.json({ status: 'failure' });
    return res.json({ status: 'success', data: cardOwnerInfo });
};

module.exports = {
    getCardOwnerInfo,
    updateCardOwnerInfo,
    getAllCardOwnerInfos,
    postCardOwnerInfo
};