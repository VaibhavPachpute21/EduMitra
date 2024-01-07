const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel');

// Send message
router.post('/send', async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      message: message
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/conversation/:senderId/:receiverId', async (req, res) => {
    try {
      const { senderId, receiverId } = req.params;
  
      if (!senderId || !receiverId) {
        return res.status(400).json({ message: 'Missing senderId or receiverId' });
      }
  
      const messages = await Message.find({
        $or: [
          { sender: senderId, receiver: receiverId },
          { sender: receiverId, receiver: senderId }
        ]
      });
  
      res.status(200).json({ messages });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


module.exports = router;
