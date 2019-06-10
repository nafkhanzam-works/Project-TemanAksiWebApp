import { Typography, Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { loadingComponent, apiGet, apiGetCB, res200 } from '../Utils';
import Axios from 'axios';
import SchoolList from '../components/SchoolList';

const Profile = () => {
	const [error, setError] = React.useState(false);
	const [user, setUser] = React.useState(null);
	const [school, setSchool] = React.useState({});
	React.useEffect(apiGet('api/me', setUser, setError), []);
	React.useEffect(
		apiGetCB('api/schools/me', (error, list) => setSchool({ error, list })),
		[]
	);
	const loading = loadingComponent(user, error);
	if (loading) return loading;
	if (!user) return <Redirect to="/login?redirect=profile" />;
	return (
		<>
			<Typography>
				<b>Profile Page</b>
			</Typography>
			<ul>
				<li>
				<Typography><b>Nama:</b> {user.name}</Typography>
				</li>
				<li>
				<Typography><b>Email:</b> {user.email}</Typography>
				</li>
				<li>
				<Typography><b>Database ID:</b> {user._id}</Typography>
				</li>
				<li>
				<Typography><b>Sekolah yang saya daftarkan:</b></Typography>
					<SchoolList
						school={school}
						onDelete={() => {
							setSchool({});
							(async () => {
								try {
									const res = await Axios.get(
										'api/schools/me'
									);
									if (res200(res))
										setSchool({ list: res.data });
								} catch (error) {
									setSchool({ error });
								}
							})();
						}}
					/>
				</li>
			</ul>
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
