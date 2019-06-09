import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import { getUser } from './LoggedIn';

export default function(props) {
	const [name, setName] = React.useState(null);
	const [error, setError] = React.useState(false);
	let mounted = React.useRef(true);
	const { profile, school } = props;
	if (mounted.current)
		getUser((error, user) => {
			setName(user && user.name);
			setError(error);
			mounted.current = false;
		}, school.userId);
	const [value, setValue] = React.useState({});
	return (
		<li>
			<Typography>
				<b>Nama Sekolah:</b> {school.name}
				<br />
				<b>Deskripsi:</b> {school.desc}
				{profile ? null : (
					<>
						<br />
						<b>Akun Pemilik:</b>{' '}
						{name && !error
							? name
							: error
							? error.response.data
							: 'loading...'}
					</>
				)}
			</Typography>
			{profile ? (
				<>
					<Button
						variant="contained"
						color="primary"
						to={"/school/" + school.name}
                        style={{ marginRight: 20 }}
                        component={Link}
					>
						School Profile
					</Button>
					<Button
						variant="contained"
						color="secondary"
						disabled={value.loading}
						onClick={() => {
							setValue({ ...value, loading: true });
							axios
								.post('api/removemyschool', {
									schoolId: school._id
								})
								.then(res => {
									props.onDelete();
								})
								.catch(error => {
									setValue({
										...value,
										error,
										loading: false
									});
								});
						}}
					>
						Hapus
					</Button>
				</>
			) : null}
		</li>
	);
}
