const express = require('express');
const router = express.Router();
const JobsModel = require('../models/jobsModels')

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
        const newJob = new JobsModel({
            creator: req.userId,
            jobName: req.body.jobName,
            jobType: req.body.jobType,
            companyName: req.body.companyName,
            jobDescription: req.body.jobDescription,
            location: req.body.location,
            applyDate: req.body.applyDate,
            contactEmail: req.body.contactEmail
        })
        await newJob.save();
        res.status(200).json({newJob})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

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
        const { name, email, college, profilePic, city ,userId } = req.body;
        const job = await JobsModel.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        job.applicants.push({
            user:userId,
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



module.exports = router;