import axios from "axios";
import React from 'react';
import { Typography } from "@material-ui/core";

export default function() {
    const [error, setError] = React.useState(false);
    const [user, setUser] = React.useState(null);
    React.useEffect(() => {
        let isMounted = true;
        axios.get('api/me')
            .then(res => {
                if (isMounted) setUser(res.data);
            })
            .catch(() => {
                if (isMounted) setError(true);
            });
        return () => {
            isMounted = false;
        };
    });
    return { user, error };
}
export const loadingComponent = function(auth) {
    if (auth.user === null || auth.error)
        return (
            <Typography>
                {auth.error
                    ? "Couldn't connect to the server, try to refresh the page!"
                    : 'Loading...'}
            </Typography>
        );
};