import express from 'express'
import Order from '../models/Order.js'
import { authenticate, adminOnly } from '../middleware/auth.js'

const router = express.Router()

// Create order (Authenticated users)
router.post('/', authenticate, async (req, res) => {
  try {
    // Add userId to order from authenticated user
    const order = new Order({
      ...req.body,
      userId: req.user.id,
    })
    await order.save()
    res.status(201).json(order)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Get all orders (Admin only)
router.get('/', authenticate, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get user orders (Authenticated users - their own orders only)
router.get('/user/:userId', authenticate, async (req, res) => {
  try {
    // Users can only see their own orders
    if (req.user.id !== req.params.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' })
    }
    const orders = await Order.find({ userId: req.params.userId })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update order status (Admin only)
router.put('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.json(order)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router
