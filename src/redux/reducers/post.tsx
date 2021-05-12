import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    listPost: [
        {
            _id: "",
            emailuser: "",
            iduser: "",
            idpostshare: "",
            content: "a",
            imgurl: "https://res.cloudinary.com/locnguyen-cloud/image/upload/v1611528619/reobg3bn6kdgtagoyifa.jpg",
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
            likenumber: 0,
            cmtnumber: 0,
            recommend: false
        }
    ],
    loading: false,
    refreshing: false,
    error: '',
    listPostTimeline: [
        {
            _id: "",
            emailuser: "",
            iduser: "",
            idpostshare: "",
            content: "a",
            imgurl: "https://res.cloudinary.com/locnguyen-cloud/image/upload/v1611528619/reobg3bn6kdgtagoyifa.jpg",
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
            likenumber: 0,
            cmtnumber: 0,
            recommend: false
        }
    ],
    loadingTimeline: false,
    refreshingTimeline: false,
    errorTimeline: null,

    loadingFilterTimeline: false,
    errorFilterTimeline: null,

    loadingAddNewPost: false,
    errorAddPost: '',
    specificPost: {
        _id: "",
        emailuser: "",
        iduser: "",
        idpostshare: "",
        postshare: {
            _id: "",
            imgurl: "",
            textcontent: "",
            date: "2021-01-24T08:35:22.727Z",
            seescope: "anyone",
            urlavatar: "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg",
            username: "Default username",
            headline: "Default headline",
            emailuser: "",
            recommend: false
        },
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
        likenumber: 0,
        cmtnumber: 0,
        comments: [],
        shortComments: []
    },
    specificLoading: false,
    specificError: null,
    submitCommentLoading: false,
    submitCommentError: null,

    loadingDeletePost: false,
    errorDeletePost: null,

    loadingUpdatePost: false,
    errorUpdatePost: null,

    loadingUpdateFormalMode: false,
    loadingUpdateSeescope: false,
    loadingUpdateActive: false,
    loadingUpdateComment: false,
    loadingDeleteComment: false,


}

const postReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.FILTER_TIMELINE_POST_LOADING: {
            return {
                ...state,
                loadingFilterTimeline: true
            }
            break;
        }

        case ActionTypes.FILTER_TIMELINE_POST_SUCCESS: {
            return {
                ...state,
                listPostTimeline: action.payload,
                loadingFilterTimeline: false,
            }
            break;
        }

        case ActionTypes.FILTER_TIMELINE_POST_ERROR: {
            return {
                ...state,
                errorFilterTimeline: action.payload,
                loadingFilterTimeline: false
            }
            break;
        }

        case ActionTypes.GET_LIST_POST_TIMELINE_LOADING: {
            return {
                ...state,
                loadingTimeline: true
            }
            break;
        }

        case ActionTypes.GET_LIST_POST_TIMELINE_SUCCESS: {
            return {
                ...state,
                listPostTimeline: action.payload,
                loadingTimeline: false,
                refreshingTimeline: false
            }
            break;
        }

        case ActionTypes.GET_LIST_POST_TIMELINE_ERROR: {
            return {
                ...state,
                errorTimeline: action.payload,
                loadingTimeline: false
            }
            break;
        }

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

        case ActionTypes.RELOAD_SPECIFIC_POST: {
            return {
                ...state,
                specificPost: action.payload,
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

        case ActionTypes.LOADING_DELETE_POST: {
            return {
                ...state,
                loadingDeletePost: true
            }
            break;
        }

        case ActionTypes.DELETE_POST_SUCCESS: {
            return {
                ...state,
                loadingDeletePost: false
            }
            break;
        }

        case ActionTypes.DELETE_POST_ERROR: {
            return {
                ...state,
                errorDeletePost: action.payload,
                loadingDeletePost: false
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

        case ActionTypes.LOADING_UPDATE_FORMAL_MODE: {
            return {
                ...state,
                loadingUpdateFormalMode: true
            }
            break;
        }

        case ActionTypes.UPDATE_FORMAL_MODE_SUCCESS: {
            return {
                ...state,
                specificPost: action.payload,
                loadingUpdateFormalMode: false
            }
            break;
        }

        case ActionTypes.UPDATE_FORMAL_MODE_ERROR: {
            return {
                ...state,
                loadingUpdateFormalMode: false
            }
            break;
        }

        case ActionTypes.LOADING_UPDATE_SEESCOPE: {
            return {
                ...state,
                loadingUpdateSeescope: true
            }
            break;
        }

        case ActionTypes.UPDATE_SEESCOPE_SUCCESS: {
            return {
                ...state,
                specificPost: action.payload,
                loadingUpdateSeescope: false
            }
            break;
        }

        case ActionTypes.UPDATE_SEESCOPE_ERROR: {
            return {
                ...state,
                loadingUpdateSeescope: false
            }
            break;
        }

        case ActionTypes.LOADING_UPDATE_ACTIVE: {
            return {
                ...state,
                loadingUpdateActive: true
            }
            break;
        }

        case ActionTypes.UPDATE_ACTIVE_SUCCESS: {
            return {
                ...state,
                specificPost: action.payload,
                loadingUpdateActive: false
            }
            break;
        }

        case ActionTypes.UPDATE_ACTIVE_ERROR: {
            return {
                ...state,
                loadingUpdateActive: false
            }
            break;
        }

        case ActionTypes.LOADING_UPDATE_COMMENT: {
            return {
                ...state,
                loadingUpdateComment: true
            }
            break;
        }

        case ActionTypes.UPDATE_COMMENT_SUCCESS: {
            return {
                ...state,
                specificPost: action.payload,
                loadingUpdateComment: false
            }
            break;
        }

        case ActionTypes.UPDATE_COMMENT_ERROR: {
            return {
                ...state,
                loadingUpdateComment: false
            }
            break;
        }

        case ActionTypes.LOADING_DELETE_COMMENT: {
            return {
                ...state,
                loadingDeleteComment: true
            }
            break;
        }

        case ActionTypes.DELETE_COMMENT_SUCCESS: {
            return {
                ...state,
                specificPost: action.payload,
                loadingDeleteComment: false
            }
            break;
        }

        case ActionTypes.DELETE_COMMENT_ERROR: {
            return {
                ...state,
                loadingDeleteComment: false
            }
            break;
        }

        case ActionTypes.LOADING_UPDATE_POST: {
            return {
                ...state,
                loadingUpdatePost: true
            }
            break;
        }

        case ActionTypes.UPDATE_POST_SUCCESS: {
            return {
                ...state,
                specificPost: action.payload,
                loadingUpdatePost: false
            }
            break;
        }

        case ActionTypes.UPDATE_POST_ERROR: {
            return {
                ...state,
                loadingUpdatePost: false
            }
            break;
        }

        case ActionTypes.CLEAR_POST_DETAIL: {
            return {
                ...state,
                specificPost: action.payload,
            }
            break;
        }

        default:
            return state;
    }
}

export default postReducer;
