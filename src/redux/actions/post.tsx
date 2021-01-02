import * as ActionTypes from './actionTypes';
import { getData, fetchData } from '../../apis/apiCaller';
import { ToastAndroid } from 'react-native';
import { cloudinaryUploadImage } from '../../helpers/MediaConfig';

export const getListPost = (data = {}) => (dispatch, getState) => {

    dispatch({
        type: ActionTypes.GET_LIST_POST_LOADING,
    });

    //xử lý code bất đồng bộ và dispatch các hàm đồng bộ ở trên
    getData("posts").then(data => {
        // có thể handle data bằng getState tại đây rồi mới dispatch
        if (data) {
            dispatch({
                type: ActionTypes.GET_LIST_POST_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: ActionTypes.GET_LIST_POST_ERROR,
                payload: data.message.message || 'Unexpected Error!!!',
            });
        }
    }, error => {
        dispatch({
            type: ActionTypes.GET_LIST_POST_ERROR,
            payload: error.message || 'Unexpected Error!!!',
        });
    });

};



export const addNewPost = (post, imageSource, navigation) => (dispatch, getState) => {


    dispatch({
        type: ActionTypes.LOADING_ADD_NEW_POST,
    });

    if (imageSource) {

        cloudinaryUploadImage(imageSource).then(data => {
            post.imgurl = data ? data.secure_url : "";

            fetchData("posts", "POST", post).then(data => {
                if (data.status === "success") {
                    getData("posts").then(data => {

                        if (data) {
                            //can handle data with getState in here and then just dispatch
                            dispatch({
                                type: ActionTypes.ADD_NEW_POST_SUCCESS,
                                payload: data
                            });
                        }
                    });

                    ToastAndroid.show("Đăng bài thành công !!", ToastAndroid.SHORT);
                    navigation.navigate('Home');
                } else {
                    dispatch({
                        type: ActionTypes.ADD_NEW_POST_ERROR,
                        payload: data.message.message || 'Unexpected Error!!!',
                    });

                    ToastAndroid.show(`Error: ${data.message.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
                }
            }).catch(error => {
                dispatch({
                    type: ActionTypes.ADD_NEW_POST_ERROR,
                    payload: error.message || 'Unexpected Error!!!',
                });

                ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
            })
        });

    } else {

        fetchData("posts", "POST", post).then(data => {
            if (data.status === "success") {
                getData("posts").then(data => {
                    // có thể handle data bằng getState tại đây rồi mới dispatch
                    if (data) {
                        dispatch({
                            type: ActionTypes.ADD_NEW_POST_SUCCESS,
                            payload: data
                        });
                    }
                });

                ToastAndroid.show("Đăng bài thành công !!", ToastAndroid.SHORT);
                navigation.navigate('Home');
            } else {
                dispatch({
                    type: ActionTypes.ADD_NEW_POST_ERROR,
                    payload: data.message.message || 'Unexpected Error!!!',
                });

                ToastAndroid.show(`Error: ${data.message.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
            }
        }).catch(error => {
            dispatch({
                type: ActionTypes.ADD_NEW_POST_ERROR,
                payload: error.message || 'Unexpected Error!!!',
            });

            ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
        });
    }
}

