import * as ActionTypes from './actionTypes';
import { getData, fetchData } from '../../apis/apiCaller';
import { ToastAndroid } from 'react-native';

export const onTriggerNewMessageNotification = (
    roomkey: string, // Mã phòng chat
    messageContent: string, // Nội dung tin nhắn
    iduser: string, // Mã người gửi tin nhắn
    username: string, // Tên người gửi tin nhắn
    urlavatar: string, // Ảnh đại diện người gửi tin nhắn
    lastMessageSendingTime: string // Thông tin tin nhắn cuối cùng trong cuộc hội thoại giữa hai người
) => async (dispatch, getState) => {

    const data = {
        iduser: iduser,
        username: username,
        urlavatar: urlavatar,
        roomkey: roomkey,
        messageContent: messageContent,
        lastMessageSendingTime: lastMessageSendingTime
    }

    fetchData('notifications/message/' + iduser, "POST", data).then(res => {
        if (res.status === "success") {
            console.log("Thành công", res.time);
        } else {
            console.log("Thất bại", res.time);
        }
    })

};

export const getNotifications = (iduser: string) => async (dispatch, getState) => {

    dispatch({
        type: ActionTypes.GET_NOTIFICATION_LOADING,
    });

    getData('notifications/specificuser/' + iduser).then(data => {
        dispatch({
            type: ActionTypes.GET_NOTIFICATION_SUCCESS,
            payload: data
        });
    }).catch(error => {
        dispatch({
            type: ActionTypes.GET_NOTIFICATION_ERROR,
        });
        ToastAndroid.show("Error:" + error.message, ToastAndroid.SHORT);
    });

};

export const reloadNotification = (iduser: string) => async (dispatch, getState) => {
    getData('notifications/specificuser/' + iduser).then(data => {
        dispatch({
            type: ActionTypes.RELOAD_NOTIFICATION,
            payload: data
        });
    }).catch(error => {
        ToastAndroid.show("Error:" + error.message, ToastAndroid.SHORT);
    });
}

export const deleteAllNotification = (iduser: string) => async (dispatch, getState) => {
    dispatch({
        type: ActionTypes.DELETE_ALL_NOTIFICATION_LOADING,
    });

    fetchData('notifications/specificuser/deleteall/' + iduser, "DELETE").then(data => {
        getData('notifications/specificuser/' + iduser).then(data => {
            dispatch({
                type: ActionTypes.RELOAD_NOTIFICATION,
                payload: data
            });
            dispatch({
                type: ActionTypes.DELETE_ALL_NOTIFICATION_SUCCESS
            });
        })
    }).catch(error => {
        dispatch({
            type: ActionTypes.DELETE_ALL_NOTIFICATION_ERROR
        });
        ToastAndroid.show("Error:" + error.message, ToastAndroid.SHORT);
    });
}

export const deleteOneNotification = (idnoti: string, iduser: string) => async (dispatch, getState) => {
    dispatch({
        type: ActionTypes.DELETE_ONE_NOTIFICATION_LOADING,
    });

    fetchData('notifications/specificuser/deleteone/' + idnoti, "DELETE").then(data => {
        getData('notifications/specificuser/' + iduser).then(data => {
            dispatch({
                type: ActionTypes.RELOAD_NOTIFICATION,
                payload: data
            });
            dispatch({
                type: ActionTypes.DELETE_ONE_NOTIFICATION_SUCCESS
            });
        })
    }).catch(error => {
        dispatch({
            type: ActionTypes.DELETE_ONE_NOTIFICATION_ERROR
        });
        ToastAndroid.show("Error:" + error.message, ToastAndroid.SHORT);
    });
}

export const markAllAsReadNotification = (iduser: string) => async (dispatch, getState) => {

    dispatch({
        type: ActionTypes.MARK_ALL_AS_READ_NOTIFICATION_LOADING,
    });

    fetchData('notifications/specificuser/markallasread/' + iduser, "PATCH").then(data => {
        getData('notifications/specificuser/' + iduser).then(data => {
            dispatch({
                type: ActionTypes.RELOAD_NOTIFICATION,
                payload: data
            });
            dispatch({
                type: ActionTypes.MARK_ALL_AS_READ_NOTIFICATION_SUCCESS
            });
        })
    }).catch(error => {
        dispatch({
            type: ActionTypes.MARK_ALL_AS_READ_NOTIFICATION_ERROR
        });
        ToastAndroid.show("Error:" + error.message, ToastAndroid.SHORT);
    });
}

export const markOneAsReadNotification = (iduser: string, idnoti: string) => async (dispatch, getState) => {
    fetchData('notifications/specificuser/markoneasread/' + idnoti, "PATCH").then(data => {
        console.log()
    }).catch(error => {
        ToastAndroid.show("Error:" + error.message, ToastAndroid.SHORT);
    });
}




