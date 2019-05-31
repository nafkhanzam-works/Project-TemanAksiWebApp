import Axios from "axios";
import React from 'react';
import { Typography } from "@material-ui/core";

export default function() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(null);
    const [error, setError] = React.useState(false);
    const isMounted = React.useRef(true);
    React.useEffect(() => {
        Axios.get('api/isloggedin')
            .then(res => {
                if (isMounted.current) setIsLoggedIn(res.data);
            })
            .catch(() => {
                if (isMounted.current) setError(true);
            });
        return () => {
            isMounted.current = false;
        };
    });
    let loading = null;
    if (isLoggedIn === null)
        loading = (
            <Typography>
                {error
                    ? "Couldn't connect to the server, try to refresh the page!"
                    : 'Loading...'}
            </Typography>
        );
    return [isLoggedIn, error, loading];
}