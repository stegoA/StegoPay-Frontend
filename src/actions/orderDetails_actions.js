import {FETCHING_ORDER_DETAILS, FETCHING_ORDER_DETAILS_SUCCESS, FETCHING_ORDER_DETAILS_FAILED} from './types';
import {getOrderDetails} from '../api/getOrderDetails';

export const fetchOrderDetails = () =>{
    return async dispatch => {
        try{
            dispatch({type: FETCHING_ORDER_DETAILS});
            const {data} = await getOrderDetails();
            dispatch({type: FETCHING_ORDER_DETAILS_SUCCESS, payload: data.order[0]});
        }
        catch(e){
            dispatch({type: FETCHING_ORDER_DETAILS_FAILED});
        }
    }
}