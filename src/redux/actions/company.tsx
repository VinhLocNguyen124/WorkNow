import * as ActionTypes from './actionTypes';
import { getData, fetchData } from '../../apis/apiCaller';
import { ToastAndroid } from 'react-native';
import { cloudinaryUploadImage } from '../../helpers/MediaConfig';

export const getListCompany = () => (dispatch, getState) => {

    getData("companies").then(data => {

        if (data) {
            dispatch({
                type: ActionTypes.GET_LIST_COMPANY,
                payload: data
            });
        } else {
            dispatch({
                type: ActionTypes.GET_LIST_COMPANY_ERROR,
                payload: data.message.message || 'Unexpected Error!!!',
            });
            ToastAndroid.show(`Error: ${data.message.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
        }

    }, error => {
        dispatch({
            type: ActionTypes.GET_LIST_COMPANY_ERROR,
            payload: error.message || 'Unexpected Error!!!',
        });
        ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
    });

};

export const onSearchCompany = (name: string) => (dispatch, getState) => {
    getData("companies").then(data => {
        if (data) {

            data = data.filter((company) => {
                return company.name.toLowerCase().trim().search(name.toLowerCase().trim()) !== -1;
            });

            dispatch({
                type: ActionTypes.SEARCH_COMPANY,
                payload: data
            });
        } else {
            dispatch({
                type: ActionTypes.GET_LIST_COMPANY_ERROR,
                payload: data.message.message || 'Unexpected Error!!!',
            });
            ToastAndroid.show(`Error: ${data.message.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
        }
    }, error => {
        dispatch({
            type: ActionTypes.GET_LIST_COMPANY_ERROR,
            payload: error.message || 'Unexpected Error!!!',
        });
        ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
    });

};



