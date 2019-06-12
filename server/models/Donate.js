const mongoose = require('mongoose');
const { idReq } = require('../utils/schemas');

const donateSchema = mongoose.Schema({
    userId: idReq,
    name: String,
    schoolId: idReq,
    code: {
        type: Number,
        required: true
    },
    value: {
        type: Number,
        default: 0
    },
    email: String
});

module.exports = mongoose.model('Donate', donateSchema);
