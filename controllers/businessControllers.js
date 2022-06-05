const { Business, Account, Personal } = require('../models');

const getBusiness = async (req, res) => {
    try {
        const { id } = req.params;
        const business = await Business.findById(id);
        if (!business) return res.json({ status: 'failure' });
        return res.json({ status: 'success', data: business });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const updateBusiness = async (req, res) => {
    try {
        const { id } = req.params;
        const business = await Business.findByIdAndUpdate(id, req.body, { new: true });
        if (!business) return res.json({ status: 'failure' });
        return res.json({ status: 'success' });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const getAllBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find(req.query);
        return res.json({ status: 'success', data: businesses });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const postBusiness = async (req, res) => {
    try {
        const account = await Account.findById(req.body.account);
        if (account.role !== "Business") return res.json({ status: 'failure' });
        const personal = await Personal.find({ account: req.body.account });
        if (personal.length > 0) return res.json({ status: 'failure' });
        const business = await Business.create(req.body);
        if (!business) return res.json({ status: 'failure' });
        return res.json({ status: 'success' });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

module.exports = {
    getBusiness,
    updateBusiness,
    getAllBusinesses,
    postBusiness
};