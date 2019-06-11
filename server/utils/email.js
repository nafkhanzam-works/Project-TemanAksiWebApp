exports.sendDonationEmail = function(targetEmail, name, school, callback) {
	require('fs').readFile('server/templates/donateResponse.txt', 'utf8', (err, text) => {
		if (err) callback(err);
		require('gmail-send')({
			user: 'nafkhanalzamzami@gmail.com',
			pass: 'Shokibul123-',
			to: targetEmail,
			subject: '[Teman Aksi] Prosedur Donasi ke ' + school.name + '.',
			text
		})({}, (err, res) => callback(err, res));
	}); // TODO: Need to add 3 unique digits
};
