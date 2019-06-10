import { Typography } from '@material-ui/core';
import React from 'react';
import { apiGet, loadingComponent } from '../Utils';

const SchoolProfile = props => {
	const { name } = props.match.params;
    const [school, setSchool] = React.useState(null);
	const [error, setError] = React.useState(false);
	React.useEffect(apiGet('/api/getschool/' + name, setSchool, setError), []);
	const loading = loadingComponent(school, error);
	if (loading) return loading;
	return (
		<>
			<Typography variant="h4">{school.name}</Typography>
			<Typography>{school.desc}</Typography>
		</>
	);
};

export default SchoolProfile;
