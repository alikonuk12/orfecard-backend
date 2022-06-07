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
    protect
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

module.exports = accountRouter;