const express = require('express');
const router = express.Router();

const myReceipt = require('../controllers/receipt');
const {AuthMiddleware} = require('../helper/JWT');

router.post("/add-reciept", AuthMiddleware ,myReceipt.addReceipt)
router.post("/edit-reciept",AuthMiddleware ,myReceipt.updateReciept)
router.post("/delete-receipt-selected", AuthMiddleware ,myReceipt.deleteReciept)
router.post("/delete-invoice-receipt", AuthMiddleware ,myReceipt.deleteRecieptForce)
router.post("/delete-all-receipt", AuthMiddleware ,myReceipt.deleteRecieptAll)
router.post("/soft-delete", AuthMiddleware ,myReceipt.deleteRecieptOne)
router.post("/permanently-delete", AuthMiddleware ,myReceipt.deleteRecieptForceOne)
router.post("/restone-receipt", AuthMiddleware ,myReceipt.restoreRecieptOne)
router.post("/restone-all-receipt", AuthMiddleware ,myReceipt.restoreReciept)
module.exports = router;