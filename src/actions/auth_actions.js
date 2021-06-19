import { AUTH_ATTEMPTING, AUTH_SUCCESS, AUTH_FAILED, USER_LOGGED_OUT, PROFILE_FETCHED } from './types';
import { apiLogin, fetchProfile } from '../api/user';
import setAuthHeader from '../api/setAuthHeader';

const TOKEN_NAME = 'stego_pay_token';

export const signIn = request_data => {
    return async dispatch => {
        dispatch({ type: AUTH_ATTEMPTING });
        try {
            const { data: { token } } = await apiLogin(request_data);
            setAuthHeader(token);
            dispatch(getUserProfile());
            dispatch(success(token));
        } catch (e) {
            const { response: { data }, } = e;
            dispatch(error(data.error));
        }
    };
};

export const onSignIn = () => {
    return dispatch => {
        try {
            const token = localStorage.getItem(TOKEN_NAME);
            if (token === null || token === 'undefined') {
                return ;
            }
            setAuthHeader(token);
            dispatch(getUserProfile());
            dispatch(success(token));
        } catch (e) {
            console.error(e);
        }
    }
}

export const getUserProfile = () => {
    return async dispatch => {
        try {
            const { data: { user } } = await fetchProfile();
            dispatch({ type: PROFILE_FETCHED, payload: user });
        } catch (e) {
            console.error(e);
        }
    }
}


export const logOut = () => {
    localStorage.clear();
    return ({ type: USER_LOGGED_OUT });
}

const success = (token) => {
    localStorage.setItem(TOKEN_NAME, token);
    return { type: AUTH_SUCCESS };
};

export const error = (error) => {
    return { type: AUTH_FAILED, payload: error }
};

