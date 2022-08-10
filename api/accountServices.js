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
    getCard,
    getCardDetail,
    createCardDetail,
    updateCardDetail,
    deleteCardDetail
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
    .route('/getcard')
    .get(protect, getCard);

accountRouter
    .route('/getcarddetail')
    .post(protect, getCardDetail);

accountRouter
    .route('/createcarddetail')
    .post(protect, createCardDetail);

accountRouter
    .route('/updatecarddetail')
    .put(protect, updateCardDetail);

accountRouter
    .route('/deletecarddetail')
    .delete(protect, deleteCardDetail);

module.exports = accountRouter;