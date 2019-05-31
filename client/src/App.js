import { AppBar, Button, Toolbar, Typography, Paper } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import AddSchool from './routes/AddSchool';
import AuthForm from './routes/AuthForm';
import Home from './routes/Home';

export default function() {
    return (
        <BrowserRouter>
            <AppBar color="primary" position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        color="inherit"
                        style={{ textDecoration: 'none', paddingRight: 20 }}
                        component={Link}
                        to='/'
                    >
                        Teman Aksi
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    <Button
                        variant="contained"
                        color="primary"
                        to="/login"
                        component={Link}
                    >
                        Login
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginLeft: 10 }}
                        to="/register"
                        component={Link}
                    >
                        Register
                    </Button>
                </Toolbar>
            </AppBar>
            <Paper style={{ padding: 20 }}>
                <Switch>
                    <Route path="/login" component={() => <AuthForm login />} />
                    <Route path="/register" component={AuthForm} />
                    <Route path="/addschool" component={AddSchool} />
                    <Route exact path="/" component={Home} />
                    <div>
                        <h1>404 Not Found!</h1>
                        <h2>
                            <Link to="/">Go to home page</Link>
                        </h2>
                    </div>
                </Switch>
            </Paper>
        </BrowserRouter>
    );
}
