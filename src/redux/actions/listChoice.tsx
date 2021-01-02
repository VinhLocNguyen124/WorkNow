import * as ActionTypes from './actionTypes';
import { get } from '../../apis/apiCaller';
import { URLs } from '../../constansts/url'
import { ToastAndroid } from 'react-native';

export const getListProvince = (data = {}) => (dispatch, getState) => {

    dispatch({
        type: ActionTypes.GET_LIST_PROVINCE_LOADING,
    });

    get(URLs.URL_PROVINCES).then(data => {
        if (data) {
            let arrData = [];
            const arrKey = Object.keys(data);
            arrKey.map((key) => arrData.push({
                id: arrKey.indexOf(key),
                name: key,
                config: data[key]
            }));
            console.log(arrData)
            dispatch({
                type: ActionTypes.GET_LIST_PROVINCE_SUCCESS,
                payload: arrData
            });
        }
    }, error => {
        dispatch({
            type: ActionTypes.GET_LIST_PROVINCE_ERROR,
            payload: error.message || 'Unexpected Error!!!',
        });

        ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.SHORT);
    });

};

export const getListCityOrDistrict = (path: string) => (dispatch, getState) => {

    dispatch({
        type: ActionTypes.GET_LIST_CITY_LOADING,
    });

    get(URLs.URL_LOCATION + path.substring(1)).then(data => {
        if (data) {

            let arrData = [];
            const dataDistrict = data.district;
            dataDistrict.map(item => {
                arrData.push({
                    id: dataDistrict.indexOf(item),
                    name: item.name,
                    pre: item.pre
                });
            });

            console.log(arrData);

            dispatch({
                type: ActionTypes.GET_LIST_CITY_SUCCESS,
                payload: arrData
            });
        }
    }, error => {
        dispatch({
            type: ActionTypes.GET_LIST_CITY_ERROR,
            payload: error.message || 'Unexpected Error!!!',
        });

        ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.SHORT);
    });

};

export const onSelectProvince = (provinceName: string, path: string) => (dispatch, getState) => {
    dispatch({
        type: ActionTypes.SELECT_PROVINCE,
        payload: {
            provinceName: provinceName,
            path: path
        }
    });
}

export const onSelectCity = (cityName: string) => (dispatch, getState) => {
    dispatch({
        type: ActionTypes.SELECT_CITY,
        payload: cityName,
    });
}

