import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    sendLoading: false,
    sendError: null,
    deleteLoading: false,
    acceptLoading: false,
    deleteError: null,
    status: "not",

    listFriend: [],
    getListFriendLoading: false,
    getListFriendError: null,

    disconnectLoading: false,
    disconnectError: null,
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

        case ActionTypes.GET_LIST_FRIEND_LOADING: {
            return {
                ...state,
                getListFriendLoading: true
            }
            break;
        }

        case ActionTypes.GET_LIST_FRIEND_SUCCESS: {
            return {
                ...state,
                getListFriendLoading: false,
                listFriend: action.payload
            }
            break;
        }

        case ActionTypes.GET_LIST_FRIEND_ERROR: {
            return {
                ...state,
                getListFriendLoading: false,
                getListFriendError: action.payload,
            }
            break;
        }

        case ActionTypes.DISCONNECT_LOADING: {
            return {
                ...state,
                disconnectLoading: true
            }
            break;
        }

        case ActionTypes.DISCONNECT_SUCCESS: {
            return {
                ...state,
                disconnectLoading: false
            }
            break;
        }

        case ActionTypes.DISCONNECT_ERROR: {
            return {
                ...state,
                disconnectLoading: false,
                disconnectError: action.payload
            }
            break;
        }

        case ActionTypes.ACCEPT_REQUEST_LOADING: {
            return {
                ...state,
                acceptLoading: true
            }
            break;
        }

        case ActionTypes.ACCEPT_REQUEST_SUCCESS: {
            return {
                ...state,
                acceptLoading: false
            }
            break;
        }

        case ActionTypes.ACCEPT_REQUEST_ERROR: {
            return {
                ...state,
                acceptLoading: false,
            }
            break;
        }

        case ActionTypes.SEARCH_FRIEND: {
            return {
                ...state,
                listFriend: action.payload
            }
            break;
        }

        default:
            return state;
    }
}

export default loginReducer;
