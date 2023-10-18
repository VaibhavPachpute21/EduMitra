const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role,
            college: req.body.college,
            password: req.body.password,
        });

        const savedUser = await user.save();
        res.status(201).json({ user: savedUser });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
      const user = await userModel.findOne({
        email: req.body.email,
        role: req.body.role,
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (req.body.password !== user.password) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
      );
      res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  


module.exports = router;