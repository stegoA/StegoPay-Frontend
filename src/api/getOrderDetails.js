import axios from 'axios';

export const getOrderDetails = () => {

    return axios.get('/getOrderDetails' , {withCredentials: true});
}