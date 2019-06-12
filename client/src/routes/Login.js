import { Button, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { redirect, apiGet, loadingComponent, res200 } from '../Utils';
import Axios from 'axios';

const Login = () => {
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        loading: false,
        error: false
    });
    const [error, setError] = React.useState(false);
	const [user, setUser] = React.useState(null);
	React.useEffect(apiGet('api/me', setUser, setError), []);
	const loading = loadingComponent(user, error);
	if (loading) return loading;
	if (user) return <Redirect to="/profile" />;
    const doLogin = (e, enter) => {
        if (!enter || (enter && e.key === 'Enter')) {
            setValue({ ...value, loading: true });
            (async () => {
                try {
                    const res = await Axios.post('api/login', {
                        email: value.email,
                        password: value.password
                    });
                    if (res200(res)) redirect();
                } catch (err) {
                    setValue({
                        ...value,
                        error: err.response.data,
                        loading: false
                    });
                }
            })();
        }
    };
    return (
        <div>
            <Typography>Login to Teman Aksi</Typography>
            <TextField
                error={!!value.error}
                label="Email"
                type="email"
                autoComplete="email"
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
                onKeyDown={e => doLogin(e, true)}
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
                onClick={doLogin}
                disabled={value.loading}
            >
                {value.loading ? 'Logging in...' : 'Login'}
            </Button>
        </div>
    );
};

export default Login;
