import * as ActionTypes from './actionTypes';
import { ToastAndroid } from 'react-native';

export const saveAccount = (
    email: string,
    password: string,
    checkSaveAccount: boolean) => (dispatch, getState) => {
        dispatch({
            type: ActionTypes.SAVE_ACCOUNT,
            payload: {
                email: email,
                password: password,
                checkSaveAccount: checkSaveAccount,
            }
        });
    };


