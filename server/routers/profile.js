
const express = require('express');
const router = express.Router();

const meProfilecontroller = require('../controllers/profile');

router.post("/", meProfilecontroller.verifySignIn);
router.get("/MyProfile",meProfilecontroller.AuthVerify ,meProfilecontroller.Profile);

module.exports = router;