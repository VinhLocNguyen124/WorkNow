import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    listPost: [],
    loading: false,
    refreshing: false,
    error: '',
    loadingAddNewPost: false,
    errorAddPost: '',
    specificPost: {
        _id: "",
        emailuser: "",
        idpostshare: "",
        content: "a",
        imgurl: "",
        pdfurl: "",
        seescope: "anyone",
        allowcmt: false,
        formal: true,
        active: true,
        date: "2021-01-24T08:35:22.727Z",
        username: "",
        headline: "",
        urlavatar: "",
        liked: false,
    },
    specificLoading: false,
    specificError: null,
    submitCommentLoading: false,
    submitCommentError: null
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

        case ActionTypes.GET_SPECIFIC_POST_LOADING: {
            return {
                ...state,
                specificLoading: true
            }
            break;
        }

        case ActionTypes.GET_SPECIFIC_POST_SUCCESS: {
            return {
                ...state,
                specificPost: action.payload,
                specificLoading: false,
                submitCommentLoading: false
            }
            break;
        }

        case ActionTypes.GET_SPECIFIC_POST_ERROR: {
            return {
                ...state,
                specificError: action.payload,
                specificLoading: false
            }
            break;
        }

        case ActionTypes.SUBMIT_COMMENT_LOADING: {
            return {
                ...state,
                submitCommentLoading: true
            }
            break;
        }

        case ActionTypes.SUBMIT_COMMENT_ERROR: {
            return {
                ...state,
                submitCommentLoading: false,
                submitCommentError: action.payload
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

        case ActionTypes.LIKE_POST: {
            const newListPost = state.listPost;
            const index = newListPost.findIndex(e => e._id === action.payload)
            newListPost[index].liked = true;

            return {
                ...state,
                listPost: newListPost
            }
            break;
        }

        case ActionTypes.DISLIKE_POST: {
            const newListPost = state.listPost;
            const index = newListPost.findIndex(e => e._id === action.payload);
            newListPost[index].liked = false;

            return {
                ...state,
                listPost: newListPost
            }
            break;
        }

        default:
            return state;
    }
}

export default postReducer;
