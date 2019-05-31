import React from 'react';
import axios from 'axios';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';

function AuthForm(props) {
    let isLoggedIn = false;
    axios
        .get('api/isloggedin')
        .then(res => {
            isLoggedIn = res;
        })
        .catch(err => console.log(err));
    return isLoggedIn ? <Profile /> : props.login ? <Login /> : <Register />;
}

export default AuthForm;
