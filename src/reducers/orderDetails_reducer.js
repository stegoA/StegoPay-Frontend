import {FETCHING_ORDER_DETAILS, FETCHING_ORDER_DETAILS_SUCCESS, FETCHING_ORDER_DETAILS_FAILED} from '../actions/types';

const INITIAL_STATE = {
    fetching_order: false,
    order_details: null,
    error_fetching: false
};

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case FETCHING_ORDER_DETAILS: 
            return {...state, fetching_order: true, error_fetching: false};
        case FETCHING_ORDER_DETAILS_SUCCESS:
            return {...state, fetching_order: false, order_details: action.payload, error_fetching: false};
        case FETCHING_ORDER_DETAILS_FAILED:
            return {...state, fetching_order: false, order_details: null, error_fetching: true};
        default:
            return state;
    }
}