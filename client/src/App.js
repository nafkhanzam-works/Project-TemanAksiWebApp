import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Home from './routes/Home';
import AuthForm from './routes/AuthForm';
import AddSchool from './routes/AddSchool';

export default function() {
    return (
        <div>
            <AppBar color="primary" position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        color="inherit"
                        style={{ flexGrow: 1 }}
                    >
                        Teman Aksi
                    </Typography>
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
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={() => <AuthForm login />} />
                    <Route path="/register" component={AuthForm} />
                    <Route path="/addschool" component={AddSchool} />
                    <Route exact path="/" component={Home} />
                    <>
                        <h1>404 Not Found!</h1>
                        <h2>
                            <Link to="/">Go to home page</Link>
                        </h2>
                    </>
                </Switch>
            </BrowserRouter>
        </div>
    );
}
