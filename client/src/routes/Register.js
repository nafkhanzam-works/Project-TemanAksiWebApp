import { Button, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { Redirect } from 'react-router-dom';
import LoggedIn, { loadingComponent } from '../contexts/LoggedIn';
import axios from 'axios';
import { redirect } from '../Utils';

const Register = () => {
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        password2: '',
        name: '',
        error: false,
        loading: false
    });
    const [error, setError] = React.useState(false);
    const [user, setUser] = React.useState(null);
    let mounted = React.useRef(true);
    if (mounted.current)
        LoggedIn((err, user) => {
            setError(err);
            setUser(user);
            mounted.current = false;
        });
    const loading = loadingComponent({ user, error });
    if (loading) return loading;
    if (user) return <Redirect to="/profile" />;
    const doRegister = (e, enter) => {
        if (!enter || (enter && e.key === 'Enter')) {
            setValue(() => {
                return { ...value, loading: true };
            });
            if (value.password !== value.password2) {
                setValue(() => {
                    return {
                        ...value,
                        loading: false,
                        error: "Password doesn't match!"
                    };
                });
            } else {
                const { name, email, password } = value;
                axios
                    .post('/api/register', {
                        name,
                        email,
                        password
                    })
                    .then(res => {
                        if (res.status === 200) {
                            redirect();
                        } else throw new Error(res);
                    })
                    .catch(err => {
                        setValue(() => {
                            return { ...value, error: err.response.data };
                        });
                    });
            }
        }
    };
    return (
        <div>
            <Typography>Register to Teman Aksi</Typography>
            <TextField
                error={value.error}
                label="Name"
                onChange={e => setValue({ ...value, name: e.target.value })}
                margin="normal"
                variant="outlined"
            />
            <br />
            <TextField
                error={value.error}
                label="Email"
                type="email"
                autoComplete="email"
                onChange={e => setValue({ ...value, email: e.target.value })}
                margin="normal"
                variant="outlined"
            />
            <br />
            <TextField
                error={value.error}
                label="Password"
                type="password"
                onChange={e => setValue({ ...value, password: e.target.value })}
                margin="normal"
                variant="outlined"
            />
            <br />
            <TextField
                error={value.error}
                label="Confirm Password"
                type="password"
                onKeyDown={e => doRegister(e, true)}
                onChange={e =>
                    setValue({ ...value, password2: e.target.value })
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
            ) : null}
            <Button
                variant="contained"
                color="primary"
                onClick={doRegister}
                disabled={value.loading}
            >
                {value.loading ? 'Registering...' : 'Register'}
            </Button>
        </div>
    );
};

export default Register;
