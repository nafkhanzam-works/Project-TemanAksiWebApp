import { Typography, Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import LoggedIn, { loadingComponent } from '../contexts/LoggedIn';
import SchoolList, { getFormattedList } from '../contexts/SchoolList';

const Profile = () => {
    const [error, setError] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [school, setSchool] = React.useState({});
    let mounted = React.useRef(true);
    if (mounted.current)
        LoggedIn((err, user) => {
            setError(err);
            setUser(user);
            mounted.current = false;
        });
    let mountedList = React.useRef(true);
    if (mountedList.current)
        SchoolList((error, list) => {
            setSchool({ error, list });
            mountedList.current = false;
        });
    const loading = loadingComponent({ user, error });
    if (loading) return loading;
    if (!user) return <Redirect to="/login?redirect=profile" />;
    return (
        <>
            <Typography>
                <b>
                    profile page (sementara):
                    <br />
                    Nama:
                </b>{' '}
                {user.name}
                <br />
                <b>Email:</b> {user.email}
                <br />
                <b>Database ID:</b> {user._id}
                <br />
                <b>Sekolah yang saya daftarkan:</b>
                <br />
            </Typography>
            {getFormattedList(school, true, () => {
                setSchool({});
                SchoolList((error, list) => {
                    setSchool({ error, list });
                });
            })}
            <Button
                variant="contained"
                color="primary"
                to="/addschool"
                component={Link}
            >
                Tambah Sekolah
            </Button>
        </>
    );
};

export default Profile;
