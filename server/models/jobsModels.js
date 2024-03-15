const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    jobName: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    applyDate: {
        type: Date,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    applicants: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
                unique: true,
            },
            college: {
                type: String,
                required: true,
            },
            profilePic: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                default: null,
            },
        }
    ]

}, {
    timestamps: true,
})

const JobsModel = mongoose.model("Jobs", jobSchema)

module.exports = JobsModel;