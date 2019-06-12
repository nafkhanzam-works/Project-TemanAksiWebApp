const mongoose = require('mongoose');
const { strReq, strReqU, idReq } = require('../utils/schemas');

const schoolSchema = mongoose.Schema({
    name: strReqU,
    desc: strReq,
    userId: idReq,
    targetValue: {
        type: Number,
        default: 0,
        min: 0,
        required: true
    }
});

module.exports = mongoose.model('School', schoolSchema);
