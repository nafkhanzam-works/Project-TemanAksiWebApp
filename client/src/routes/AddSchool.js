import React from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { redirect, loadingComponent, apiGet, res200 } from '../Utils';
import Axios from 'axios';

const AddSchoolForm = () => {
	const [value, setValue] = React.useState({
		name: '',
		desc: '',
		loading: false,
		error: false
	});
	const [error, setError] = React.useState(false);
	const [user, setUser] = React.useState(null);
    React.useEffect(apiGet('api/me', setUser, setError), []);
	const loading = loadingComponent(user, error);
	if (loading) return loading;
	if (!user) return <Redirect to="/login?redirect=addschool" />;
	const doSubmit = () => {
		setValue({ ...value, loading: true });
		(async () => {
			try {
				const res = await Axios.post('/api/registerschool/create', {
					name: value.name,
					desc: value.desc
                });
                if (res200(res))
                    redirect('profile');
			} catch (err) {
                setValue({
					...value,
					loading: false,
					error: err.response.data
				});
            }
		})();
	};
	return (
		<>
			<Typography>Tambah Sekolah ke Teman Aksi</Typography>
			<TextField
				error={!!value.error}
				label="Nama Sekolah"
				fullWidth
				value={value.name}
				onChange={e => setValue({ ...value, name: e.target.value })}
				margin="normal"
				variant="outlined"
			/>
			<br />
			<TextField
				label="Deskripsi"
				value={value.desc}
				multiline
				fullWidth
				onChange={e => setValue({ ...value, desc: e.target.value })}
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
				onClick={doSubmit}
				disabled={value.loading}
			>
				{value.loading ? 'Uploading data...' : 'Tambah Sekolah'}
			</Button>
		</>
	);
};

export default AddSchoolForm;
