const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    organizer: {
        type: String,
        required: true,
    },
    eventName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    eventDescription: {
        type: String,
        required: true,
    },
    eventType: {
        type: String,
        required: true,
    },
    eventDate: {
        type: Date,
        required: true,
    },
    contactEmail:{
        type:String
    },
    location: {
        type: String,
        required: true,
    },
    eventImage: [String],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
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
}, {
    timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;