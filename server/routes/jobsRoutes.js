const express = require('express');
const router = express.Router();
const JobsModel = require('../models/jobsModels')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

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

//API to get all Jobs
router.get('/getAllJobs', async (req, res) => {
    try {
        const jobs = (await JobsModel.find({})).reverse();
        res.status(200).json({ jobs });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// API to add new Job
router.post('/addNewJob', async (req, res) => {
    try {
        const { postedBy, jobName, jobType, companyName, jobDescription, location, applyDate, contactEmail } = req.body;
        const newJob = new JobsModel({
            postedBy,
            jobName,
            jobType,
            companyName,
            jobDescription,
            location,
            applyDate,
            contactEmail
        });
        await newJob.save();
        res.status(201).json({ newJob });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// API to get single Job details
router.get('/getJob/:jobId', async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const job = await JobsModel.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json({ job });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// API to apply for a job
router.post('/apply/:jobId', async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const { name, email, college, profilePic, city, userId } = req.body;
        const job = await JobsModel.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        const hasApplied = job.applicants.some(applicant => applicant.user.toString() === userId);
        if (hasApplied) {
            return res.status(400).json({ message: "You have already applied for this job" });
        }

        job.applicants.push({
            user: userId,
            name,
            email,
            college,
            profilePic,
            city
        });
        await job.save();

        res.status(200).json({ message: "Application submitted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// API to get list of jobs where a user has applied
router.get('/appliedJobs/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find jobs where the user has applied
        const jobs = await JobsModel.find({ 'applicants.user': userId });

        res.status(200).json({ jobs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/userJobs',verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const jobs = await JobsModel.find({ postedBy: userId });
        res.status(200).json({ jobs });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



module.exports = router;