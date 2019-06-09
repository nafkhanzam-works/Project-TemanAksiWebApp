import React from 'react';
import ASchoolList from './ASchoolList';
import { Typography } from '@material-ui/core';
import Axios from 'axios';

export default function(cb, all) {
	Axios.get('api/schools/' + (all ? 'all' : 'me'))
		.then(res => {
			cb(false, res.data);
		})
		.catch(err => {
			cb(err, null);
		});
}
export const getFormattedList = function(school, onDelete) {
	return school.list === null || school.list === undefined ? (
		<Typography>
			{school.error
				? "Couldn't connect to the server! Try to refresh the page."
				: 'Loading...'}
		</Typography>
	) : school.list.length === 0 ? (
		<Typography>Tidak ada.</Typography>
	) : (
		<ul>
			{school.list.map(school => (
				<ASchoolList
					key={school._id}
					school={school}
					onDelete={onDelete}
				/>
			))}
		</ul>
	);
};
