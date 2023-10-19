const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');

const malePP = ["https://img.freepik.com/premium-vector/man-character_665280-46969.jpg", "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg", "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&ext=jpg", "https://img.freepik.com/free-vector/handsome-man_1308-85984.jpg", "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg"]
const femalePP = ["https://img.freepik.com/free-vector/3d-cartoon-young-woman-smiling-circle-frame-character-illustration-vector-design_40876-3100.jpg?size=626&ext=jpg", "https://img.freepik.com/free-vector/young-woman-white_25030-39552.jpg", "https://img.freepik.com/free-vector/young-woman-white_25030-39546.jpg", "https://img.freepik.com/premium-photo/cute-emoji-person-speaking-with-no-background-3_634278-1248.jpg", "https://img.freepik.com/free-vector/pop-art-fashion-beautiful-woman-cartoon_18591-52376.jpg"]

// API to Register new user
router.post('/register', async (req, res) => {
  try {
    const user = new userModel({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      gender: req.body.gender,
      role: req.body.role,
      college: req.body.college,
      password: req.body.password,
      profilePic: req.body.gender == "Male" ? malePP[Math.floor(Math.random() * malePP.length)] : femalePP[Math.floor(Math.random() * femalePP.length)],
    });

    const savedUser = await user.save();
    res.status(201).json({ user: savedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// API to Login user
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
      { expiresIn: 86400 }
    );
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;