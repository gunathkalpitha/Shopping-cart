const User = require('../models/User');
const generateToken = require('../utils/generateToken');

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = generateToken(user._id, user.email);
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id, user.email);
    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
    });
  } catch (error) {
    next(error);
  }
};

exports.googleLogin = async (req, res, next) => {
  try {
    const { googleId, name, email } = req.body;

    let user = await User.findOne({ googleId });
    if (!user) {
      user = new User({ googleId, name, email });
      await user.save();
    }

    const token = generateToken(user._id, user.email);
    res.json({
      message: 'Google login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

exports.facebookLogin = async (req, res, next) => {
  try {
    const { facebookId, name, email } = req.body;

    let user = await User.findOne({ facebookId });
    if (!user) {
      user = new User({ facebookId, name, email });
      await user.save();
    }

    const token = generateToken(user._id, user.email);
    res.json({
      message: 'Facebook login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

exports.passkeyLogin = async (req, res, next) => {
  try {
    const { passkeyId, name, email } = req.body;

    let user = await User.findOne({ passkeyId });
    if (!user) {
      user = new User({ passkeyId, name, email });
      await user.save();
    }

    const token = generateToken(user._id, user.email);
    res.json({
      message: 'Passkey login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};
