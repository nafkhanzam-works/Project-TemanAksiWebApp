const httpStatus = require('http-status');
const config = require('../config/config');

exports.log = function(msg) {
    console.log(msg);
};
exports.err = function(err) {
    if (!err) return;
    exports.log(err);
    return err;
};
exports.res = function(res, status, err) {
    if (!err) return false;
    const msg = (err && err.message) ? err.message : httpStatus[status + '_MESSAGE'];
    res.status(status).send(msg);
    if (status >= 300 || !config.PROD) exports.err(msg);
    return true;
};
exports.status = function(res, status, message) {
    const msg = message || ((err && err.message) ? err.message : httpStatus[status + '_MESSAGE']);
    res.status(status).send(msg);
}
