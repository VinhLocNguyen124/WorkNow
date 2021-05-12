import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    messageBadge: 0,
    notificationBadge: 0,
}

const badgeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.MESSAGE_BADGE_HANDLE: {
            return {
                ...state,
                messageBadge: action.payload
            }
            break;
        }
        case ActionTypes.NOTIFICATION_BADGE_HANDLE: {
            return {
                ...state,
                notificationBadge: action.payload
            }
            break;
        }
        default:
            return state;
    }
}

export default badgeReducer;
