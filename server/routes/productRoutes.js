import express from 'express'
import Product from '../models/Product.js'
import { authenticate, adminOnly } from '../middleware/auth.js'

const router = express.Router()

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category })
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create product (Admin only)
router.post('/', authenticate, adminOnly, async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update product (Admin only)
router.put('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete product (Admin only)
router.delete('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: 'Product deleted' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router
