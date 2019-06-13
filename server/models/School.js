const mongoose = require('mongoose');
const { strReq, strReqU, idReq } = require('../utils/schemas');

const schoolSchema = mongoose.Schema({
    name: strReqU,
    link: {
        ...strReqU,
        validate: {
            validator: (v) => !v.includes(' '),
            message: 'link tidak boleh mengandung spasi!' // TODO: add () => 
        },
    },
    content: Object,
    userId: idReq
    // targetValue: {
    //     type: Number,
    //     default: 0,
    //     min: 0,
    //     required: true
    // }
});

module.exports = mongoose.model('School', schoolSchema);
