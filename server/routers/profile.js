
const express = require('express');
const router = express.Router();

const meProfilecontroller = require('../controllers/profile');

//router.post("/", meProfilecontroller.verifySignIn);
router.get("/MyProfile",meProfilecontroller.Profile);
router.post("/update-profile",meProfilecontroller.updateProfileData)
router.post("/add-shift", meProfilecontroller)

module.exports = router;