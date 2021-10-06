
const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.post("/sign-in-with-gmail-password", authController.authSignInRegular);
router.post("/sign-in-with-google", authController.authSignInWithGG);
router.post("/find-password", authController.forgetPassword);
router.post("/register-with-email", authController.register);

module.exports = router;