import axios from 'axios';
import React from 'react';
import ASchoolList from './ASchoolList';
import { Typography } from '@material-ui/core';

export default function(cb, all) {
    axios
        .get('api/schools/' + (all ? 'all' : 'me'))
        .then(res => {
            cb(false, res.data);
        })
        .catch(err => {
            cb(err, null);
        });
}
export const getFormattedList = function(school, profile, onDelete) {
    return school.list === null || school.list === undefined ? (
        <Typography>
            {school.error
                ? school.error.response
                    ? school.error.response.data
                    : "Couldn't connect to the server! Try to refresh the page."
                : 'Loading...'}
        </Typography>
    ) : school.list.length === 0 ? (
        <Typography>Tidak ada.</Typography>
    ) : (
        <ul>
            {school.list.map(school => (
                <ASchoolList
                    key={school._id}
                    profile={profile}
                    school={school}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
};
