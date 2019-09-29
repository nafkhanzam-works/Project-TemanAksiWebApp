import { AppBar, Button, Paper, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import AddSchool from './routes/AddSchool';
import Home from './routes/Home';
import Login from './routes/Login';
import Profile from './routes/Profile';
import Register from './routes/Register';
import { redirect, apiGetCB, res200 } from './Utils';
import SchoolProfile from './routes/SchoolProfile';
import Axios from 'axios';
import EditSchool from './routes/EditSchool';

export default function() {
    const [state, setState] = React.useState({});
    const [user, setUser] = React.useState(null);
    React.useEffect(apiGetCB('/api/me', (err, user) => setUser(user)), []);
    return (
        <BrowserRouter>
            <AppBar color="primary" position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        color="inherit"
                        style={{
                            textDecoration: 'none',
                            paddingRight: 20
                        }}
                        component={Link}
                        to="/"
                    >
                        Teman Aksi
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    {user === null ? null : user ? (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                to="/profile"
                                component={Link}
                            >
                                My Profile
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{ marginLeft: 10 }}
                                onClick={() => {
                                    setState({ ...state, loggingOut: true });
                                    (async () => {
                                        try {
                                            const res = await Axios.get('/api/logout');
                                            if (res200(res)) redirect();
                                        } catch (err) {
                                            setState({
                                                ...state,
                                                loggingOut: false // TODO: add connection error message!
                                            })
                                        }
                                    })();
                                }}
                                disabled={state.loggingOut}
                            >
                                {state.loggingOut ? 'Logging out...' : 'Logout'}
                            </Button>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Paper square style={{ padding: 20 }}>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/addschool" component={AddSchool} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/school/:link" component={SchoolProfile} />
                    <Route path="/edit/:link" component={EditSchool} />

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
