import React from 'react';
import { Redirect } from 'react-router-dom';
import LoggedIn from './states/LoggedIn';

const AddSchoolForm = () => {
    const [isLoggedIn,, loading] = LoggedIn.apply(this);
    if (loading) return loading;
    return isLoggedIn ? (
        <div>tambah sekolah form</div>
    ) : (
        <Redirect to="/login?redirect=addschool" />
    );
};

export default AddSchoolForm;
