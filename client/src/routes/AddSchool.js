import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

const AddSchoolForm = () => {
    let isLoggedIn = false;
    Axios
        .get('api/isloggedin')
        .then(res => {
            isLoggedIn = res;
        })
        .catch(err => console.log(err));
    return isLoggedIn ? <div>tambah sekolah form</div> : <Redirect to='/login?redirect=addschool'/>;
}
 
export default AddSchoolForm;