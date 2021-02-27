import * as ActionTypes from './actionTypes';
import { getData, fetchData } from '../../apis/apiCaller';
import { ToastAndroid } from 'react-native';


export const sendRequest = (idUserSend: string, idUserRecieve: string) => (dispatch, getState) => {

    const body = {
        idusersend: idUserSend,
        iduserrecieve: idUserRecieve,
        status: "pending",
    }

    dispatch({
        type: ActionTypes.SEND_REQUEST_LOADING
    });

    fetchData("requests", "POST", body).then(data => {
        if (data.status === "success") {
            dispatch({
                type: ActionTypes.SEND_REQUEST_SUCCESS
            });
            ToastAndroid.show(`Yêu cầu kết nối được gửi thành công !`, ToastAndroid.SHORT);
        } else {
            dispatch({
                type: ActionTypes.SEND_REQUEST_ERROR,
                payload: data.message
            });
            ToastAndroid.show(`Error: ${data.message.message || '1Unexpected Error!!!'}`, ToastAndroid.SHORT);
        }
    }).catch(error => {
        dispatch({
            type: ActionTypes.SEND_REQUEST_ERROR,
            payload: error.message
        });
        ToastAndroid.show(`Error: ${error.message || '2Unexpected Error!!!'}`, ToastAndroid.SHORT);
    });
}

export const deleteRequest = (idrequest: string, email: string) => (dispatch, getState) => {

    dispatch({
        type: ActionTypes.DELETE_REQUEST_LOADING
    });

    fetchData("requests/deleterequest/" + idrequest, "DELETE").then(data => {
        if (data.status === "success") {
            dispatch({
                type: ActionTypes.DELETE_REQUEST_SUCCESS
            });
            getData("users/" + email).then(data => {
                if (data) {
                    //can handle data with getState in here and then just dispatch
                    dispatch({
                        type: ActionTypes.GET_USER_AND_SET_TO_GLOBAL,
                        payload: data
                    });
                }
            }).catch(error => {
                ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
            });
            ToastAndroid.show(`Đã xóa yêu cầu kết nối !`, ToastAndroid.SHORT);
        } else {
            dispatch({
                type: ActionTypes.DELETE_REQUEST_ERROR,
                payload: data.message
            });
            ToastAndroid.show(`Error: ${data.message.message || '1Unexpected Error!!!'}`, ToastAndroid.SHORT);
        }
    }).catch(error => {
        dispatch({
            type: ActionTypes.DELETE_REQUEST_ERROR,
            payload: error.message
        });
        ToastAndroid.show(`Error: ${error.message || '2Unexpected Error!!!'}`, ToastAndroid.SHORT);
    });
}

export const acceptRequest = (idrequest: string, email: string) => (dispatch, getState) => {
    fetchData("requests/acceptrequest/" + idrequest, "PUT").then(data => {
        if (data.status === "success") {
            getData("users/" + email).then(data => {
                if (data) {
                    //can handle data with getState in here and then just dispatch
                    dispatch({
                        type: ActionTypes.GET_USER_AND_SET_TO_GLOBAL,
                        payload: data
                    });
                    ToastAndroid.show(`Các bạn đã được kết nối với nhau !`, ToastAndroid.SHORT);
                }
            }).catch(error => {
                ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
            });

        } else {
            ToastAndroid.show(`Error: ${data.message.message || '1Unexpected Error!!!'}`, ToastAndroid.SHORT);
        }
    }).catch(error => {
        ToastAndroid.show(`Error: ${error.message || '2Unexpected Error!!!'}`, ToastAndroid.SHORT);
    });
}




