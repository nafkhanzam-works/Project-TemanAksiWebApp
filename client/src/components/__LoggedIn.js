import axios from 'axios';

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
