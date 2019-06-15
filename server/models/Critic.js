const mongoose = require('mongoose');
const { strReq } = require('../utils/schemas');

const criticSchema = mongoose.Schema({
	name: String,
	userId: mongoose.Types.ObjectId,
	message: strReq
});

module.exports = mongoose.model('Critic', criticSchema);
