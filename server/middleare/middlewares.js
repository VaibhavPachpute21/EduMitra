const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const authorizeUserUpdate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
    const userId = decoded.userId;
    if (userId !== req.body._id) {
      return res.status(403).json({ message: 'Unauthorized to update this user data' });
    }
    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.userId = userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authorizeUserUpdate;
