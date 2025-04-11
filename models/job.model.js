const mongoose = require('mongoose');

const jobTrackerSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
        default: 'Applied',
    },
    dateofApplication: {
        type: Date,
        required: true,
    },
    link:{
        type: String,
        required: true,
    },
}, {timestamps: true});


const Jobtracker = mongoose.model("Jobtracker", jobTrackerSchema);

module.exports = Jobtracker;