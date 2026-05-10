const express = require('express');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');
const router = express.Router();

router.post('/', authMiddleware, orderController.createOrder);
router.get('/', authMiddleware, orderController.getOrders);
router.get('/:id', authMiddleware, orderController.getOrderById);
router.put('/:id/status', authMiddleware, adminOnly, orderController.updateOrderStatus);

module.exports = router;
