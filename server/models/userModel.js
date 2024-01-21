const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        required: true,
    },
    college: {
        type: String,
        required: true,
    },
    password: {
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
    linkedin: {
        type: String,
        default: null,
    },
    github: {
        type: String,
        default: null,
    },
    skills: {
        type: [
            {
                value: { type: String, required: true },
                label: { type: String, required: true },
            },
        ],
        default: null,
    },
    bio: {
        type: String,
        default: null,
    },
},
    {
        timestamps: true,
    });

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
