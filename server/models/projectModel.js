const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    creatorInfo: {
        name: String,
        profilePic: String,
        college: String,
    },
    pTitle: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    longDescription: {
        type: String,
        required: true,
    },
    whyChooseProject: {
        type: String,
        required: true,
    },
    howDiffProject: {
        type: String,
        required: true,
    },
    futureEnhancement: {
        type: String,
        required: true,
    },
    builtWith: {
        type: String,
        required: true,
    },
    difficultiesFaced: {
        type: String,
        required: true,
    },
    projectImages: [String],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            name: String,
            text: String,
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    grades: {
        CQ: {
            type: String,
            default: null
        },
        EC: {
            type: String,
            default: null
        },
        PC: {
            type: String,
            default: null
        }
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    domain: {
        type: String,
        required: true,
    },
    codeLink: {
        type: String,
        default: null
    },
    demoLink: {
        type: String,
        default: null
    }
},
    {
        timestamps: true,
    });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
