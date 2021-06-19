import axios from 'axios';

export const pay = (cardId) => {
    return axios.post('/pay', cardId,{withCredentials: true});
}