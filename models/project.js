const mongoose = require('mongoose');

const project = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    symbol: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tokenPrice: {
        type: Number,
        required: true,
    },
    totalSupply: {
        type: Number,
        required: true,
    },
    totalRaised: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    twitter: {
        type: String,
    },
    medium: {
        type: String,
    },
    facebook: {
        type: String,
    },
    discord: {
        type: String,
    },
    tokenImage: {
        type: String,
    },
    tokenAddress: {
        type: String,
    },
})

module.exports = mongoose.model('projects', project);