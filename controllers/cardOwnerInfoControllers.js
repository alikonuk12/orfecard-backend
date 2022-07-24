const { CardOwnerInfo } = require('../models');

const getCardOwnerInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const cardOwnerInfo = await CardOwnerInfo.findById(id);
        if (!cardOwnerInfo) return res.json({ status: 'failure' });
        return res.json({ status: 'success', data: cardOwnerInfo });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const updateCardOwnerInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const cardOwnerInfo = await CardOwnerInfo.findByIdAndUpdate(id, req.body, { new: true });
        if (!cardOwnerInfo) return res.json({ status: 'failure' });
        return res.json({ status: 'success' });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const getAllCardOwnerInfos = async (req, res) => {
    try {
        const cardOwnerInfos = await CardOwnerInfo.find(req.query);
        return res.json({ status: 'success', data: cardOwnerInfos });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const postCardOwnerInfo = async (req, res) => {
    try {
        const cardOwnerInfo = await CardOwnerInfo.create(req.body);
        if (!cardOwnerInfo) return res.json({ status: 'failure' });
        return res.json({ status: 'success' });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

module.exports = {
    getCardOwnerInfo,
    updateCardOwnerInfo,
    getAllCardOwnerInfos,
    postCardOwnerInfo
};