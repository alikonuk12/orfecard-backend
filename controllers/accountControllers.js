const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { promisify } = require('util');
const { Account, Card } = require('../models');
const { SendEmail } = require('../utils');

const signToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = async (account, res) => {
    const token = signToken(account._id);

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    };

    res.cookie('jwt', token, cookieOptions);

    return res.json({
        status: 'success',
        data: { email: account.email, role: account.role }
    });
};

const signUp = async (req, res) => {
    try {
        const email = await Account.findOne({ email: req.body.email });
        if (email) return res.json({ status: 'failure', data: 'Already Registed' });

        const account = await Account.create(req.body);

        createSendToken(account, res);
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.json({ status: 'failure', data: 'No email or password' });

        const account = await Account.findOne({ email: email }).select('+password');

        if (!account || !(await account.correctPassword(password, account.password))) {
            return res.json({ status: 'failure', data: 'Incorrect email or password' });
        }

        createSendToken(account, res);
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) return res.json({ status: 'failure', data: 'No authorization' });

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentAccount = await Account.findById(decoded.id);

    if (!currentAccount) return res.json({ status: 'failure', data: 'No exist account' });

    if (await currentAccount.changedPasswordAfter(decoded.iat)) return res.json({ status: 'failure', data: 'Password changed. Log in again' });

    req.user = currentAccount;
    next();
};

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.json({ status: 'failure', data: 'No permission' });
        }
        next();
    }
};

const forgotPassword = async (req, res) => {
    const account = await Account.findOne({ email: req.body.email });
    if (!account) return res.json({ status: 'failure', data: 'No exist account' });

    const resetToken = account.createPasswordResetToken();
    await account.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://localhost:3000/resetpassword/${resetToken}`;
    const message = `<html><body><a href=${resetURL}>Click For Change Password</a></body></html>`;

    try {
        await SendEmail({
            email: account.email,
            subject: 'Şifre Yenileme Linki',
            message
        });

        return res.json({ status: 'success' });
    } catch (error) {
        console.log(error);
        account.passwordResetToken = undefined;
        account.passwordResetExpires = undefined;
        await account.save({ validateBeforeSave: false });
        return res.json({ status: 'error' });
    }
};

const resetPassword = async (req, res) => {
    try {
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const account = await Account.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });

        if (!account) return res.json({ status: 'failure', data: 'No exist account' });

        account.password = req.body.password;
        account.passwordResetToken = undefined;
        account.passwordResetExpires = undefined;
        await account.save();
        createSendToken(account, res);
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const updatePassword = async (req, res) => {
    try {
        const account = await Account.findById(req.user.id).select('+password');
        if (!(await account.correctPassword(req.body.currentPassword, account.password))) {
            return res.json({ status: 'failure', data: 'Incorrect password' });
        }

        account.password = req.body.newPassword;
        await account.save();
        createSendToken(account, res);
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        await Account.findByIdAndUpdate(req.user.id, { activate: false });
        return res.json({ status: 'success' });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const logout = (req, res) => {
    try {
        res.clearCookie('jwt');
        return res.json({ status: 'success' });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
};

const getCard = async (req, res) => {
    try {
        const cards = await Card.find({ account: req.user.id }, { _id: 0, name: 1, lastname: 1, email: 1, phoneNumber: 1, image: 1, serialNumber: 1 });
        if (!cards) return res.json({ status: 'failure' });
        return res.json({ status: 'success', data: cards });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
}

const getCardDetail = async (req, res) => {
    try {
        const cardDetail = await Card.findOne({ account: req.user.id, serialNumber: req.body.serialNumber }, { _id: 0, __v: 0, account: 0 });
        if (!cardDetail) return res.json({ status: 'failure' });
        return res.json({ status: 'success', data: cardDetail });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
}

const createCardDetail = async (req, res) => {
    try {
        const newCardDetail = await Card.create({ ...req.body, account: req.user.id });
        if (!newCardDetail) return res.json({ status: 'failure' });
        return res.json({ status: 'success' });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
}

const updateCardDetail = async (req, res) => {
    try {
        const cards = await Card.findOneAndUpdate({ account: req.user.id, serialNumber: req.body.serialNumber }, { ...req.body, updatedAt: Date.now() });
        if (!cards) return res.json({ status: 'failure' });
        return res.json({ status: 'success' });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
}

const deleteCardDetail = async (req, res) => {
    try {
        const cards = await Card.findOneAndUpdate({ account: req.user.id, serialNumber: req.body.serialNumber }, { activate: false });
        if (!cards) return res.json({ status: 'failure' });
        return res.json({ status: 'success' });
    } catch (error) {
        console.log(error);
        return res.json({ status: 'error' });
    }
}

module.exports = {
    signUp,
    login,
    protect,
    restrictTo,
    forgotPassword,
    resetPassword,
    updatePassword,
    deleteUser,
    logout,
    getCard,
    getCardDetail,
    createCardDetail,
    updateCardDetail,
    deleteCardDetail
};