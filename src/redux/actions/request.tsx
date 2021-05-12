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
            ToastAndroid.show(`Error: ${data.message || '1Unexpected Error!!!'}`, ToastAndroid.SHORT);
        }
    }).catch(error => {
        dispatch({
            type: ActionTypes.SEND_REQUEST_ERROR,
            payload: error.message
        });
        ToastAndroid.show(`Error: ${error.message || '2Unexpected Error!!!'}`, ToastAndroid.SHORT);
    });
}

export const deleteRequest = (idrequest: string, email: string, callback: Function = null) => (dispatch, getState) => {

    dispatch({
        type: ActionTypes.DELETE_REQUEST_LOADING
    });

    fetchData("requests/deleterequest/" + idrequest, "DELETE").then(data => {
        if (data.status === "success") {

            dispatch({
                type: ActionTypes.DELETE_REQUEST_SUCCESS
            });
            ToastAndroid.show(`Đã xóa yêu cầu kết nối !`, ToastAndroid.SHORT);

            getData("users/" + email).then(data => {
                if (data) {
                    //can handle data with getState in here and then just dispatch
                    dispatch({
                        type: ActionTypes.GET_USER_AND_SET_TO_GLOBAL,
                        payload: data
                    });
                }
            })

            callback();

        }
    }).catch(error => {
        dispatch({
            type: ActionTypes.DELETE_REQUEST_ERROR,
            payload: error.message
        });
        ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
    });
}

export const acceptRequest = (idrequest: string, email: String, callback: Function = null) => (dispatch, getState) => {
    dispatch({
        type: ActionTypes.ACCEPT_REQUEST_LOADING,
    });

    fetchData("requests/acceptrequest/" + idrequest, "PUT").then(data => {
        if (data.status === "success") {

            dispatch({
                type: ActionTypes.ACCEPT_REQUEST_SUCCESS,
            });
            ToastAndroid.show(`Các bạn đã được kết nối với nhau !`, ToastAndroid.SHORT);

            getData("users/" + email).then(data => {
                if (data) {
                    //can handle data with getState in here and then just dispatch
                    dispatch({
                        type: ActionTypes.GET_USER_AND_SET_TO_GLOBAL,
                        payload: data
                    });
                }
            });

            callback();
        }
    }).catch(error => {
        dispatch({
            type: ActionTypes.ACCEPT_REQUEST_ERROR,
        });
        ToastAndroid.show(`Error: ${error.message || '2Unexpected Error!!!'}`, ToastAndroid.SHORT);
    });
}

export const getListFriend = (idcurrentuser: string) => (dispatch, getState) => {

    dispatch({
        type: ActionTypes.GET_LIST_FRIEND_LOADING
    });

    getData("requests/friends/" + idcurrentuser).then(data => {
        if (data) {
            dispatch({
                type: ActionTypes.GET_LIST_FRIEND_SUCCESS,
                payload: data
            });
        }
    }).catch(error => {
        dispatch({
            type: ActionTypes.GET_LIST_FRIEND_ERROR,
            payload: error
        });
        ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
    });

}

export const disconnect = (idconnect: string, idcurrentuser: string) => (dispatch, getState) => {

    dispatch({
        type: ActionTypes.DISCONNECT_LOADING
    });

    fetchData("requests/disconnect/" + idconnect, "DELETE").then(data => {
        if (data.status === "success") {

            getData("requests/friends/" + idcurrentuser).then(data => {
                if (data) {
                    dispatch({
                        type: ActionTypes.DISCONNECT_SUCCESS
                    });
                    dispatch({
                        type: ActionTypes.GET_LIST_FRIEND_SUCCESS,
                        payload: data
                    });
                }
            })

            ToastAndroid.show(`Đã ngắt kết nối thành công !`, ToastAndroid.SHORT);
        }
    }).catch(error => {
        dispatch({
            type: ActionTypes.DISCONNECT_ERROR,
            payload: error.message
        });
        ToastAndroid.show(`Error: ${error.message || '2Unexpected Error!!!'}`, ToastAndroid.SHORT);
    });
}

export const onSearchFriend = (textSearch: string, idcurrentuser: string) => (dispatch, getState) => {

    const data = {
        textSearch: textSearch,
        idcurrentuser: idcurrentuser
    }

    fetchData("requests/search/friends", "POST", data).then(data => {
        if (data) {

            dispatch({
                type: ActionTypes.SEARCH_FRIEND,
                payload: data
            });


        }
    }).catch(error => {
        ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
    });
}








