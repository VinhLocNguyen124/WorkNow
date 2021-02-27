import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    sendLoading: false,
    sendError: null,
    deleteLoading: false,
    deleteError: null,
    status: "not",
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.SEND_REQUEST_LOADING: {
            return {
                ...state,
                sendLoading: true,
            }
            break;
        }
        case ActionTypes.SEND_REQUEST_SUCCESS: {
            return {
                ...state,
                sendLoading: false,
            }
            break;
        }
        case ActionTypes.SEND_REQUEST_ERROR: {
            return {
                ...state,
                sendLoading: false,
                sendError: action.payload
            }
            break;
        }
        case ActionTypes.DELETE_REQUEST_LOADING: {
            return {
                ...state,
                deleteLoading: true,
            }
            break;
        }
        case ActionTypes.DELETE_REQUEST_SUCCESS: {
            return {
                ...state,
                deleteLoading: false,
            }
            break;
        }
        case ActionTypes.DELETE_REQUEST_ERROR: {
            return {
                ...state,
                deleteLoading: false,
                deleteError: action.payload
            }
            break;
        }

        default:
            return state;
    }
}

export default loginReducer;
