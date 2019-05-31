import React from 'react';
import { Redirect } from 'react-router-dom';
import LoggedIn, { loadingComponent } from '../contexts/LoggedIn';

const AddSchoolForm = () => {
    const auth = LoggedIn();
    const loading = loadingComponent(auth);
    if (loading) return loading;
    return auth.user ? (
        <div>tambah sekolah form</div>
    ) : (
        <Redirect to="/login?redirect=addschool" /> // add props no check if it's loggedin or not (?)
    );
};

export default AddSchoolForm;
