import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    listCompany: [],
    error: null,

}

const companyReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.GET_LIST_COMPANY: {
            return {
                ...state,
                listCompany: action.payload
            }
            break;
        }

        case ActionTypes.GET_LIST_COMPANY_ERROR: {
            return {
                ...state,
                error: action.payload
            }
            break;
        }

        case ActionTypes.SEARCH_COMPANY: {
            return {
                ...state,
                listCompany: action.payload
            }
            break;
        }

        default:
            return state;
    }
}

export default companyReducer;
