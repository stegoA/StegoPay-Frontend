import { combineReducers } from 'redux';

import auth from './auth_reducer';
import card from './card_reducer';
import error from './error_reducer';
import order from './orderDetails_reducer';



export default combineReducers({
    auth,
    card,
    error,
    order
});