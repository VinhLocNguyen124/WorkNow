import * as ActionTypes from './actionTypes';
import { getData, fetchData } from '../../apis/apiCaller';
import { ToastAndroid } from 'react-native';
import { cloudinaryUploadImage } from '../../helpers/MediaConfig';

export const addEducation = (userschool, email: string) => async (dispatch, getState) => {

    await dispatch({
        type: ActionTypes.ADD_EDUCATION_LOADING,
    });

    try {
        const resUserSchool = await fetchData("schools/addedu", "POST", userschool);
        const resUserGlobal = await getData("users/" + email);
        await dispatch({
            type: ActionTypes.GET_USER_AND_SET_TO_GLOBAL,
            payload: resUserGlobal
        });
        ToastAndroid.show("Thêm kinh nghiệm học tập thành công !!", ToastAndroid.SHORT);

    } catch (error) {
        await dispatch({
            type: ActionTypes.ADD_EDUCATION_ERROR,
            payload: error.message
        });
        ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
    }
}

export const updateEducation = (userschool, email: string) => async (dispatch, getState) => {

    await dispatch({
        type: ActionTypes.UPDATE_EDUCATION_LOADING,
    });

    try {
        const resUserSchool = await fetchData("schools/updateedu/" + userschool.iduserschool, "PUT", userschool);
        const resUserGlobal = await getData("users/" + email);
        await dispatch({
            type: ActionTypes.GET_USER_AND_SET_TO_GLOBAL,
            payload: resUserGlobal
        });
        ToastAndroid.show("Cập nhật kinh nghiệm học tập thành công !!", ToastAndroid.SHORT);

    } catch (error) {
        await dispatch({
            type: ActionTypes.UPDATE_EDUCATION_ERROR,
            payload: error.message
        });
        ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
    }
}

export const deleteEducation = (iduserschool: string, email: string) => async (dispatch, getState) => {

    await dispatch({
        type: ActionTypes.DELETE_EDUCATION_LOADING,
    });

    try {
        const resUserSchool = await fetchData("schools/deleteedu/" + iduserschool, "DELETE");
        const resUserGlobal = await getData("users/" + email);
        await dispatch({
            type: ActionTypes.GET_USER_AND_SET_TO_GLOBAL,
            payload: resUserGlobal
        });
        ToastAndroid.show("Xóa kinh nghiệm học tập thành công !!", ToastAndroid.SHORT);

    } catch (error) {
        await dispatch({
            type: ActionTypes.DELETE_EDUCATION_ERROR,
            payload: error.message
        });
        ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
    }
}



export const addExperience = (usercompany, email: string) => async (dispatch, getState) => {

    await dispatch({
        type: ActionTypes.ADD_EXPERIENCE_LOADING,
    });

    try {
        const resUserCompany = await fetchData("companies/addexp", "POST", usercompany);
        const resUserGlobal = await getData("users/" + email);
        await dispatch({
            type: ActionTypes.GET_USER_AND_SET_TO_GLOBAL,
            payload: resUserGlobal
        });
        ToastAndroid.show("Thêm kinh nghiệm làm việc thành công !!", ToastAndroid.SHORT);

    } catch (error) {
        await dispatch({
            type: ActionTypes.ADD_EXPERIENCE_ERROR,
            payload: error.message
        });
        ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
    }
}

export const updateExperience = (usercompany, email: string) => async (dispatch, getState) => {

    await dispatch({
        type: ActionTypes.UPDATE_EXPERIENCE_LOADING,
    });

    try {
        const resUserCompany = await fetchData("companies/updateexp/" + usercompany.idusercompany, "PUT", usercompany);
        const resUserGlobal = await getData("users/" + email);
        await dispatch({
            type: ActionTypes.GET_USER_AND_SET_TO_GLOBAL,
            payload: resUserGlobal
        });
        ToastAndroid.show("Cập nhật kinh nghiệm làm việc thành công !!", ToastAndroid.SHORT);

    } catch (error) {
        await dispatch({
            type: ActionTypes.UPDATE_EXPERIENCE_ERROR,
            payload: error.message
        });
        ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
    }
}

