import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    globalUser: null,
    updateLoading: false,
    error: null,

    addExperienceLoading: false,
    addExperienceError: null,
    updateExperienceLoading: false,
    updateExperienceError: null,
    deleteExperienceLoading: false,
    deleteExperienceError: null,

    addEducationLoading: false,
    addEducationError: null,
    updateEducationLoading: false,
    updateEducationError: null,
    deleteEducationLoading: false,
    deleteEducationError: null,
}

const globalUserReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.GET_USER_AND_SET_TO_GLOBAL: {
            return {
                ...state,
                globalUser: action.payload,
                addExperienceLoading: false,
                updateExperienceLoading: false,
                deleteExperienceLoading: false,
                addEducationLoading: false,
                updateEducationLoading: false,
                deleteEducationLoading: false,
            }
            break;
        }
        case ActionTypes.UPDATE_USER_LOADING: {
            return {
                ...state,
                updateLoading: true,
            }
            break;
        }

        case ActionTypes.UPDATE_USER_SUCCESS: {
            return {
                ...state,
                globalUser: action.payload,
                updateLoading: false,
            }
            break;
        }

        case ActionTypes.UPDATE_USER_ERROR: {
            return {
                ...state,
                updateLoading: false,
                error: action.payload
            }
            break;
        }

        case ActionTypes.ADD_EXPERIENCE_LOADING: {
            return {
                ...state,
                addExperienceLoading: true,
            }
            break;
        }

        case ActionTypes.ADD_EXPERIENCE_ERROR: {
            return {
                ...state,
                addExperienceLoading: false,
                addExperienceError: action.payload
            }
            break;
        }

        case ActionTypes.UPDATE_EXPERIENCE_LOADING: {
            return {
                ...state,
                updateExperienceLoading: true,
            }
            break;
        }

        case ActionTypes.UPDATE_EXPERIENCE_ERROR: {
            return {
                ...state,
                updateExperienceLoading: false,
                updateExperienceError: action.payload
            }
            break;
        }

        case ActionTypes.DELETE_EXPERIENCE_LOADING: {
            return {
                ...state,
                deleteExperienceLoading: true,
            }
            break;
        }

        case ActionTypes.DELETE_EXPERIENCE_ERROR: {
            return {
                ...state,
                deleteExperienceLoading: false,
                deleteExperienceError: action.payload
            }
            break;
        }

        case ActionTypes.ADD_EDUCATION_LOADING: {
            return {
                ...state,
                addEducationLoading: true,
            }
            break;
        }

        case ActionTypes.ADD_EDUCATION_ERROR: {
            return {
                ...state,
                addEducationLoading: false,
                addEducationError: action.payload
            }
            break;
        }

        case ActionTypes.UPDATE_EDUCATION_LOADING: {
            return {
                ...state,
                updateEducationLoading: true,
            }
            break;
        }

        case ActionTypes.UPDATE_EDUCATION_ERROR: {
            return {
                ...state,
                updateEducationLoading: false,
                updateEducationError: action.payload
            }
            break;
        }

        case ActionTypes.DELETE_EDUCATION_LOADING: {
            return {
                ...state,
                deleteEducationLoading: true,
            }
            break;
        }

        case ActionTypes.DELETE_EDUCATION_ERROR: {
            return {
                ...state,
                deleteEducationLoading: false,
                deleteEducationError: action.payload
            }
            break;
        }

        default:
            return state;
    }
}

export default globalUserReducer;
