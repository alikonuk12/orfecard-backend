const { Personal, Account, Business } = require('../models');

const getPersonal = async (req, res) => {
    try {
        const { id } = req.params;
        const personal = await Personal.findById(id);
        if (!personal) return res.json({ status: 'failure' });
        return res.json({ status: 'success', data: personal });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const updatePersonal = async (req, res) => {
    try {
        const { id } = req.params;
        const personal = await Personal.findByIdAndUpdate(id, req.body, { new: true });
        if (!personal) return res.json({ status: 'failure' });
        return res.json({ status: 'success' });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const getAllPersonals = async (req, res) => {
    try {
        const personals = await Personal.find(req.query);
        return res.json({ status: 'success', data: personals });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const postPersonal = async (req, res) => {
    try {
        const account = await Account.findById(req.body.account);
        if (account.role !== "Personal") return res.json({ status: 'failure' });
        const business = await Business.find({ account: req.body.account });
        if (business.length > 0) return res.json({ status: 'failure' });
        const personal = await Personal.create(req.body);
        if (!personal) return res.json({ status: 'failure' });
        return res.json({ status: 'success' });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

module.exports = {
    getPersonal,
    updatePersonal,
    getAllPersonals,
    postPersonal
};