export const deleteExperience = (idusercompany: string, email: string) => async (dispatch, getState) => {

    await dispatch({
        type: ActionTypes.DELETE_EXPERIENCE_LOADING,
    });

    try {
        const resUserCompany = await fetchData("companies/deleteexp/" + idusercompany, "DELETE",);
        const resUserGlobal = await getData("users/" + email);
        await dispatch({
            type: ActionTypes.GET_USER_AND_SET_TO_GLOBAL,
            payload: resUserGlobal
        });
        ToastAndroid.show("Xóa kinh nghiệm làm việc thành công !!", ToastAndroid.SHORT);

    } catch (error) {
        await dispatch({
            type: ActionTypes.DELETE_EXPERIENCE_ERROR,
            payload: error.message
        });
        ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
    }
}



export const onUpdateUser = (user, imageSource) => (dispatch, getState) => {
    dispatch({
        type: ActionTypes.UPDATE_USER_LOADING,
    });

    if (imageSource) {
        cloudinaryUploadImage(imageSource).then(data => {
            user.urlavatar = data ? data.secure_url : "";

            fetchData("users/updateinfo/" + user.email, "PUT", user).then(data => {
                if (data.status === "success") {
                    getData("users/" + user.email).then(data => {
                        if (data) {
                            dispatch({
                                type: ActionTypes.UPDATE_USER_SUCCESS,
                                payload: data
                            });
                        }
                    });
                    ToastAndroid.show("Cập nhật thông tin thành công !!", ToastAndroid.SHORT);
                } else {
                    dispatch({
                        type: ActionTypes.UPDATE_USER_ERROR,
                        payload: data.message.message || 'Unexpected Error!!!',
                    });
                    ToastAndroid.show(`Error: ${data.message.message || '1Unexpected Error!!!'}`, ToastAndroid.SHORT);
                }
            }).catch(error => {
                dispatch({
                    type: ActionTypes.UPDATE_USER_ERROR,
                    payload: error.message || 'Unexpected Error!!!',
                });
                ToastAndroid.show(`Error: ${error.message || '2Unexpected Error!!!'}`, ToastAndroid.SHORT);
            });
        });
    } else {
        fetchData("users/updateinfo/" + user.email, "PUT", user).then(data => {
            if (data.status === "success") {
                getData("users/" + user.email).then(data => {
                    if (data) {
                        dispatch({
                            type: ActionTypes.UPDATE_USER_SUCCESS,
                            payload: data
                        });
                    }
                });
                ToastAndroid.show("Cập nhật thông tin thành công !!", ToastAndroid.SHORT);
            } else {
                dispatch({
                    type: ActionTypes.UPDATE_USER_ERROR,
                    payload: data.message.message || 'Unexpected Error!!!',
                });
                console.log(data)
                ToastAndroid.show(`Error: ${data.message.message || '3Unexpected Error!!!'}`, ToastAndroid.SHORT);
            }
        }).catch(error => {
            dispatch({
                type: ActionTypes.UPDATE_USER_ERROR,
                payload: error.message || 'Unexpected Error!!!',
            });
            ToastAndroid.show(`Error: ${error.message || '4Unexpected Error!!!'}`, ToastAndroid.SHORT);
        });
    }
}

export const getUserAndSetToGobal = (email) => (dispatch, getState) => {
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
}

export const createNewUser = (user) => (dispatch, getState) => {
    fetchData("users", "POST", user).then(data => {
        if (data.status === "success") {
            ToastAndroid.show("Tạo User mới thành công !!", ToastAndroid.SHORT);
        } else {
            ToastAndroid.show(`Error: ${data.message.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
        }
    }).catch(error => {
        ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
    });
}

