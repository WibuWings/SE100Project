
const express = require('express');
const router = express.Router();

const productController = require('../controllers/product');
const {AuthMiddleware} = require('../helper/JWT');

router.get('/type', AuthMiddleware, productController.getSomeProductTypes);
router.post('/type', AuthMiddleware, productController.createProductType);
router.put('/type', AuthMiddleware, productController.updateProductType);
router.delete('/type', AuthMiddleware, productController.deleteProductType);

router.get('/join', AuthMiddleware, productController.getSomeProductJoins);
router.post('/join', AuthMiddleware, productController.createProductJoin);
router.put('/join', AuthMiddleware, productController.updateProductJoin);
router.delete('/join', AuthMiddleware, productController.deleteProductJoin);

router.get('/', AuthMiddleware, productController.getSomeProducts);
router.post('/', AuthMiddleware, productController.createProduct);
router.put('/', AuthMiddleware, productController.updateProduct);
router.delete('/', AuthMiddleware, productController.deleteProduct);
router.post('/import', AuthMiddleware, productController.importProducts);

module.exports = router;