import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    listProvince: [],
    loadingProvince: false,
    listCityOrDistrict: [],
    loadingCityOrDistrict: false,

    error: '',
    province: '',
    city: '',
    path: ''
}

const listChoiceReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.GET_LIST_PROVINCE_LOADING: {
            return {
                ...state,
                loadingProvince: true
            }
            break;
        }

        case ActionTypes.GET_LIST_CITY_LOADING: {
            return {
                ...state,
                loadingCityOrDistrict: true
            }
            break;
        }

        case ActionTypes.GET_LIST_PROVINCE_SUCCESS: {
            return {
                ...state,
                listProvince: action.payload,
                loadingProvince: false,
            }
            break;
        }

        case ActionTypes.GET_LIST_CITY_SUCCESS: {
            return {
                ...state,
                listCityOrDistrict: action.payload,
                loadingCityOrDistrict: false,
            }
            break;
        }

        case ActionTypes.GET_LIST_PROVINCE_ERROR: {
            return {
                ...state,
                error: action.payload,
                loadingProvince: false
            }
            break;
        }

        case ActionTypes.GET_LIST_CITY_ERROR: {
            return {
                ...state,
                error: action.payload,
                loadingCityOrDistrict: false
            }
            break;
        }

        case ActionTypes.SELECT_PROVINCE: {
            return {
                ...state,
                province: action.payload.provinceName,
                path: action.payload.path
            }
            break;
        }

        case ActionTypes.SELECT_CITY: {
            return {
                ...state,
                city: action.payload,
            }
            break;
        }

        default:
            return state;
    }
}

export default listChoiceReducer;
