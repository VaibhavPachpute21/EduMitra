const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const Event = require('../models/eventModel');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized 1' });
  }
  jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (err, decoded) => {
    console.log(token)
    console.log(process.env.JWT_SECRET_KEY)
    if (err) {
      return res.status(401).json({ message: err });
    }

    req.userId = decoded.userId;
    next();
  });
};

// API to add a new event
router.post('/add', verifyToken, async (req, res) => {
  try {
    const newEvent = new Event({
      organizer: req.body.organizer,
      eventName: req.body.eventName,
      eventDescription: req.body.eventDescription,
      eventType: req.body.eventType,
      eventDate: req.body.eventDate,
      location: req.body.location,
      eventImage: req.body.eventImage,
      contactEmail: req.body.contactEmail,
      createdBy: req.userId,
      eventImage: req.body.eventImage,
    });

    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API to get all events
router.get('/allEvents', async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json({ events });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// API to add a comment to an event
router.post('/addComment/:eventId', verifyToken, async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const newComment = {
      userId: req.userId,
      text: req.body.text,
    };

    event.comments.push(newComment);
    const updatedEvent = await event.save();

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API to update an event
router.put('/update/:eventId', verifyToken, async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    event.eventName = req.body.eventName;
    event.eventDescription = req.body.eventDescription;
    event.eventType = req.body.eventType;
    event.eventDate = req.body.eventDate;
    event.location = req.body.location;

    const updatedEvent = await event.save();
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API to delete an event
router.delete('/delete/:eventId', verifyToken, async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await event.remove();
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

