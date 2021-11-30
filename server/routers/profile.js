
const express = require('express');
const router = express.Router();

const meProfilecontroller = require('../controllers/profile');
const {AuthMiddleware} = require('../helper/JWT');

router.post("/update-profile", AuthMiddleware ,meProfilecontroller.updateProfileData)
router.post("/add-shift",AuthMiddleware ,meProfilecontroller.addShift)
router.post("/update-shift",AuthMiddleware ,meProfilecontroller.updateShift)
router.post("/delete-shift",AuthMiddleware ,meProfilecontroller.deleteShift)
router.post("/change-password",AuthMiddleware,meProfilecontroller.changePassword )
router.post("/update-avatar",AuthMiddleware,meProfilecontroller.updateImage)
router.post("/delete-account", AuthMiddleware,meProfilecontroller.deleteAccount)
router.post("/regulation", AuthMiddleware,meProfilecontroller.regulation)
module.exports = router;
