import React from 'react';
import LoggedIn, { loadingComponent } from '../contexts/LoggedIn';
import { Redirect } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const Profile = () => {
    const auth = LoggedIn();
    const loading = loadingComponent(auth);
    if (loading) return loading;
    if (!auth.user) return <Redirect to="/login?redirect=profile" />;
    return (
        <>
            <Typography>
                <b>
                    profile page (sementara):
                    <br />
                    Nama:
                </b>{' '}
                {auth.user.name}
                <br />
                <b>Email:</b> {auth.user.email}
                <br />
                <b>Database ID:</b> {auth.user._id}
            </Typography>
        </>
    );
};

export default Profile;
