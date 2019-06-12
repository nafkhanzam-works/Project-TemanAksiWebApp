import React from 'react';
import ASchoolList from './ASchoolList';
import { Typography } from '@material-ui/core';

export default function(props) {
    const { school, onDelete } = props;
	return school.list === null || school.list === undefined ? (
		<Typography>
			{school.error
				? school.error.response.data || "Couldn't connect to the server! Try to refresh the page."
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
