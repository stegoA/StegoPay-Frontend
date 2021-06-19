import axios from 'axios';

export const apiLogin = (request_data) => {
    return axios.post('/logIn', request_data);
};

export const fetchProfile = () => {
    return axios.get('/profile');
}