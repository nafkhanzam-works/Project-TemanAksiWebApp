const Donate = require('../models/Donate')
const utils = require('./utils')

exports.sendDonationEmail = function(targetEmail, name, school, user, callback) {
	require('fs').readFile('server/templates/donateResponse.txt', 'utf8', (err, html) => {
		if (err) return callback(err);
		Donate.find({ value: 0 }).select('code -_id').sort({ 'code': 1 }).exec((err, docs) => {
			if (err) return callback(err);
			var code = 1;
			for (var i in docs) {
				var doc = docs[i];
				if (doc.code > code)
					break;
				else if (doc.code === code)
					code++;
			}
			if (code >= 1000)
				code = 999;
			var codeStr = code.toString();
			while (codeStr.length < 3)
				codeStr = '0' + codeStr;
			Donate.create({ email: targetEmail, name, schoolId: school._id, userId: user ? user._id : null, code }, (err, res) => {
				if (err) return callback(err);
				require('gmail-send')({
					user: 'nafkhanalzamzami@gmail.com',
					pass: 'Shokibul123-',
					to: targetEmail,
					subject: '[Teman Aksi] Prosedur Donasi ke ' + school.name + '.',
					html: utils.replaceAll(html, '\\$\\{code\\}', codeStr)
				})({}, (err, res) => callback(err, res));
			});
		});
	});
};
