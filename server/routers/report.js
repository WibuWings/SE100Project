const express = require('express');
const router = express.Router();

const report = require('../controllers/report');
const {AuthMiddleware} = require('../helper/JWT');

router.get("/", AuthMiddleware , report.exportReport);
module.exports = router;