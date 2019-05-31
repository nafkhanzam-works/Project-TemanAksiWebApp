import { Button, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';
import LoggedIn, { loadingComponent } from '../contexts/LoggedIn';
import { redirect } from '../Utils';

const Login = () => {
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        loading: false,
        error: false,
    });
    const auth = LoggedIn();
    const loading = loadingComponent(auth);
    if (loading) return loading;
    if (auth.user) return <Redirect to="/profile" />;
    return (
        <div>
            <Typography>Login to Teman Aksi</Typography>
            <TextField
                error={!!value.error}
                label="Email"
                value={value.email}
                onChange={e => setValue({ ...value, email: e.target.value })}
                margin="normal"
                variant="outlined"
            />
            <br />
            <TextField
                error={!!value.error}
                label="Password"
                value={value.password}
                type="password"
                onChange={e => setValue({ ...value, password: e.target.value })}
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
                onClick={() => {
                    setValue({ ...value, loading: true });
                    axios.post('/api/login', {
                        email: value.email,
                        password: value.password
                    })
                        .then(res => {
                            if (res.status === 200)
                                redirect();
                            else
                                throw new Error(res);
                        })
                        .catch(err => {
                            if (err.response.status >= 500)
                                setValue({
                                    ...value,
                                    error: err.response.data,
                                    loading: false
                                });
                            else
                                setValue({
                                    ...value,
                                    error: err.response.data,
                                    loading: false
                                });
                        })
                }}
                disabled={value.loading}
            >
                {value.loading ? 'Logging in...' : 'Login'}
            </Button>
        </div>
    );
};

export default Login;
