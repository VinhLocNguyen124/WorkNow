import * as ActionTypes from './actionTypes';
import { ToastAndroid } from 'react-native';
import { fetchData } from '../../apis/apiCaller';

export const handleMessageBadge = (email: string) => (dispatch, getState) => {

    fetchData('badge/message/' + email, "POST").then(res => {
        if (res) {

            dispatch({
                type: ActionTypes.MESSAGE_BADGE_HANDLE,
                payload: res.badge
            });
        }
    }).catch(error => {
        ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
    });

};

export const handleNotificationBadge = (email: string) => async (dispatch, getState) => {
    fetchData('badge/notification/' + email, "POST").then(res => {
        if (res) {

            dispatch({
                type: ActionTypes.NOTIFICATION_BADGE_HANDLE,
                payload: res.badge
            });
        }
    }).catch(error => {
        ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
    });

};


