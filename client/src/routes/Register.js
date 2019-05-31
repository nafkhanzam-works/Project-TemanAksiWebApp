import { Button, TextField, Typography } from '@material-ui/core';
import React from 'react';
import LoggedIn from './states/LoggedIn';

const Register = () => {
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        password2: '',
        wrong: false,
        loading: false
    });
    function onRegister() {
        setValue({ ...value, loading: true });
    }
    const [,, loading] = LoggedIn.apply(this);
    if (loading) return loading;
    return (
        <div>
            <Typography>Register to Teman Aksi</Typography>
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
            <TextField
                error={value.wrong}
                label="Confirm Password"
                type="password"
                onChange={e => setValue({ ...value, password2: e.target.value })}
                margin="normal"
                variant="outlined"
            />
            <br />
            <Button
                variant="contained"
                color="primary"
                onClick={onRegister}
                disabled={value.loading}
            >
                {value.loading ? 'Registering...' : 'Register'}
            </Button>
        </div>
    );
};

export default Register;
