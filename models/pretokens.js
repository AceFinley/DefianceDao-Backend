const mongoose = require('mongoose');

const pretokens = new mongoose.Schema({
    projectId: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    buyDate: {
        type: Date,
        required: true,
    },
    user: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('pretoken', pretokens);