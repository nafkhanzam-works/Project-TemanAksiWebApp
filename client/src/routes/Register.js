import { Button, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { redirect, apiGet, loadingComponent, res200, widerFieldStyle } from '../Utils';
import Axios from 'axios';

const Register = () => {
	const [value, setValue] = React.useState({
		email: '',
		password: '',
		password2: '',
		name: '',
		error: false,
		loading: false
	});
	const [error, setError] = React.useState(false);
	const [user, setUser] = React.useState(null);
	React.useEffect(apiGet('api/me', setUser, setError), []);
	const loading = loadingComponent(user, error);
	if (loading) return loading;
	if (user) return <Redirect to="/profile" />;
	const doRegister = (e, enter) => {
		if (!enter || (enter && e.key === 'Enter')) {
			setValue(() => {
				return { ...value, loading: true };
			});
			if (value.password !== value.password2) {
				setValue(() => {
					return {
						...value,
						loading: false,
						error: "Password doesn't match!"
					};
				});
			} else {
				const { name, email, password } = value;
				(async () => {
					try {
						const res = await Axios.post('/api/register', {
							name,
							email,
							password
						});
						if (res200(res)) redirect();
					} catch (err) {
						setValue(() => {
							return { ...value, error: err.response.data };
						});
					}
				})();
			}
		}
	};
	return (
		<div>
			<Typography>Register to Teman Aksi</Typography>
			<TextField
				error={value.error}
				label="Name"
                style={widerFieldStyle(1.5)}
				onChange={e => setValue({ ...value, name: e.target.value })}
				margin="normal"
				variant="outlined"
			/>
			<br />
			<TextField
				error={value.error}
				label="Email"
                style={widerFieldStyle(1.5)}
				type="email"
				autoComplete="email"
				onChange={e => setValue({ ...value, email: e.target.value })}
				margin="normal"
				variant="outlined"
			/>
			<br />
			<TextField
				error={value.error}
				label="Password"
                style={widerFieldStyle(1.5)}
				type="password"
				onChange={e => setValue({ ...value, password: e.target.value })}
				margin="normal"
				variant="outlined"
			/>
			<br />
			<TextField
				error={value.error}
				label="Confirm Password"
                style={widerFieldStyle(1.5)}
				type="password"
				onKeyDown={e => doRegister(e, true)}
				onChange={e =>
					setValue({ ...value, password2: e.target.value })
				}
				margin="normal"
				variant="outlined"
			/>
			<br />
			{value.error ? (
				<>
					<Typography style={{ color: 'red' }}>
						{value.error}
					</Typography>
					<br />
				</>
			) : null}
			<Button
				variant="contained"
				color="primary"
				onClick={doRegister}
				disabled={value.loading}
			>
				{value.loading ? 'Registering...' : 'Register'}
			</Button>
		</div>
	);
};

export default Register;
