const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Project = require('../models/projectModel');
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized 1' });
  }

  // Verify the token and extract the user's ID
  jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (err, decoded) => {
    console.log(token)
    console.log(process.env.JWT_SECRET_KEY)
    if (err) {
      return res.status(401).json({ message: err });
    }

    req.userId = decoded.userId; // Store the user's ID in the request object
    next();
  });
};

// API to add new Project
router.post('/add', verifyToken, async (req, res) => {
  try {
    const newProject = new Project({
      creator: req.userId,
      creatorInfo: {
        name: req.name,
        profilePic: req.profilePic,
        college: req.college,
      },
      ...req.body,
    });
    const savedProject = await newProject.save();
    res.status(200).json(savedProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API to get all the Project
router.get('/allProject', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json({ projects });
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
});

// API to get user specific project
router.get('/userProject', verifyToken, async (req, res) => {
  try {
    const userProjects = await Project.find({ creator: req.userId })
    res.status(200).json({ userProjects })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
});

// API to get Single Project by id
router.get('/:projectId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/addComment/:projectId', verifyToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const newComment = {
      user: req.userId,
      text: req.body.text,
    };

    project.comments.push(newComment);
    const updatedProject = await project.save();

    res.status(201).json(updatedProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
