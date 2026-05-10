const jwt = require('jsonwebtoken');

module.exports = (userId, email) => {
  return jwt.sign(
    { userId, email },
    process.env.JWT_SECRET || 'your_secret_key',
    { expiresIn: '7d' }
  );
};
