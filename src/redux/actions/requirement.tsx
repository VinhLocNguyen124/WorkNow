import * as ActionTypes from './actionTypes';
import { getData, fetchData } from '../../apis/apiCaller';
import { ToastAndroid } from 'react-native';
import { cloudinaryUploadImage } from '../../helpers/MediaConfig';


export const submitRequirement = (body, imageSource) => (dispatch, getState) => {

    dispatch({
        type: ActionTypes.SUBMIT_REQUIREMENT_LOADING,
    });

    if (imageSource) {
        cloudinaryUploadImage(imageSource).then(data => {
            body.company_logo = data ? data.secure_url : "https://res.cloudinary.com/locnguyen-cloud/image/upload/v1620160155/company_logo_dsexws.png";

            fetchData("requirements", "POST", body).then(data => {
                if (data.status === "success") {
                    dispatch({
                        type: ActionTypes.SUBMIT_REQUIREMENT_SUCCESS,
                    });
                    ToastAndroid.show(`Yêu cầu của bạn đã được đưa lên hệ thống, chúng tôi sẽ thông báo cho bạn ngay khi tìm thấy ứng viên phù hợp!`, ToastAndroid.SHORT);
                }
            }, error => {
                dispatch({
                    type: ActionTypes.SUBMIT_REQUIREMENT_ERROR,
                    payload: error.message || 'Unexpected Error!!!',
                });
                ToastAndroid.show(`Hệ thống đang bị lỗi, vui lòng thử lại!`, ToastAndroid.SHORT);
            });
        })
    } else {
        fetchData("requirements", "POST", body).then(data => {
            if (data.status === "success") {
                dispatch({
                    type: ActionTypes.SUBMIT_REQUIREMENT_SUCCESS,
                });
                ToastAndroid.show(`Yêu cầu của bạn đã được đưa lên hệ thống, chúng tôi sẽ thông báo cho bạn ngay khi tìm thấy ứng viên phù hợp!`, ToastAndroid.SHORT);
            }
        }, error => {
            dispatch({
                type: ActionTypes.SUBMIT_REQUIREMENT_ERROR,
                payload: error.message || 'Unexpected Error!!!',
            });
            ToastAndroid.show(`Hệ thống đang bị lỗi, vui lòng thử lại!`, ToastAndroid.SHORT);
        });
    }
}