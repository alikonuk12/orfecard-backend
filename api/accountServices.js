const express = require('express');
const accountRouter = express.Router();

const {
    signUp,
    login,
    forgotPassword,
    resetPassword,
    updatePassword,
    deleteUser,
    logout,
    protect,
    getCardOwnerInfo,
    getCardOwnerInfoDetail,
    createCardOwnerInfoDetail,
    updateCardOwnerInfoDetail,
    deleteCardOwnerInfoDetail
} = require('../controllers/accountControllers');

accountRouter
    .route('/signup')
    .post(signUp);

accountRouter
    .route('/login')
    .post(login);

accountRouter
    .route('/forgotpassword')
    .post(forgotPassword);

accountRouter
    .route('/resetpassword/:token')
    .put(resetPassword);

accountRouter
    .route('/updatepassword')
    .put(protect, updatePassword);

accountRouter
    .route('/deleteuser')
    .delete(protect, deleteUser);

accountRouter
    .route('/logout')
    .get(protect, logout);

accountRouter
    .route('/getcardownerinfo')
    .get(protect, getCardOwnerInfo);

accountRouter
    .route('/getcardownerinfodetail')
    .post(protect, getCardOwnerInfoDetail);

accountRouter
    .route('/createcardownerinfodetail')
    .post(protect, createCardOwnerInfoDetail);

accountRouter
    .route('/updatecardownerinfodetail')
    .put(protect, updateCardOwnerInfoDetail);

accountRouter
    .route('/deletecardownerinfodetail')
    .delete(protect, deleteCardOwnerInfoDetail);

module.exports = accountRouter;