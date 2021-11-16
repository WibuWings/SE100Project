
const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const {AuthMiddleware} = require('../helper/JWT');
//--------
//these router handle sign in and sign up
router.post("/sign-in-with-gmail-password", authController.authSignInRegular);
router.post("/sign-in-employee", authController.authSignInRegularEmployee);
router.post("/sign-in-with-google", authController.authSignInWithGG);
router.post("/find-password", authController.forgetPassword);
router.post("/register-with-email", authController.register);
router.post("/refresh", AuthMiddleware, authController.refreshUI);

//

//--------
//these router handle authentication and authorization

//
module.exports = router;