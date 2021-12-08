
const express = require('express');
const router = express.Router();

const couponController = require('../controllers/coupon');
const {AuthMiddleware} = require('../helper/JWT');

router.post('/get', AuthMiddleware, couponController.getCoupon);
router.post('/create', AuthMiddleware, couponController.createCoupon);
router.post('/update', AuthMiddleware, couponController.updateCoupon);
router.post('/delete', AuthMiddleware, couponController.deleteCoupon);

module.exports = router;