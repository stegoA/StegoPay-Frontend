import { FETCHING_CARD, FETCHING_SUCCESS, FETCHING_FAILED } from '../actions/types';

const INITIAL_STATE = {
    fetching: false,
    card: [],
    error_fetching: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCHING_CARD:
            return { ...state, fetching: true, error_fetching: null };
        case FETCHING_SUCCESS:
            return { ...state, fetching: false, card: action.payload, error_fetching: null };
        case FETCHING_FAILED:
            return { ...state, fetching: false, card: [], error_fetching: action.payload };
        default:
            return state;
    }
}