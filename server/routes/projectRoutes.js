const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Project = require('../models/projectModel');
const userModel = require('../models/userModel')
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
    const projects = (await Project.find({})).reverse();
    res.status(200).json({ projects });
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
});

router.get('/getDashboardData', async (req, res) => {
  try {
    const latestProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(4);

    const popularUsers = await userModel.find()
      .sort({ uViews: -1 })
      .limit(4);

    const popularProjects = await Project.find()
      .sort({ views: -1 })
      .limit(4);

    const dashboardData = {
      latestProjects,
      popularUsers,
      popularProjects,
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Internal server error' });
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
    project.views = project.views + 1;
    await project.save();
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Projects by Collage
router.get('/collageProject/:collegeName', async (req, res) => {
  try {
    const collegeName = req.params.collegeName;

    // Query the database to find projects with the specified college name
    const projects = await Project.find({ 'creatorInfo.college': collegeName });

    if (projects.length === 0) {
      return res.status(404).json({ message: 'No projects found for this college name.' });
    }

    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add New comment
router.post('/addComment/:projectId', verifyToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    const uname = await userModel.findById(req.userId)
    const newComment = {
      user: req.userId,
      text: req.body.text,
      name: uname.name
    };

    project.comments.push(newComment);
    const updatedProject = await project.save();

    res.status(201).json(updatedProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add Grades to Project
router.post('/addGrades/:projectId', verifyToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    project.grades = {
      CQ: req.body.CQ,
      EC: req.body.EC,
      PC: req.body.PC,
    };
    const updatedProject = await project.save();
    res.status(201).json(updatedProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/checkSentence', async (req, res) => {
  try {
    const apiUrl = 'https://www.prepostseo.com/apis/checkSentence';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: `${process.env.PLAGIARISM}`,
        query: req.body.query
      }),
    });

    if (!response.ok) {
      throw new Error('Internal Server Error');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
