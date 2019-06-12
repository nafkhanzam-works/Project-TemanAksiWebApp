import { Typography, Paper, TextField, Button } from '@material-ui/core';
import React from 'react';
import { apiGet, loadingComponent, apiGetCB, res200, getError, widerFieldStyle } from '../Utils';
import Axios from 'axios';

const SchoolProfile = props => {
	const { name } = props.match.params;
	const [school, setSchool] = React.useState(null);
	const [error, setError] = React.useState(false);
	const [value, setValue] = React.useState({
		enabled: true,
		name: '',
		email: ''
	});
	React.useEffect(apiGet('/api/getschool/' + name, setSchool, setError), []);
	React.useEffect(
		apiGetCB('/api/me', (error, user) => {
			if (user)
				setValue({
					...value,
					userId: user._id,
					email: user.email,
					name: user.name
				});
		}),
		[]
	);
	const loading = loadingComponent(school, error);
	if (loading) return loading;
	return (
		<>
			<Typography variant="h4">{school.name}</Typography>
			<br />
			<Typography>{school.desc}</Typography>
			<br />
			<Paper style={{ padding: 20 }}>
				<Typography variant="h5">Donasi</Typography>
				<TextField
					label="Name"
					value={value.name}
					style={widerFieldStyle(1.5)}
					onChange={e => setValue({ ...value, name: e.target.value })}
					margin="normal"
					variant="outlined"
				/>
				<br />
				<TextField
					label="Email"
					type="email"
					value={value.email}
					style={widerFieldStyle(1.5)}
					onChange={e =>
						setValue({ ...value, email: e.target.value })
					}
					autoComplete="email"
					margin="normal"
					variant="outlined"
				/>
				<br />
				<Typography>
					Akan terkirim ke email Anda cara untuk berdonasi.
				</Typography>
				<Button
					disabled={!value.enabled}
					variant="contained"
					color="primary"
					onClick={() => {
						setValue({
							...value,
							success: null,
							enabled: false,
							error: null
						});
						(async () => {
							try {
								const res = await Axios.post('/api/donate', {
									userId: value.userId,
									email: value.email,
									name: value.name,
									school
								});
								if (res200(res) && res.data.success) {
									setValue({
										...value,
										success: value.email,
										email: '',
										name: ''
									});
								} else
									throw new Error('Internal server error!');
							} catch (err) {
								setValue({
									...value,
									enabled: true,
									error: getError(err),
									success: false
								});
							}
						})();
					}}
				>
					{value.enabled ? 'Kirim ke email saya!' : 'Mengirim...'}
				</Button>
				{value.success ? (
					<Typography>
						Berhasil terkirim ke: <u>{value.success}</u>.<br />
						Terima kasih!
					</Typography>
				) : value.error ? (
					<Typography style={{ color: 'red' }}>
						{value.error}
					</Typography>
				) : null}
			</Paper>
		</>
	);
};

export default SchoolProfile;
