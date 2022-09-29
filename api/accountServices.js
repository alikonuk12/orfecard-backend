const express = require('express');
const accountRouter = express.Router();

const {
    signUp,
    login,
    forgotPassword,
    resetPassword,
    updatePassword,
    getUser,
    updateUser,
    deleteUser,
    logout,
    protect,
    getCard,
    getCardDetail,
    createCardDetail,
    updateCardDetail,
    deleteCardDetail,
    isUserLoggedIn,
    getProfile,
    addToContact,
    sendContactMail,
    giveOrder
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
    .route('/getuser')
    .get(protect, getUser);

accountRouter
    .route('/updateuser')
    .put(protect, updateUser);

accountRouter
    .route('/deleteuser')
    .delete(protect, deleteUser);

accountRouter
    .route('/logout')
    .get(protect, logout);

accountRouter
    .route('/isuserloggedin')
    .get(isUserLoggedIn);

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

accountRouter
    .route('/:profileId')
    .get(getProfile);

accountRouter
    .route('/addtocontact/:profileId')
    .post(addToContact);

accountRouter
    .route('/sendcontactmail')
    .post(sendContactMail);

accountRouter
    .route('/giveorder')
    .post(protect, giveOrder);

module.exports = accountRouter;