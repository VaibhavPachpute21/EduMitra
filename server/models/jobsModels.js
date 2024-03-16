const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
            name: String,
            college: String,
            email:String,
            profilePic: String,
            city: String
        },
    ]

}, {
    timestamps: true,
})

const JobsModel = mongoose.model("Jobs", jobSchema)

module.exports = JobsModel;