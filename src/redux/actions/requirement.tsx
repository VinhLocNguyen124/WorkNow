import * as ActionTypes from './actionTypes';
import { getData, fetchData } from '../../apis/apiCaller';
import { ToastAndroid } from 'react-native';


export const submitRequirement = (body) => (dispatch, getState) => {
    dispatch({
        type: ActionTypes.SUBMIT_REQUIREMENT_LOADING,
    });

    fetchData("requirements", "POST", body).then(data => {
        if (data.status === "success") {
            dispatch({
                type: ActionTypes.SUBMIT_REQUIREMENT_SUCCESS,
            });
            ToastAndroid.show(`Yêu cầu của bạn đã được đưa lên hệ thống, chúng tôi sẽ thông báo cho bạn ngay khi tìm thấy ứng viên phù hợp !`, ToastAndroid.SHORT);
        } else {
            dispatch({
                type: ActionTypes.SUBMIT_REQUIREMENT_ERROR,
                payload: data.message.message || 'Unexpected Error!!!',
            });
            ToastAndroid.show(`Yêu cầu của bạn đã được đưa lên hệ thống, chúng tôi sẽ thông báo cho bạn ngay khi tìm thấy ứng viên phù hợp !`, ToastAndroid.SHORT);
        }
    }, error => {
        dispatch({
            type: ActionTypes.SUBMIT_REQUIREMENT_ERROR,
            payload: error.message || 'Unexpected Error!!!',
        });
        ToastAndroid.show(`Yêu cầu của bạn đã được đưa lên hệ thống, chúng tôi sẽ thông báo cho bạn ngay khi tìm thấy ứng viên phù hợp !`, ToastAndroid.SHORT);
    });
}