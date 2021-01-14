import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    listCompanyFilter: [],

}

const listMatchedJobReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.GET_LIST_COMPANY_FILTER: {
            return {
                ...state,
                listCompanyFilter: action.payload,
            }
            break;
        }

        case ActionTypes.SEARCH_COMPANY_FILTER: {
            return {
                ...state,
                listCompanyFilter: action.payload,
            }
            break;
        }


        default:
            return state;
    }
}

export default listMatchedJobReducer;
