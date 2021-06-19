import { FETCHING_CARD, FETCHING_FAILED, FETCHING_SUCCESS } from '../actions/types';
import { addErrorMessage } from './error_actions';
import { apiFetchCard } from '../api/card';
import { logOut, error } from './auth_actions';

export const fetchCard = () => {
    return async dispatch => {
        try {
            dispatch({ type: FETCHING_CARD });
            const { data } = await apiFetchCard();
            dispatch({ type: FETCHING_SUCCESS, payload: data.card });
        } catch (e) {
            dispatch({ type: FETCHING_FAILED, payload: e });
            dispatch(addErrorMessage(e));
        }
    }
}