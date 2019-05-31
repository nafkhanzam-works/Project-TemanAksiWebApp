import Axios from "axios";
import React from 'react';
import { Typography } from "@material-ui/core";

export default function() {
    const [loggedIn, setLoggedIn] = React.useState(null);
    const [error, setError] = React.useState(false);
    React.useEffect(() => {
        let isMounted = true;
        Axios.get('api/isloggedin')
            .then(res => {
                if (isMounted) setLoggedIn(res.data);
            })
            .catch(() => {
                if (isMounted) setError(true);
            });
        return () => {
            isMounted = false;
        };
    });
    return { loggedIn, error };
}
export const loadingComponent = function(auth) {
    if (auth.loggedIn === null || auth.error)
        return (
            <Typography>
                {auth.error
                    ? "Couldn't connect to the server, try to refresh the page!"
                    : 'Loading...'}
            </Typography>
        );
};