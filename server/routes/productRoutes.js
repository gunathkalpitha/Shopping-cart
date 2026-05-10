const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');
const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', authMiddleware, adminOnly, productController.createProduct);
router.put('/:id', authMiddleware, adminOnly, productController.updateProduct);
router.delete('/:id', authMiddleware, adminOnly, productController.deleteProduct);

module.exports = router;
