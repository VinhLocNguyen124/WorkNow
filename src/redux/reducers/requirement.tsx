import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    submitLoading: false,
    submitError: null,
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.SUBMIT_REQUIREMENT_LOADING: {
            return {
                ...state,
                submitLoading: true,
            }
            break;
        }
        case ActionTypes.SUBMIT_REQUIREMENT_SUCCESS: {
            return {
                ...state,
                submitLoading: false,
            }
            break;
        }
        case ActionTypes.SUBMIT_REQUIREMENT_ERROR: {
            return {
                ...state,
                submitLoading: false,
                submitError: action.payload
            }
            break;
        }


        default:
            return state;
    }
}

export default loginReducer;
