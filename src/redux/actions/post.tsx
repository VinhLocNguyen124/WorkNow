import * as ActionTypes from './actionTypes';
import { getData, fetchData } from '../../apis/apiCaller';
import { ToastAndroid } from 'react-native';
import { cloudinaryUploadImage } from '../../helpers/MediaConfig';

const addNakedPost = (dispatch, post, navigation, email) => {
    fetchData("posts", "POST", post).then(data => {
        if (data.status === "success") {
            getData("posts/" + email).then(data => {
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
    });
}

export const getListPost = (email: string) => (dispatch, getState) => {

    dispatch({
        type: ActionTypes.GET_LIST_POST_LOADING,
    });

    //xử lý code bất đồng bộ và dispatch các hàm đồng bộ ở trên
    getData("posts/" + email).then(data => {
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

export const addNewPost = (post, imageSource, pdfSource, navigation, email) => (dispatch, getState) => {
    dispatch({
        type: ActionTypes.LOADING_ADD_NEW_POST,
    });
    if (imageSource) {
        cloudinaryUploadImage(imageSource).then(data => {
            post.imgurl = data ? data.secure_url : "";
            addNakedPost(dispatch, post, navigation, email);
        })
    } else {
        addNakedPost(dispatch, post, navigation, email);
    }
}

export const likePost = (iduser: string, idpost: string) => (dispatch, getState) => {

    const likepost = {
        idpost: idpost,
        iduser: iduser,
    }

    fetchData("posts/likepost", "POST", likepost).then(data => {
        console.log(data);
        if (data.status === "success") {
            dispatch({
                type: ActionTypes.LIKE_POST,
                payload: idpost
            });
            ToastAndroid.show(`Bạn đã thích bài viết !`, ToastAndroid.SHORT);
        } else {
            console.log(data);
            ToastAndroid.show(`Error: ${data.message.message || '1Unexpected Error!!!'}`, ToastAndroid.SHORT);
        }
    }).catch(error => {
        ToastAndroid.show(`Error: ${error.message || '2Unexpected Error!!!'}`, ToastAndroid.SHORT);
    });


};

export const disLikePost = (iduser: string, idpost: string) => (dispatch, getState) => {

    const likepost = {
        idpost: idpost,
        iduser: iduser,
    }

    fetchData("posts/dislikepost", "POST", likepost).then(data => {
        console.log(data);
        if (data.status === "success") {
            dispatch({
                type: ActionTypes.DISLIKE_POST,
                payload: idpost
            });
            ToastAndroid.show(`Bạn đã bỏ thích bài viết !`, ToastAndroid.SHORT);
        } else {
            console.log(data);
            ToastAndroid.show(`Error: ${data.message.message || '1Unexpected Error!!!'}`, ToastAndroid.SHORT);
        }
    }).catch(error => {
        ToastAndroid.show(`Error: ${error.message || '2Unexpected Error!!!'}`, ToastAndroid.SHORT);
    });


};


export const getSpecificPost = (email: string, idpost: string) => (dispatch, getState) => {

    dispatch({
        type: ActionTypes.GET_SPECIFIC_POST_LOADING,
    });

    fetchData("posts/specific", "POST", { emailcurrentuser: email, idpost: idpost }).then(data => {
        if (data) {
            dispatch({
                type: ActionTypes.GET_SPECIFIC_POST_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: ActionTypes.GET_SPECIFIC_POST_ERROR,
                payload: data.message.message || 'Unexpected Error!!!',
            });
        }
    }, error => {
        dispatch({
            type: ActionTypes.GET_SPECIFIC_POST_ERROR,
            payload: error.message || 'Unexpected Error!!!',
        });
    });

};

export const submitComment = (body, email: string, idpost: string) => (dispatch, getState) => {

    dispatch({
        type: ActionTypes.SUBMIT_COMMENT_LOADING,
    });

    fetchData("comments", "POST", body).then(data => {
        if (data.status === "success") {
            fetchData("posts/specific", "POST", { emailcurrentuser: email, idpost: idpost }).then(data => {
                if (data) {
                    dispatch({
                        type: ActionTypes.GET_SPECIFIC_POST_SUCCESS,
                        payload: data
                    });
                } else {
                    dispatch({
                        type: ActionTypes.GET_SPECIFIC_POST_ERROR,
                        payload: data.message.message || 'Unexpected Error!!!',
                    });
                }
            }, error => {
                dispatch({
                    type: ActionTypes.GET_SPECIFIC_POST_ERROR,
                    payload: error.message || 'Unexpected Error!!!',
                });
            });
        }
    }, error => {
        dispatch({
            type: ActionTypes.SUBMIT_COMMENT_ERROR,
            payload: error.message || 'Unexpected Error!!!',
        });
    });
}
