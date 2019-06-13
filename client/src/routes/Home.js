import { Button, Paper, TextField, Typography } from '@material-ui/core';
import Axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import SchoolList from '../components/SchoolList';
import { apiGetCB, getError, res200, widerFieldStyle } from '../Utils';

const Home = () => {
	const [school, setSchool] = React.useState({});
	var [value, setValue] = React.useState({
		name: '',
		pesan: ''
	});
	React.useEffect(
		apiGetCB('/api/me', (error, user) => {
			if (user)
				setValue({
					...value,
					name: user.name
				});
		}),
		[]
	);
	React.useEffect(
		apiGetCB('/api/schools/all', (error, list) =>
			setSchool({ error, list })
		),
		[]
	);
	return (
		<React.Fragment>
			<Typography
				variant="h6"
				style={{ marginBottom: 10, marginTop: 10 }}
			>
				<div style={{ textIndent: 40 }}>
					A voluptatem sed ab provident consequuntur vel alias ex. Et
					enim rerum sapiente modi aut velit quis eligendi dolorum.
					Rerum fugit esse dignissimos distinctio magnam debitis et
					distinctio.Vero sed totam nobis sapiente aut autem ipsum.
					Aperiam doloremque qui dolor quisquam non vitae autem rerum
					asperiores. Odio minus qui deleniti magni a rerum eum quasi
					enim. Vel ut delectus cumque itaque sit temporibus accusamus
					nobis.
				</div>
				<div style={{ textIndent: 40 }}>
					Velit pariatur ea rerum et et inventore atque. Dolor magni
					illum a voluptatem consequatur sed. Ut repellat repellendus
					vel autem. Voluptas porro ut dolorem quia voluptatibus et ab
					ullam et. Fugit voluptas quo. Quidem error et sed facere
					dolorem quibusdam voluptatem libero tempore.
				</div>
				<br />
				<b>Siap memberi bantuan?</b>
			</Typography>
			<Paper style={{ padding: 10, maxHeight: 1000, overflowY: 'auto' }}>
				<SchoolList school={school} />
			</Paper>
			<Typography variant="h6" style={{ margin: '10px 0px 10px 0px' }}>
				<b>Ingin menambahkan sekolah Anda?</b>
				<Button
					style={{ marginLeft: 20 }}
					variant="contained"
					color="primary"
					to="/addschool"
					component={Link}
				>
					Tambah Sekolah
				</Button>
			</Typography>
			<Paper style={{ padding: 10 }}>
				<Typography variant="h6">
					<b>Tentang Kami</b>
				</Typography>
				<Typography style={{ textIndent: 40 }}>
					Assumenda maxime aut nulla rerum quasi eum et provident
					corporis. Praesentium a aut quis est repellendus aut. Aut
					dolores sit commodi sit labore et inventore nulla.
					Repudiandae voluptatem cupiditate exercitationem velit
					incidunt fugit distinctio delectus. Magni officiis
					repudiandae vel dolor tenetur facilis in voluptate
					similique. Quis sed dolor hic placeat similique alias minima
					expedita laborum. Accusamus tempora facere distinctio
					eveniet quis qui. In occaecati rerum impedit fugiat
					voluptatem non. Voluptatem aut neque quisquam.
				</Typography>
				<br />
				<Typography variant="h6">
					<b>Kontak</b>
				</Typography>
				<ul>
					<li>
						<Typography>
							<b>LINE ID:</b> embozam
						</Typography>
					</li>
					<li>
						<Typography>
							<b>Whatsapp:</b> 085815805174
						</Typography>
					</li>
					<li>
						<Typography>
							<b>Email:</b> nafkhanalzamzami@gmail.com
						</Typography>
					</li>
				</ul>
				<br />
				<Typography variant="h6">
					<b>Kritik dan Saran</b>
				</Typography>
				<TextField
					label="Nama (boleh dikosongkan)"
                    value={value.name}
                    style={widerFieldStyle(1.5)}
					onChange={e => setValue({ ...value, name: e.target.value })}
					margin="normal"
					variant="outlined"
				/>
				<br />
				<TextField
					label="Pesan"
                    value={value.pesan}
					multiline
					rows="4"
					style={widerFieldStyle(1.5)}
					onChange={e =>
						setValue({ ...value, pesan: e.target.value })
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
				) : value.success ? (
					<Typography>
						Pesan berhasil terkirim! Terima kasih sudah mau membantu
						kami menjadi lebih baik.
					</Typography>
				) : null}
				<Button
					variant="contained"
					color="primary"
					onClick={() => {
						setValue({
							...value,
							loading: true,
							error: null,
							success: false
						});
						(async () => {
							try {
								const res = await Axios.post('/api/addcritic', {
									name: value.name,
									message: value.pesan
								});
								if (res200(res))
									setValue({
										...value,
										success: true,
										error: null
									});
								else throw new Error(res);
							} catch (err) {
								setValue({
									...value,
									loading: false,
									error: getError(err)
								});
							}
						})();
					}}
					disabled={value.loading}
				>
					{!value.loading ? 'Kirim!' : 'Mengirim...'}
				</Button>
			</Paper>
		</React.Fragment>
	);
};

export default Home;
