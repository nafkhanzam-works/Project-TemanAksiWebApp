import React from 'react';
import { Typography } from '@material-ui/core';

const SchoolProfile = props => {
    const [school, setSchool] = React.useState(null);
    
    React.useEffect(() => {

    });
	return (
		<>
			<Typography variant="h4">{props.match.params.name}</Typography>
		</>
	);
};

export default SchoolProfile;
