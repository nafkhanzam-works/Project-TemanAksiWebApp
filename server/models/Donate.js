const mongoose = require('mongoose');
const { strReq, strReqU, idReq } = require('../utils/schemas');

const donateSchema = mongoose.Schema({
    message: String,
    userId: idReq,
    schoolId: idReq,
    value: {
        type: Number,
        default: 0,
        min: 0
    },
    done: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Donate', donateSchema);
