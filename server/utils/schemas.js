const _ = require('lodash')
const mongoose = require('mongoose')

exports.strReq = {
    type: String,
    required: true
};
exports.strReqU = { ...exports.strReq, unique: true };
exports.idReq = {
    type: mongoose.Types.ObjectId,
    required: true
}
exports.getSchemaObject = function(obj, Model, withId) {
    const arr = _.keys(Model.schema.obj);
    if (withId)
        arr.concat(['_id']);
    return _.pick(obj, arr);
}