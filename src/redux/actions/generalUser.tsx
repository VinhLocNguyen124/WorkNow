import * as ActionTypes from './actionTypes';
import { getData, fetchData } from '../../apis/apiCaller';
import { ToastAndroid } from 'react-native';
import { cloudinaryUploadImage } from '../../helpers/MediaConfig';


export const getInfoGeneralUser = (email: string) => (dispatch, getState) => {
    getData("users/" + email).then(data => {
        if (data) {
            //can handle data with getState in here and then just dispatch
            dispatch({
                type: ActionTypes.GET_INFO_GENERAL_USER,
                payload: data
            });
        }
    }).catch(error => {
        ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
    });
}