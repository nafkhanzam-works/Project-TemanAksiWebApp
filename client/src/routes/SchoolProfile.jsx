import { Button, Paper, TextField, Typography } from '@material-ui/core';
import Axios from 'axios';
import { Editor } from 'react-draft-wysiwyg';
import { Link } from 'react-router-dom';
import React from 'react';
import '../css/draft.css';
import {
	apiGet,
	apiGetCB,
	getEditorState,
	getError,
	loadingComponent,
	res200,
	widerFieldStyle
} from '../Utils';

const SchoolProfile = props => {
	const [school, setSchool] = React.useState(null);
	const [error, setError] = React.useState(false);
	const [value, setValue] = React.useState({
		enabled: true
	});
	React.useEffect(
		apiGet(
			'/api/getschool/' + props.match.params.link,
			setSchool,
			setError
		),
		[]
	);
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
			{school.userId === value.userId ? (
					<Button
						style={{ position: 'absolute', right: 25 }} // TODO: Make it more effective!
						variant="contained"
						color="primary"
						component={Link}
						to={'/edit/' + school.link}
					>
						Edit
					</Button>
			) : null}
			{school.content ? (
				<Editor
					editorState={getEditorState(school.content)}
					toolbarHidden
					wrapperClassName="wrapper"
					readOnly
				/>
			) : (
				<Typography>Konten tidak ditemukan!</Typography>
			)}
			<br />
			<Paper style={{ padding: 20 }}>
				<Typography variant="h5">Donasi</Typography>
				<TextField
					label="Name"
					value={value.name || ''}
					style={widerFieldStyle(1.5)}
					onChange={e => setValue({ ...value, name: e.target.value })}
					margin="normal"
					variant="outlined"
				/>
				<br />
				<TextField
					label="Email"
					type="email"
					value={value.email || ''}
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
									schoolId: school._id
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
						Berhasil terkirim ke: {value.success}.<br />
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
