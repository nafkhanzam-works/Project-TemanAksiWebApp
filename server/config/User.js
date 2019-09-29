const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('./config');
const { strReq, strReqU } = require('../utils/schemas');

const userSchema = new mongoose.Schema({
	name: strReq,
	email: strReqU,
	password: strReq,
	role: {
		type: Number,
		default: 0
	}
});

// TODO: still buggy..
// userSchema.pre('save', async function(next) {
//     if (this.password && this.isModified('password'))
//         bcrypt.genSalt(10, (err, salt) => {
//             if (err) return next(err);
//             bcrypt.hash(this.password, salt, (err, hash) => {
//                 if (err) return next(err);
//                 this.password = hash;
//                 next();
//             });
//         });
// });

userSchema.methods.comparePassword = async function(password) {
	return (
		password === this.password ||
		(await bcrypt.compare(password, this.password))
	);
};
userSchema.methods.generateToken = function() {
	return jwt.sign({ _id: this._id }, config.PASSWORD, {
		expiresIn: 60 * 60 * 24 * 7
	});
};
userSchema.statics.getIdFromToken = function(token, cb) {
	jwt.verify(token, config.PASSWORD, (err, decoded) => cb(err, decoded));
};

module.exports = mongoose.model('User', userSchema);
