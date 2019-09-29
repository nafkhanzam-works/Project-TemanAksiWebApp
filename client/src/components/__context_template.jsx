import Axios from 'axios';
import React from 'react';

export const AuthContext = React.createContext();
export const AuthProvider = props => {
    const [loggedIn, setLoggedIn] = React.useState(null);
    const [error, setError] = React.useState(false);
    return (
        <AuthContext.Provider
            value={{ error, setError, loggedIn, setLoggedIn }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
export const withAuthContext = Component => props => {
    return (
        <AuthContext.Consumer>
            {value => <Component {...props} {...value} />}
        </AuthContext.Consumer>
    );
};
export const updateAuthStatus = props => {
    return () => {
        let mounted = true;
        Axios.get('api/isloggedin')
            .then(res => {
                if (mounted) props.setLoggedIn(res.data);
            })
            .catch(() => {
                if (mounted) props.setError(true);
            });
        return () => {
            mounted = false;
        };
    };
};
