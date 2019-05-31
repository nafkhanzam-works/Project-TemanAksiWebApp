import React from 'react';
import LoggedIn, { loadingComponent } from '../contexts/LoggedIn';
import { Redirect } from 'react-router-dom';

const Profile = () => {
    const auth = LoggedIn();
    const loading = loadingComponent(auth);
    if (loading) return loading;
    if (!auth.loggedIn) return <Redirect to='/login?redirect=profile' />;
    return ( <div>profile page</div> );
}

export default Profile;