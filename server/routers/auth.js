
const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.post("/signin-withgmail-password", authController.authSignInRegular);
router.post("/signin-withgoogle", authController.authSignInWithGG);
router.post("/findpasword", authController.forgetPassword);
router.post("/register-with-email", authController.register);

module.exports = router;