
const express = require('express');
const router = express.Router();

const couponController = require('../controllers/coupon');
const {AuthMiddleware} = require('../helper/JWT');

router.get('/', AuthMiddleware, couponController.getCoupon);
router.post('/', AuthMiddleware, couponController.createCoupon);
router.put('/', AuthMiddleware, couponController.updateCoupon);
router.delete('/', AuthMiddleware, couponController.deleteCoupon);

module.exports = router;