import { Button, TextField, Typography } from '@material-ui/core';
import React from 'react';
import LoggedIn from './states/LoggedIn';

const Login = () => {
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        wrong: false,
        loading: false
    });
    function onLogin() {
        setValue({ ...value, loading: true });
    }
    const [,, loading] = LoggedIn.apply(this);
    if (loading) return loading;
    return (
        <div>
            <Typography>Login to Teman Aksi</Typography>
            <TextField
                error={value.wrong}
                label="Email"
                onChange={e => setValue({ ...value, email: e.target.value })}
                margin="normal"
                variant="outlined"
            />
            <br />
            <TextField
                error={value.wrong}
                label="Password"
                type="password"
                onChange={e => setValue({ ...value, password: e.target.value })}
                margin="normal"
                variant="outlined"
            />
            <br />
            <Button variant="contained" color="primary" onClick={onLogin} disabled={value.loading}>
                {value.loading ? 'Logging in...' : 'Login'}
            </Button>
        </div>
    );
};

export default Login;
