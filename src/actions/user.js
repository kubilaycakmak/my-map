import { 
    WALLET_SET_SUCCESS,
    WALLET_SET_FAIL,
    WALLET_SET_UPDATE,
    SET_MESSAGE,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_SUCCESS,
    AUTH_FAIL
} from './types';

import UserService from '../services/user.service';

export const setWalletAddress = (email, walletAddress) => (dispatch) => {
    return UserService.setWalletAddress(email, walletAddress).then(
        (response) => {
            dispatch({
                type: WALLET_SET_SUCCESS,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: WALLET_SET_FAIL,
            });
      
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            
            return Promise.reject();
        }
    )
}

export const me = () => (dispatch) => {
    return UserService.me().then(
        (data) => {
            dispatch({
                type: AUTH_SUCCESS,
                payload: { user: data },
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: AUTH_FAIL,
            });
      
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            
            return Promise.reject();
        }
    )
}