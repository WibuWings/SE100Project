const express = require('express');
const router = express.Router();

const myReceipt = require('../controllers/receipt');
const {AuthMiddleware} = require('../helper/JWT');

router.post("/add-reciept", AuthMiddleware ,myReceipt.addReciept)
router.post("/edit-reciept",AuthMiddleware ,myReceipt.updateReciept)

module.exports = router;