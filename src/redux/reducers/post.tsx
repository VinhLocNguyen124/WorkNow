import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    listPost: [],
    loading: false,
    refreshing: false,
    error: '',
    loadingAddNewPost: false,
    errorAddPost: '',
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.GET_LIST_POST_LOADING: {
            return {
                ...state,
                loading: true
            }
            break;
        }

        case ActionTypes.GET_LIST_POST_SUCCESS: {
            return {
                ...state,
                listPost: action.payload,
                loading: false,
                refreshing: false
            }
            break;
        }

        case ActionTypes.GET_LIST_POST_ERROR: {
            return {
                ...state,
                error: action.payload,
                loading: false
            }
            break;
        }

        case ActionTypes.LOADING_ADD_NEW_POST: {
            return {
                ...state,
                loadingAddNewPost: true
            }
            break;
        }

        case ActionTypes.ADD_NEW_POST_SUCCESS: {
            return {
                ...state,
                listPost: action.payload,
                loadingAddNewPost: false
            }
            break;
        }

        case ActionTypes.ADD_NEW_POST_ERROR: {
            return {
                ...state,
                errorAddPost: action.payload,
                loadingAddNewPost: false
            }
            break;
        }

        default:
            return state;
    }
}

export default postReducer;
