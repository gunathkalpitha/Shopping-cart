import express from 'express'
import Category from '../models/Category.js'
import { authenticate, adminOnly } from '../middleware/auth.js'

const router = express.Router()

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create category (Admin only)
router.post('/', authenticate, adminOnly, async (req, res) => {
  try {
    const category = new Category(req.body)
    await category.save()
    res.status(201).json(category)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update category (Admin only)
router.put('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!category) return res.status(404).json({ error: 'Category not found' })
    res.json(category)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete category (Admin only)
router.delete('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id)
    if (!category) return res.status(404).json({ error: 'Category not found' })
    res.json({ message: 'Category deleted' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router
