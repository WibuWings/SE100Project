const express = require('express');
const router = express.Router();

const myReceipt = require('../controllers/receipt');
const {AuthMiddleware} = require('../helper/JWT');

router.post("/add-reciept", AuthMiddleware ,myReceipt.addReceipt)
router.post("/edit-reciept",AuthMiddleware ,myReceipt.updateReciept)
router.post("/delete-receipt-selected", AuthMiddleware ,myReceipt.deleteReciept)
router.post("/delete-invoice-receipt", AuthMiddleware ,myReceipt.deleteRecieptForce)
router.post("/delete-all-receipt", AuthMiddleware ,myReceipt.deleteRecieptAll)
module.exports = router;