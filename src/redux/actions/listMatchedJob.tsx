import * as ActionTypes from './actionTypes';
import { get } from '../../apis/apiCaller';
import { URLs } from '../../constansts/url'
import { ToastAndroid } from 'react-native';
import { listCompany } from '../../constansts/listCompany';
import { returnExpectUniArray, checkExistingItemInArray } from '../../helpers/ArrayHandling';




export const getListCompanyFilter = () => (dispatch, getState) => {

    dispatch({
        type: ActionTypes.GET_LIST_COMPANY_FILTER,
        payload: listCompany,
    });
}

// export const onSelectUni = (uniName: string) => (dispatch, getState) => {

//     dispatch({
//         type: ActionTypes.SELECT_UNI,
//         payload: uniName,
//     });
// }

export const onSearchCompanyFilter = (textSearch: string) => (dispatch, getState) => {

    let newListComp = listCompany;
    newListComp = newListComp.filter((company) => {
        return company.name.toLowerCase().trim().search(textSearch.toLowerCase().trim()) !== -1;
    });

    dispatch({
        type: ActionTypes.SEARCH_COMPANY_FILTER,
        payload: newListComp,
    });
}


