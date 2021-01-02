import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    listUni: [],
    uniName: '',
}

const listUniReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.SET_LIST_UNI: {
            return {
                ...state,
                listUni: action.payload,
            }
            break;
        }

        case ActionTypes.SELECT_UNI: {
            return {
                ...state,
                uniName: action.payload,
            }
            break;
        }

        case ActionTypes.SEARCH_UNI: {
            return {
                ...state,
                listUni: action.payload,
            }
            break;
        }


        default:
            return state;
    }
}

export default listUniReducer;
