const express = require('express');
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');
const router = express.Router();

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', authMiddleware, adminOnly, categoryController.createCategory);
router.put('/:id', authMiddleware, adminOnly, categoryController.updateCategory);
router.delete('/:id', authMiddleware, adminOnly, categoryController.deleteCategory);

module.exports = router;
