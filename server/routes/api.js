const express = require('express');
const _ = require('lodash');
const log = require('../utils/log');
const config = require('../config/config');
const User = require('../models/User');
const schemas = require('../utils/schemas');
const School = require('../models/School');
const Critic = require('../models/Critic');

const router = express.Router();

const login = async function(req, res) {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) return log.status(res, 400, 'Email is not registered.');
	if (!(await user.comparePassword(password)))
		return log.status(res, 400, 'Password incorrect.');
	res.cookie(config.AUTH, user.generateToken()).send(user);
};
router.use((req, res, next) => {
	User.getIdFromToken(req.cookies[config.AUTH], (err, decoded) => {
		if (err) return next();
		User.findById(decoded._id, (err, user) => {
			if (!err && user) req.user = user;
			next();
		});
	});
});
router.use('/logout', (req, res) => {
	if (!req.user) return log.status(res, 400, "You're not logged in.");
	res.cookie(config.AUTH, null).send('Logged out!');
});
router.use('/register', (req, res) => {
	if (req.user) return log.status(res, 400, "You're already logged in.");
	User.create(schemas.getSchemaObject(req.body, User), (err, user) => {
		if (log.res(res, 400, err)) return;
		login(req, res);
	});
});
router.use('/me', (req, res) => {
	res.send(req.user);
});
router.use('/donate', (req, res) => {
    require('../utils/email').sendDonationEmail(req.body.email, req.body.name, req.body.school, (err, emailResponse) => {
        if (log.res(res, 500, err)) return;
        res.send({ emailResponse, success: true });
    });
});
router.use('/addcritic', (req, res) => {
	Critic.create({ ...schemas.getSchemaObject(req.body, Critic), userId: req.user._id }, (err, critic) => {
		if (log.res(res, 400, err)) return;
		res.send(critic);
	});
});
router.use('/registerschool', (req, res) => {
	if (!req.user) return log.status(res, 400, "You're not logged in!");
	req.body.userId = req.user._id;
	School.create(schemas.getSchemaObject(req.body, School), (err, school) => {
		if (log.res(res, 400, err)) return;
		res.send(school);
	});
});
router.use('/removemyschool', (req, res) => {
	if (!req.user) return log.status(res, 400, "You're not logged in!");
	const { schoolId } = req.body;
	School.findById(schoolId, (err, school) => {
		if (log.res(res, 400, err)) return;
		if (!school) return res.send('Not found!');
		if (!req.user._id.equals(school.userId))
			return log.res(res, 400, new Error("You're not authorized!"));
		School.findByIdAndRemove(schoolId, (err, school) => {
			if (log.res(res, 400, err)) return;
			res.send(school);
		});
	});
});
router.use('/schools/:cond', (req, res) => {
	if (!req.user && req.params.cond === 'me')
		return log.status(res, 400, "You're not logged in!");
	const condition = {};
	if (req.params.cond === 'me') condition.userId = req.user._id;
	School.find(condition, (err, list) => {
		if (log.res(res, 400, err)) return;
		res.send(list);
	});
});
router.use('/login', (req, res) => {
	if (req.user) return log.status(res, 400, "You're already logged in.");
	login(req, res);
});
router.use('/getschool/:name', async (req, res) => {
	try {
		const school = await School.findOne({ name: req.params.name });
		if (!school) return log.status(res, 404, 'School not found!');
		res.send(school);
	} catch (err) {
		log.res(res, 400, err);
	}
});
router.use('/db/:collection/:query', (req, res) => {
	const b = req.body;
	const q = req.query;
	const qq = req.params.query;
	const col = req.params.collection;
	try {
		const Model = require('../models/' + col.charAt(0).toUpperCase() + col.slice(1));
		if (
			!config.USER_QUERIES.includes(qq) &&
			!config.except(req.user, col, qq)
		)
			return log.res(res, 404, true);
		switch (qq) {
			case 'create':
				Model[qq](schemas.getSchemaObject(b, Model), (err, doc) => {
					if (log.res(res, 400, err)) return;
					res.send(doc);
				});
				break;
			case 'findById':
				Model[qq](b._id, (err, doc) => {
					if (log.res(res, 400, err)) return;
					res.send(doc);
				});
				break;
			default:
				var opt = {};
				_.forIn(
					_.keys(q, config.OPTION_LIST),
					k => (opt[k] = parseInt(q[k]))
				);
				var matcher = schemas.getSchemaObject(b, Model, true);
				Model[qq](matcher, null, opt, (err, docs) => {
					if (log.res(res, 400, err)) return;
					res.send(docs);
				});
				break;
		}
	} catch (ex) {
		log.res(res, 400, ex);
	}
});

module.exports = router;
