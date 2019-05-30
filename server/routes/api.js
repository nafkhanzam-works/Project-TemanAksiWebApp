const express = require('express')
const mongoose = require('mongoose')
const _ = require('lodash');
const log = require('../utils/log')
const config = require('../config/config');
const User = require('../models/user');
const schemas = require('../utils/schemas');

const router = express.Router();

const login = async function(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return log.status(res, 400, 'Email is not registered.');
    if (!user.comparePassword(password)) return log.status(res, 400, 'Password incorrect.');
    res.cookie(config.AUTH, user.generateToken()).send(user);
}
router.use((req, res, next) => {
    User.getIdFromToken(req.cookies[config.AUTH], (err, decoded) => {
        if (err) return next();
        User.findById(decoded._id, (err, user) => {
            if (!err && user) req.user = user;
            next();
        });
    })
});
router.use('/register', async (req, res) => {
    if (req.user) return log.status(res, 400, 'You\'re already logged in.');
    User.create(schemas.getSchemaObject(req.body, User), (err, user) => {
        if (log.res(res, 400, err)) return;
        login(req, res);
    });
});
router.use('/login', async (req, res) => {
    if (req.user) return log.status(res, 400, 'You\'re already logged in.');
    login(req, res);
});
router.use('/db/:collection/:query', (req, res) => {
    if (!req.user) return log.status(res, 403);
    const b = req.body;
    const q = req.query;
    const qq = req.params.query;
    const col = req.params.collection;
    try {
        const Model = require('../models/' + col);
        if (!config.USER_QUERIES.includes(qq) && !config.except(col, qq)) return log.res(res, 404, true);
        switch (qq) {
            case 'create':
                Model[qq](schemas.getSchemaObject(b, Model), (err, doc) => {
                    if (log.res(res, 400, err)) return;
                    res.send(doc);
                });
                break;
            default:
                var opt = {};
                _.forIn(_.keys(q, config.OPTION_LIST), k => opt[k] = parseInt(q[k]));
                var matcher = schemas.getSchemaObject(b, Model, true);
                Model[qq](matcher, null, opt, (err, docs) => {
                    if (log.res(res, 400, err)) return;
                    res.send(docs);
                })
                break;
        }
    } catch (ex) {
        log.res(res, 400, ex);
    }
});

module.exports = router;