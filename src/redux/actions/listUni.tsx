import * as ActionTypes from './actionTypes';
import { get } from '../../apis/apiCaller';
import { URLs } from '../../constansts/url'
import { ToastAndroid } from 'react-native';
import { listUni } from '../../constansts/listUni';
import { returnExpectUniArray, checkExistingItemInArray } from '../../helpers/ArrayHandling';




export const getListUni = () => (dispatch, getState) => {

    const newlistUni = returnExpectUniArray(listUni);

    dispatch({
        type: ActionTypes.GET_LIST_UNI,
        payload: newlistUni,
    });
}

export const onSelectUni = (uniName: string) => (dispatch, getState) => {

    dispatch({
        type: ActionTypes.SELECT_UNI,
        payload: uniName,
    });
}

export const onSearchUni = (textSearch: string) => (dispatch, getState) => {

    let newlistUni = returnExpectUniArray(listUni);

    newlistUni = newlistUni.filter((uni) => {
        return uni.name.toLowerCase().trim().search(textSearch.toLowerCase().trim()) !== -1;
    });

    dispatch({
        type: ActionTypes.SEARCH_UNI,
        payload: newlistUni,
    });
}


