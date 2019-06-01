import axios from 'axios';
import React from 'react';
import { Typography } from '@material-ui/core';

export default function(cb) {
    axios
        .get('api/me')
        .then(res => {
            cb(false, res.data);
        })
        .catch(err => {
            cb(err, null);
        });
}

export const getUser = function(cb, _id) {
    axios
        .post('api/db/user/findById', { _id })
        .then(res => {
            cb(false, res.data);
        })
        .catch(err => {
            cb(err, null);
        });
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
