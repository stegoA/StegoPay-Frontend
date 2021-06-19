import axios from 'axios';

export const apiFetchCard = () => {
    return axios.get('/getAllCards');
}