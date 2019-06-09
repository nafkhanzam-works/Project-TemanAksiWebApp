import { Typography, Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { getFormattedList } from '../components/SchoolList';
import { loadingComponent, apiGet, apiGetCB, res200 } from '../Utils';
import Axios from 'axios';

const Profile = () => {
	const [error, setError] = React.useState(false);
	const [user, setUser] = React.useState(null);
	const [school, setSchool] = React.useState({});
	React.useEffect(apiGet('api/me', setUser, setError), []);
	React.useEffect(apiGetCB('api/schools/me', (error, list) => setSchool({ error, list })), [school.list]);
	const loading = loadingComponent(user, error);
	if (loading) return loading;
	if (!user) return <Redirect to="/login?redirect=profile" />;
	return (
		<>
			<Typography>
				<b>
					profile page (sementara):
					<br />
					Nama:
				</b>{' '}
				{user.name}
				<br />
				<b>Email:</b> {user.email}
				<br />
				<b>Database ID:</b> {user._id}
				<br />
				<b>Sekolah yang saya daftarkan:</b>
				<br />
			</Typography>
			{getFormattedList(school, () => {
				setSchool({});
				(async () => {
					try {
						const res = await Axios.get('api/schools/me');
						if (res200(res)) setSchool({ list: res.data });
					} catch (error) {
						setSchool({ error });
					}
				})();
			})}
			<Button
				variant="contained"
				color="primary"
				to="/addschool"
				component={Link}
			>
				Tambah Sekolah
			</Button>
		</>
	);
};

export default Profile;
