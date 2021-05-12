import * as ActionTypes from './actionTypes';
import { getData, fetchData } from '../../apis/apiCaller';
import { ToastAndroid } from 'react-native';
import { cloudinaryUploadImage } from '../../helpers/MediaConfig';
import { checkBlackListCondition } from '../../helpers/ArrayHandling';

const addNakedPost = (dispatch, post, navigation, email) => {
    fetchData("posts", "POST", post).then(data => {
        if (data.status === "success") {
            getData("posts/" + email).then(data => {
                if (data) {
                    //can handle data with getState in here and then just dispatch
                    dispatch({
                        type: ActionTypes.ADD_NEW_POST_SUCCESS,
                        payload: data
                    });
                    navigation.navigate('Home');
                }
            });
            ToastAndroid.show("Đăng bài thành công !!", ToastAndroid.SHORT);

        } else {
            dispatch({
                type: ActionTypes.ADD_NEW_POST_ERROR,
                payload: data.message.message || 'Unexpected Error!!!',
            });
            ToastAndroid.show(`Error: ${data.message.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
        }
    }).catch(error => {
        dispatch({
            type: ActionTypes.ADD_NEW_POST_ERROR,
            payload: error.message || 'Unexpected Error!!!',
        });
        ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
    });
}

export const getListPostTimeline = (email: string) => (dispatch, getState) => {

    dispatch({
        type: ActionTypes.GET_LIST_POST_TIMELINE_LOADING,
    });

    //xử lý code bất đồng bộ và dispatch các hàm đồng bộ ở trên
    getData("posts/timeline/" + email).then(data => {
        // có thể handle data bằng getState tại đây rồi mới dispatch
        if (data) {
            dispatch({
                type: ActionTypes.GET_LIST_POST_TIMELINE_SUCCESS,
                payload: data
            });
        }
    }, error => {
        dispatch({
            type: ActionTypes.GET_LIST_POST_TIMELINE_ERROR,
            payload: error.message || 'Unexpected Error!!!',
        });
    });
}

export const filterPostTimeline = (email: string, dateFrom: Date, dateTo: Date, privacy: string) => (dispatch, getState) => {

    const body = {
        dateFrom: dateFrom,
        dateTo: dateTo,
        privacy: privacy
    }

    dispatch({
        type: ActionTypes.FILTER_TIMELINE_POST_LOADING,
    });


    fetchData("posts/timeline/filter/" + email, "POST", body).then(data => {

        if (data) {
            dispatch({
                type: ActionTypes.FILTER_TIMELINE_POST_SUCCESS,
                payload: data
            });
        }
    }, error => {
        dispatch({
            type: ActionTypes.FILTER_TIMELINE_POST_ERROR,
            payload: error.message || 'Unexpected Error!!!',
        });
    });
}

export const getListPost = (email: string) => (dispatch, getState) => {

    dispatch({
        type: ActionTypes.GET_LIST_POST_LOADING,
    });

    //xử lý code bất đồng bộ và dispatch các hàm đồng bộ ở trên
    getData("posts/" + email).then(data => {
        // có thể handle data bằng getState tại đây rồi mới dispatch
        if (data) {
            dispatch({
                type: ActionTypes.GET_LIST_POST_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: ActionTypes.GET_LIST_POST_ERROR,
                payload: data.message.message || 'Unexpected Error!!!',
            });
        }
    }, error => {
        dispatch({
            type: ActionTypes.GET_LIST_POST_ERROR,
            payload: error.message || 'Unexpected Error!!!',
        });
    });
}

export const addNewPost = (post, imageSource, pdfSource, navigation, email) => (dispatch, getState) => {
    dispatch({
        type: ActionTypes.LOADING_ADD_NEW_POST,
    });
    if (imageSource) {
        cloudinaryUploadImage(imageSource).then(data => {
            post.imgurl = data ? data.secure_url : "";
            addNakedPost(dispatch, post, navigation, email);
        })
    } else {
        addNakedPost(dispatch, post, navigation, email);
    }
}

export const updatePost = (idpost: string, content: string, imgurl: string, imageSource, email: string) => (dispatch, getState) => {
    dispatch({
        type: ActionTypes.LOADING_UPDATE_POST,
    });

    /** Các trường hợp: 
     * -ko thay đổi gì: imageSource = null, imgurl = available 
     * -xóa ảnh: imageSource = null, imgurl = ""
     * -thay ảnh: imageSource = available, imgurl = ""
     */

    if (imageSource) {
        cloudinaryUploadImage(imageSource).then(data => {
            imgurl = data ? data.secure_url : "";
            fetchData("posts/update/content/" + idpost, "PATCH", { content: content, imgurl: imgurl }).then(data => {
                if (data.status === "success") {
                    fetchData("posts/specific", "POST", { emailcurrentuser: email, idpost: idpost }).then(data => {
                        if (data) {
                            dispatch({
                                type: ActionTypes.UPDATE_POST_SUCCESS,
                                payload: data
                            });
                        }
                    });
                    ToastAndroid.show(`Cập nhật bài viết thành công`, ToastAndroid.SHORT);
                }
            }).catch(error => {
                dispatch({
                    type: ActionTypes.UPDATE_POST_ERROR,
                });
                ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
            })
        })
    } else {

        fetchData("posts/update/content/" + idpost, "PATCH", { content: content, imgurl: imgurl }).then(data => {
            if (data.status === "success") {
                fetchData("posts/specific", "POST", { emailcurrentuser: email, idpost: idpost }).then(data => {
                    if (data) {
                        dispatch({
                            type: ActionTypes.UPDATE_POST_SUCCESS,
                            payload: data
                        });
                    }
                });
                ToastAndroid.show(`Cập nhật bài viết thành công`, ToastAndroid.SHORT);
            }
        }).catch(error => {
            dispatch({
                type: ActionTypes.UPDATE_POST_ERROR,
            });
            ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
        })

    }
}

export const likePost = (iduser: string, idpost: string) => (dispatch, getState) => {

    const likepost = {
        idpost: idpost,
        iduser: iduser,
    }

    fetchData("posts/likepost", "POST", likepost).then(data => {
        console.log(data);
        if (data.status === "success") {
            dispatch({
                type: ActionTypes.LIKE_POST,
                payload: idpost
            });
            ToastAndroid.show(`Bạn đã thích bài viết !`, ToastAndroid.SHORT);
        } else {
            console.log(data);
            ToastAndroid.show(`Error: ${data.message.message || '1Unexpected Error!!!'}`, ToastAndroid.SHORT);
        }
    }).catch(error => {
        ToastAndroid.show(`Error: ${error.message || '2Unexpected Error!!!'}`, ToastAndroid.SHORT);
    });


}

export const disLikePost = (iduser: string, idpost: string) => (dispatch, getState) => {

    const likepost = {
        idpost: idpost,
        iduser: iduser,
    }

    fetchData("posts/dislikepost", "POST", likepost).then(data => {
        console.log(data);
        if (data.status === "success") {
            dispatch({
                type: ActionTypes.DISLIKE_POST,
                payload: idpost
            });
            ToastAndroid.show(`Bạn đã bỏ thích bài viết !`, ToastAndroid.SHORT);
        } else {
            console.log(data);
            ToastAndroid.show(`Error: ${data.message.message || '1Unexpected Error!!!'}`, ToastAndroid.SHORT);
        }
    }).catch(error => {
        ToastAndroid.show(`Error: ${error.message || '2Unexpected Error!!!'}`, ToastAndroid.SHORT);
    });


}

export const deletePost = (email: string, idpost: string, navigation) => (dispatch, getState) => {

    dispatch({
        type: ActionTypes.LOADING_DELETE_POST,
    });

    fetchData("posts/delete/" + idpost, "DELETE").then(data => {
        if (data.status === "success") {
            dispatch({
                type: ActionTypes.DELETE_POST_SUCCESS,
            });
            getData("posts/" + email).then(data => {
                if (data) {
                    dispatch({
                        type: ActionTypes.ADD_NEW_POST_SUCCESS,
                        payload: data
                    });
                    navigation.navigate('Home');
                }
            });
            ToastAndroid.show(`Xóa bài viết thành công !`, ToastAndroid.SHORT);
        }
    }).catch(error => {
        dispatch({
            type: ActionTypes.DELETE_POST_ERROR,
            payload: error.message
        });
        ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
    });
}

export const getSpecificPost = (email: string, idpost: string) => (dispatch, getState) => {

    dispatch({
        type: ActionTypes.GET_SPECIFIC_POST_LOADING,
    });

    fetchData("posts/specific", "POST", { emailcurrentuser: email, idpost: idpost }).then(data => {
        if (data) {
            dispatch({
                type: ActionTypes.GET_SPECIFIC_POST_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: ActionTypes.GET_SPECIFIC_POST_ERROR,
                payload: data.message.message || 'Unexpected Error!!!',
            });
        }
    }, error => {
        dispatch({
            type: ActionTypes.GET_SPECIFIC_POST_ERROR,
            payload: error.message || 'Unexpected Error!!!',
        });
    });

}

export const reloadSpecificPost = (email: string, idpost: string) => (dispatch, getState) => {

    fetchData("posts/specific", "POST", { emailcurrentuser: email, idpost: idpost }).then(data => {
        if (data) {
            dispatch({
                type: ActionTypes.RELOAD_SPECIFIC_POST,
                payload: data
            });
        }
    }).catch(error => {
        ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
    });

}

export const submitComment = (body, email: string, idpost: string, formal: boolean) => (dispatch, getState) => {

    if (formal) {

        checkBlackListCondition(body.cmtcontent, () => {
            dispatch({
                type: ActionTypes.SUBMIT_COMMENT_LOADING,
            });

            fetchData("comments", "POST", body).then(data => {
                if (data.status === "success") {
                    fetchData("posts/specific", "POST", { emailcurrentuser: email, idpost: idpost }).then(data => {
                        if (data) {
                            dispatch({
                                type: ActionTypes.RELOAD_SPECIFIC_POST,
                                payload: data
                            });
                        }
                    }, error => {
                        dispatch({
                            type: ActionTypes.GET_SPECIFIC_POST_ERROR,
                            payload: error.message || 'Unexpected Error!!!',
                        });
                    });
                }
            }, error => {
                dispatch({
                    type: ActionTypes.SUBMIT_COMMENT_ERROR,
                    payload: error.message || 'Unexpected Error!!!',
                });
            });
        }, violations => {
            ToastAndroid.show(`Vi phạm quy tắc cộng đồng. Nội dung không được chứa các từ: ${violations}`, ToastAndroid.LONG);
        });

    } else {
        dispatch({
            type: ActionTypes.SUBMIT_COMMENT_LOADING,
        });

        fetchData("comments", "POST", body).then(data => {
            if (data.status === "success") {
                fetchData("posts/specific", "POST", { emailcurrentuser: email, idpost: idpost }).then(data => {
                    if (data) {
                        dispatch({
                            type: ActionTypes.RELOAD_SPECIFIC_POST,
                            payload: data
                        });
                    }
                }, error => {
                    dispatch({
                        type: ActionTypes.GET_SPECIFIC_POST_ERROR,
                        payload: error.message || 'Unexpected Error!!!',
                    });
                });
            }
        }, error => {
            dispatch({
                type: ActionTypes.SUBMIT_COMMENT_ERROR,
                payload: error.message || 'Unexpected Error!!!',
            });
        });
    }


}

export const updateComment = (email: string, idpost: string, idcmt: string, cmtcontent: string, formal: boolean) => (dispatch, getState) => {
    if (formal) {
        checkBlackListCondition(cmtcontent, () => {
            dispatch({
                type: ActionTypes.LOADING_UPDATE_COMMENT,
            });

            fetchData("comments/update/" + idcmt, "PATCH", { cmtcontent: cmtcontent, idpost: idpost }).then(data => {
                if (data.status === "success") {
                    fetchData("posts/specific", "POST", { emailcurrentuser: email, idpost: idpost }).then(data => {
                        if (data) {
                            dispatch({
                                type: ActionTypes.UPDATE_COMMENT_SUCCESS,
                                payload: data
                            });
                        }
                    });
                }
            }).catch(error => {
                dispatch({
                    type: ActionTypes.UPDATE_COMMENT_ERROR,
                });
                ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
            })
        }, violations => {
            ToastAndroid.show(`Vi phạm quy tắc cộng đồng. Nội dung không được chứa các từ: ${violations}`, ToastAndroid.LONG);
        });
    } else {
        dispatch({
            type: ActionTypes.LOADING_UPDATE_COMMENT,
        });

        fetchData("comments/update/" + idcmt, "PATCH", { cmtcontent: cmtcontent, idpost: idpost }).then(data => {
            if (data.status === "success") {
                fetchData("posts/specific", "POST", { emailcurrentuser: email, idpost: idpost }).then(data => {
                    if (data) {
                        dispatch({
                            type: ActionTypes.UPDATE_COMMENT_SUCCESS,
                            payload: data
                        });
                    }
                });
            }
        }).catch(error => {
            dispatch({
                type: ActionTypes.UPDATE_COMMENT_ERROR,
            });
            ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
        })
    }

}

export const deleteComment = (email: string, idpost: string, idcmt: string) => (dispatch, getState) => {
    dispatch({
        type: ActionTypes.LOADING_DELETE_COMMENT,
    });

    fetchData("comments/delete/" + idcmt, "DELETE", { idpost: idpost }).then(data => {
        if (data.status === "success") {
            fetchData("posts/specific", "POST", { emailcurrentuser: email, idpost: idpost }).then(data => {
                if (data) {
                    dispatch({
                        type: ActionTypes.DELETE_COMMENT_SUCCESS,
                        payload: data
                    });
                }
            });
        }
    }).catch(error => {
        dispatch({
            type: ActionTypes.DELETE_COMMENT_ERROR,
        });
        ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
    })
}

export const updateFormalMode = (email: string, idpost: string) => (dispatch, getState) => {

    dispatch({
        type: ActionTypes.LOADING_UPDATE_FORMAL_MODE,
    });

    fetchData("posts/update/formal/" + idpost, "PATCH").then(data => {
        if (data.status === "success") {

            fetchData("posts/specific", "POST", { emailcurrentuser: email, idpost: idpost }).then(data => {
                if (data) {
                    dispatch({
                        type: ActionTypes.UPDATE_FORMAL_MODE_SUCCESS,
                        payload: data
                    });
                }
                ToastAndroid.show(`Cập nhật chế độ trang trọng thành công!`, ToastAndroid.SHORT);
            });

        }
    }).catch(error => {
        dispatch({
            type: ActionTypes.UPDATE_FORMAL_MODE_ERROR,
        });
        ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
    })
}

export const updateSeescope = (email: string, idpost: string) => (dispatch, getState) => {

    dispatch({
        type: ActionTypes.LOADING_UPDATE_SEESCOPE,
    });

    fetchData("posts/update/seescope/" + idpost, "PATCH").then(data => {
        if (data.status === "success") {

            fetchData("posts/specific", "POST", { emailcurrentuser: email, idpost: idpost }).then(data => {
                if (data) {
                    dispatch({
                        type: ActionTypes.UPDATE_SEESCOPE_SUCCESS,
                        payload: data
                    });
                }
                ToastAndroid.show(`Cập nhật phạm vi bài viết thành công!`, ToastAndroid.SHORT);
            });

        }
    }).catch(error => {
        dispatch({
            type: ActionTypes.UPDATE_SEESCOPE_ERROR,
        });
        ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
    })
}

export const updateActive = (email: string, idpost: string) => (dispatch, getState) => {

    dispatch({
        type: ActionTypes.LOADING_UPDATE_ACTIVE,
    });

    fetchData("posts/update/active/" + idpost, "PATCH").then(data => {
        if (data.status === "success") {

            fetchData("posts/specific", "POST", { emailcurrentuser: email, idpost: idpost }).then(data => {
                if (data) {
                    dispatch({
                        type: ActionTypes.UPDATE_ACTIVE_SUCCESS,
                        payload: data
                    });
                }
                if (data.active) {
                    ToastAndroid.show(`Bắt đầu nhận thông báo từ bài viết!`, ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show(`Ngưng nhận thông báo từ bài viết!`, ToastAndroid.SHORT);
                }

            });

        }
    }).catch(error => {
        dispatch({
            type: ActionTypes.UPDATE_ACTIVE_ERROR,
        });
        ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
    })
}

export const clearPostDetail = () => (dispatch, getState) => {
    dispatch({
        type: ActionTypes.CLEAR_POST_DETAIL,
        payload: {
            _id: "",
            emailuser: "",
            iduser: "",
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
            likenumber: 0,
            cmtnumber: 0,
            comments: [],
            shortComments: []
        }
    });
}

export const clearListPostTimeline = () => (dispatch, getState) => {
    dispatch({
        type: ActionTypes.CLEAR_LIST_POST_TIMELINE,
        payload: [
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
        ]
    });
}
