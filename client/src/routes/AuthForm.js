import React from 'react';
import { Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import LoggedIn from './states/LoggedIn';

function AuthForm(props) {
    return LoggedIn.apply(this)[0] ? <Redirect to='/profile' /> : props.login ? <Login /> : <Register />;
}

export default AuthForm;
