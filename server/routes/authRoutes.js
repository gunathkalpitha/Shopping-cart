import express from 'express'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import User from '../models/User.js'

const router = express.Router()

// Helper function to hash password
const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10)
  return bcryptjs.hash(password, salt)
}

// Helper function to compare password
const comparePassword = async (password, hashedPassword) => {
  return bcryptjs.compare(password, hashedPassword)
}

// Login/Signup route
router.post('/login', async (req, res) => {
  try {
    const { email, password, name } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' })
    }

    let user = await User.findOne({ email })

    if (user) {
      // LOGIN - verify password
      const isPasswordValid = await comparePassword(password, user.password)
      
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' })
      }

      // Password is correct, create token
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'secret_key',
        { expiresIn: '7d' }
      )

      return res.json({
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        token,
      })
    } else {
      // SIGNUP - create new user
      if (!name || name.length < 2) {
        return res.status(400).json({ error: 'Name must be at least 2 characters' })
      }

      // Hash password
      const hashedPassword = await hashPassword(password)

      // Create new user
      user = new User({
        email,
        name,
        password: hashedPassword,
        role: 'user',
      })
      
      await user.save()

      // Create token
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'secret_key',
        { expiresIn: '7d' }
      )

      return res.status(201).json({
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        token,
      })
    }
  } catch (error) {
    console.error('Auth error:', error)
    res.status(400).json({ error: error.message })
  }
})

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key')
    const user = await User.findById(decoded.id)
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    })
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
})

// Create admin account (for development only - add secret key in production)
router.post('/register-admin', async (req, res) => {
  try {
    const { email, password, name, adminSecret } = req.body

    // Simple verification - in production, use environment variable
    if (adminSecret !== 'admin-secret-key-2024') {
      return res.status(403).json({ error: 'Invalid admin secret key' })
    }

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' })
    }

    // Check if user already exists
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create admin user
    user = new User({
      email,
      name,
      password: hashedPassword,
      role: 'admin',
    })
    
    await user.save()

    // Create token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '7d' }
    )

    return res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      token,
    })
  } catch (error) {
    console.error('Admin registration error:', error)
    res.status(400).json({ error: error.message })
  }
})

export default router
