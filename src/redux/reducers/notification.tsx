import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    notifications: [],
    loadingGetNotification: false,
    loadingDeleteAll: false,
    loadingDeleteOne: false,
    loadingMarkAsRead: false,
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.GET_NOTIFICATION_LOADING: {
            return {
                ...state,
                loadingGetNotification: true
            }
        }

        case ActionTypes.GET_NOTIFICATION_SUCCESS: {
            return {
                ...state,
                notifications: action.payload,
                loadingGetNotification: false
            }
        }

        case ActionTypes.GET_NOTIFICATION_ERROR: {
            return {
                ...state,
                loadingGetNotification: false
            }
        }

        case ActionTypes.DELETE_ALL_NOTIFICATION_LOADING: {
            return {
                ...state,
                loadingDeleteAll: true
            }
        }

        case ActionTypes.DELETE_ALL_NOTIFICATION_SUCCESS: {
            return {
                ...state,
                loadingDeleteAll: false
            }
        }

        case ActionTypes.DELETE_ALL_NOTIFICATION_ERROR: {
            return {
                ...state,
                loadingDeleteAll: false
            }
        }

        case ActionTypes.DELETE_ONE_NOTIFICATION_LOADING: {
            return {
                ...state,
                loadingDeleteOne: true
            }
        }

        case ActionTypes.DELETE_ONE_NOTIFICATION_SUCCESS: {
            return {
                ...state,
                loadingDeleteOne: false
            }
        }

        case ActionTypes.DELETE_ONE_NOTIFICATION_ERROR: {
            return {
                ...state,
                loadingDeleteOne: false
            }
        }

        case ActionTypes.MARK_ALL_AS_READ_NOTIFICATION_LOADING: {
            return {
                ...state,
                loadingMarkAsRead: true
            }
        }

        case ActionTypes.MARK_ALL_AS_READ_NOTIFICATION_SUCCESS: {
            return {
                ...state,
                loadingMarkAsRead: false
            }
        }

        case ActionTypes.MARK_ALL_AS_READ_NOTIFICATION_ERROR: {
            return {
                ...state,
                loadingMarkAsRead: false
            }
        }

        case ActionTypes.RELOAD_NOTIFICATION: {
            return {
                ...state,
                notifications: action.payload,
            }
        }


        default:
            return state;
    }
}

export default notificationReducer;
