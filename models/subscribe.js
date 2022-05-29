const mongoose = require('mongoose');

const subscribe = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },

    subData: {
        type: Date,
        required: true,
    }
})

module.exports = mongoose.model('subscribe', subscribe);