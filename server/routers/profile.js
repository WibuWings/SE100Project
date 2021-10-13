
const express = require('express');
const router = express.Router();

const meProfilecontroller = require('../controllers/profile');
const {AuthMiddleware} = require('../helper/JWT');
//router.post("/", meProfilecontroller.verifySignIn);
router.get("/MyProfile",meProfilecontroller.Profile);
router.post("/update-profile",AuthMiddleware,meProfilecontroller.updateProfileData)


module.exports = router;