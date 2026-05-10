import jwt from 'jsonwebtoken'

// Verify JWT token
export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key')
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}

// Check if user is admin
export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' })
  }

  next()
}
