import React from 'react';
import { AppBar, Toolbar, Typography, Paper, Button } from '@material-ui/core';

const Home = () => {
    return (
        <React.Fragment>
            <AppBar color="primary" position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        color="inherit"
                        style={{ flexGrow: 1 }}
                    >
                        Teman Aksi
                    </Typography>
                    <Button variant="contained" color="primary">
                        Login
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginLeft: 10 }}
                    >
                        Register
                    </Button>
                </Toolbar>
            </AppBar>
            <Paper style={{ padding: 10 }}>
                <Typography variant="h6">
                    <br />
                    <p style={{ textIndent: 40 }}>
                        A voluptatem sed ab provident consequuntur vel alias ex.
                        Et enim rerum sapiente modi aut velit quis eligendi
                        dolorum. Rerum fugit esse dignissimos distinctio magnam
                        debitis et distinctio.Vero sed totam nobis sapiente aut
                        autem ipsum. Aperiam doloremque qui dolor quisquam non
                        vitae autem rerum asperiores. Odio minus qui deleniti
                        magni a rerum eum quasi enim. Vel ut delectus cumque
                        itaque sit temporibus accusamus nobis.
                    </p>
                    <p style={{ textIndent: 40 }}>
                        Velit pariatur ea rerum et et inventore atque. Dolor
                        magni illum a voluptatem consequatur sed. Ut repellat
                        repellendus vel autem. Voluptas porro ut dolorem quia
                        voluptatibus et ab ullam et. Fugit voluptas quo. Quidem
                        error et sed facere dolorem quibusdam voluptatem libero
                        tempore.
                    </p>
                    <br />
                    <p>
                        <b>Siap memberi bantuan?</b>
                    </p>
                </Typography>
                <Paper style={{ padding: 10, margin: 10 }}>School List</Paper>
                <Typography variant="h6">
                    <b>Ingin menambahkan sekolah Anda?</b>
                    <Button
                        style={{ marginLeft: 20 }}
                        variant="contained"
                        color="primary"
                    >
                        Tambah Sekolah
                    </Button>
                </Typography>
                <Paper style={{ padding: 10, margin: 10 }}>
                    <Typography variant="h6">
                        <b>About Us</b>
                    </Typography>
                    <Typography>
                        Assumenda maxime aut nulla rerum quasi eum et provident
                        corporis. Praesentium a aut quis est repellendus aut.
                        Aut dolores sit commodi sit labore et inventore nulla.
                        Repudiandae voluptatem cupiditate exercitationem velit
                        incidunt fugit distinctio delectus. Magni officiis
                        repudiandae vel dolor tenetur facilis in voluptate
                        similique. Quis sed dolor hic placeat similique alias
                        minima expedita laborum. Accusamus tempora facere
                        distinctio eveniet quis qui. In occaecati rerum impedit
                        fugiat voluptatem non. Voluptatem aut neque quisquam.
                    </Typography>
                    <br />
                    <Typography variant="h6">
                        <b>Contact</b>
                    </Typography>
                    <Typography>
                        Laboriosam ad molestias et ab quia quo. Laboriosam
                        aliquid commodi. Blanditiis nihil laudantium ad adipisci
                        cum omnis rerum. Laboriosam asperiores architecto
                        voluptatibus ad excepturi. Et officiis ut et dolor
                        atque.
                    </Typography>
                </Paper>
            </Paper>
        </React.Fragment>
    );
};

export default Home;
