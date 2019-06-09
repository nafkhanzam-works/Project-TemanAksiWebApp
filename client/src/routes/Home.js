import { Button, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { getFormattedList } from '../components/SchoolList';
import { apiGetCB } from '../Utils';

const Home = () => {
    const [school, setSchool] = React.useState({});
    React.useEffect(apiGetCB('api/schools/all', (error, list) => setSchool({ error, list })), []);
    return (
        <React.Fragment>
            <Typography variant="h6" style={{ marginBottom: 10, marginTop: 10 }}>
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
            <Paper style={{ padding: 10, maxHeight: 500, overflowY: 'auto' }}>
                {getFormattedList(school)}
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
                    <b>About Us</b>
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
                    <b>Contact</b>
                </Typography>
                <Typography style={{ textIndent: 40 }}>
                    Laboriosam ad molestias et ab quia quo. Laboriosam aliquid
                    commodi. Blanditiis nihil laudantium ad adipisci cum omnis
                    rerum. Laboriosam asperiores architecto voluptatibus ad
                    excepturi. Et officiis ut et dolor atque.
                </Typography>
            </Paper>
        </React.Fragment>
    );
};

export default Home;
