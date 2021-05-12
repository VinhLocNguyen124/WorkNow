import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Button,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
    Dimensions,
    StyleSheet,
    LayoutAnimation,
    ScrollView,
    Alert,
    TouchableWithoutFeedback,
    ToastAndroid,
    ActivityIndicator,
} from 'react-native';

//Firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { FirebaseErrorRespond } from '../../helpers/FirebaseErrorRespond';

//Styles & Images & Icons
import { styles } from '../Styles/styles';
import { tempStyles } from '../HomeScreen/Styles/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//Navigation
import { useNavigation, useRoute } from '@react-navigation/native';

//helpers
import { setI18nConfig, translate } from '../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';
import { FormatNumber } from '../../helpers/FormatNumber';
import moment from 'moment';

//hooks

//redux & actions
import { useSelector, useDispatch } from 'react-redux';
import { likePost, disLikePost, getSpecificPost, submitComment, reloadSpecificPost, clearPostDetail } from '../../redux/actions/post';

//Components
import Footer from './../../components/Footer';
import FullScreenImageModal from '../HomeScreen/components/FullScreenImageModal';
import TextHighLight from '../../components/TextHighLight';
import CommentItem from './components/CommentItem';
import SettingPostModal from './components/SettingPostModal';
import EditPostModal from './components/EditPostModal';
import InputComment from './components/InputComment';
import TurnOffComment from './components/TurnOffComment';
import PostShareThumbnail from '../PostScreen/Components/PostShareThumbnail';

//Consts
import { Colors } from '../../constansts/color';
import { Dimens } from '../../constansts/dimension';


const PostDetailScreen = () => {


    //States
    const globalUser = useSelector(state => state.globalUser.globalUser);
    const [visibleFullImg, setVisibleFullImg] = useState(false);
    const [settingPostModalVisible, setSettingPostModalVisible] = useState(false);
    const [cmtContent, setCmtContent] = useState('');
    const [showMoreComment, setShowMoreComment] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);

    const { _id, emailuser, iduser, idpostshare, postshare, seq, imgurl, content, date, seescope, allowcmt, formal, active, pdfurl, urlavatar, username, headline, liked, likenumber, cmtnumber, comments, shortComments } = useSelector(state => state.post.specificPost);
    const specificLoading = useSelector(state => state.post.specificLoading);
    const loadingDeletePost = useSelector(state => state.post.loadingDeletePost);
    const loadingUpdateFormalMode = useSelector(state => state.post.loadingUpdateFormalMode);
    const loadingUpdateSeescope = useSelector(state => state.post.loadingUpdateSeescope);
    const loadingUpdateActive = useSelector(state => state.post.loadingUpdateActive);
    const loadingDeleteComment = useSelector(state => state.post.loadingDeleteComment);
    const submitCommentLoading = useSelector(state => state.post.submitCommentLoading);

    //others
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const idpost = route.params._idpost;

    //-------------------------Effects-----------------------------------

    useEffect(() => {
        dispatch(getSpecificPost(globalUser.email, idpost));
        return () => {
            setCmtContent('');
            dispatch(clearPostDetail());
        }
    }, []);

    useEffect(() => {
        let valueChangeListener;
        //Lắng nghe thay đổi và cập nhật post
        valueChangeListener = database()
            .ref(`/posts/${idpost}`)
            .on('value', snapshot => {
                dispatch(reloadSpecificPost(globalUser.email, idpost));
            });

        return () => {
            setCmtContent('');
            dispatch(clearPostDetail());
            database()
                .ref(`/posts/${idpost}`)
                .off('value', valueChangeListener);
        }
    }, []);

    //-------------------------Functions---------------------------------

    const onSubmitComment = () => {
        let sendingTime;
        if (comments.length > 0) {
            sendingTime = comments[comments.length - 1].date;
        } else {
            sendingTime = "2021-01-23T14:06:51.142Z";
        }

        const body = {
            iduser: globalUser._id,
            idpost: _id,
            cmtcontent: cmtContent,
            iduserRecieveNoti: iduser,
            lastCommentSendingTime: sendingTime
        }

        dispatch(submitComment(body, globalUser.email, _id, formal))
        setCmtContent('');
    }

    //--------------------------------------------------

    return (
        <View style={styles.container}>

            {/* Header  */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="md-arrow-back" size={24} color={Colors.Gray}></Ionicons>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Post detail</Text>
                {
                    globalUser.email !== emailuser ?
                        <View style={{ width: 20 }}></View>
                        : loadingDeletePost || loadingUpdateFormalMode || loadingDeleteComment || loadingUpdateSeescope || loadingUpdateActive ?
                            <ActivityIndicator size="small" color={Colors.MainBlue}></ActivityIndicator>
                            :
                            <TouchableOpacity onPress={() => setSettingPostModalVisible(true)}>
                                <Ionicons name="settings-outline" size={20} color={Colors.Gray}></Ionicons>
                            </TouchableOpacity>
                }
            </View>


            {specificLoading ?
                <ActivityIndicator size="large" color={Colors.MainBlue}></ActivityIndicator>
                :
                <ScrollView keyboardShouldPersistTaps="handled">
                    {/* post details */}
                    <View style={tempStyles.post_details_container}>

                        {urlavatar !== "" ?
                            <TouchableOpacity onPress={() => {
                                globalUser.email === emailuser ?
                                    navigation.navigate("Profile")
                                    :
                                    navigation.navigate("GeneralProfile", { _email: emailuser })
                            }}>
                                <Image source={{ uri: urlavatar }} style={styles.avatar} />
                            </TouchableOpacity>
                            :
                            <View style={{
                                height: 48,
                                width: 48,
                                borderRadius: 50,
                                borderWidth: 1,
                                marginRight: 15,
                                borderColor: Colors.LightGray,
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <FontAwesome5 name="user-check" size={20} color={Colors.Gray}></FontAwesome5>
                            </View>
                        }

                        <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <TextHighLight
                                mainText={username}
                                subText={'- 3rd+'}
                                fontSizeMT={16}
                                fontSizeST={12}
                                colorST={Colors.Gray}
                                onPress={() => {
                                    globalUser.email === emailuser ?
                                        navigation.navigate("Profile")
                                        :
                                        navigation.navigate("GeneralProfile", { _email: emailuser })
                                }}
                            />
                            {headline ? <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>{headline}</Text> : null}
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <Text style={styles.text}>{moment(date).fromNow()} - </Text>
                                <Ionicons name={seescope === "anyone" ? "earth" : "people"} size={14} color={Colors.Gray}></Ionicons>
                            </View>

                        </View>
                    </View>


                    {/* Text Content */}
                    <Text style={tempStyles.text_content}> {content} </Text>

                    {/* Post shared  */}
                    {
                        postshare ?
                            <PostShareThumbnail
                                margin={5}
                                padding={5}
                                imgurl={postshare.imgurl}
                                textcontent={postshare.textcontent}
                                date={postshare.date}
                                seescope={postshare.seescope}
                                urlavatar={postshare.urlavatar}
                                username={postshare.username}
                                headline={postshare.headline}
                                emailuser={postshare.emailuser}
                                recommend={postshare.recommend}
                                onLongPress={() => dispatch(reloadSpecificPost(globalUser.email, idpostshare))}
                            ></PostShareThumbnail> : null
                    }

                    {/* Image if Its available */}
                    {
                        imgurl ?
                            <TouchableWithoutFeedback onPress={() => setVisibleFullImg(true)}>
                                <Image source={{ uri: imgurl }} style={{
                                    width: Dimens.retangleImageFitScreen.width,
                                    height: Dimens.retangleImageFitScreen.height,
                                }} />
                            </TouchableWithoutFeedback>
                            :
                            null
                    }

                    {/* Reaction bar  */}
                    <View style={tempStyles.reacttion_bar_container}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <AntDesign name="like1" size={18} color={liked ? Colors.MainBlue : Colors.Gray}></AntDesign>
                            <Text style={styles.text}> {liked == true && likenumber > 1 ? `You and ${FormatNumber(likenumber - 1)} others` : liked == true && likenumber == 1 ? "You" : FormatNumber(likenumber)}</Text>
                        </View>
                        <Text style={styles.text}>{FormatNumber(cmtnumber)} comments</Text>
                    </View>


                    {/* Function bar */}
                    <View style={{ ...tempStyles.function_bar_container, }}>

                        <TouchableOpacity onPress={() => {
                            if (!liked) {
                                dispatch(likePost(globalUser._id, _id));
                            } else {
                                dispatch(disLikePost(globalUser._id, _id));
                            }

                        }}>
                            <Text style={[tempStyles.function_text, {
                                color: liked ? Colors.MainBlue : Colors.Gray
                            }]}>Like</Text>
                        </TouchableOpacity>

                        {allowcmt === true ? <Text style={tempStyles.function_text}>Comment</Text> : null}

                        <Text style={tempStyles.function_text}>Share</Text>

                        <Text style={tempStyles.function_text}>Send</Text>

                    </View>

                    <View style={{ height: 1, width: '100%', backgroundColor: Colors.LightGray }}></View>

                    {/* Phần xem thêm bình luận  */}
                    {
                        comments.length > 5 ?
                            <TouchableOpacity onPress={() => setShowMoreComment(!showMoreComment)}>
                                {
                                    showMoreComment ?
                                        <Text style={{ fontWeight: 'bold', color: Colors.Gray, marginHorizontal: 10, marginTop: 10 }}>Ẩn bớt bình luận</Text>
                                        :
                                        <Text style={{ fontWeight: 'bold', color: Colors.Gray, marginHorizontal: 10, marginTop: 10 }}>Xem thêm {comments.length - 5}  bình luận</Text>
                                }
                            </TouchableOpacity> : null
                    }

                    {/* Phần chứa các bình luận */}
                    {
                        showMoreComment ?
                            comments && comments.map(item => <CommentItem
                                key={item._id}
                                _id={item._id}
                                idpost={idpost}
                                username={item.username}
                                email={item.email}
                                urlavatar={item.urlavatar}
                                date={item.date}
                                cmtcontent={item.cmtcontent}
                                formal={formal}
                            ></CommentItem>)
                            :
                            shortComments && shortComments.map(item => <CommentItem
                                key={item._id}
                                _id={item._id}
                                idpost={idpost}
                                username={item.username}
                                email={item.email}
                                urlavatar={item.urlavatar}
                                date={item.date}
                                cmtcontent={item.cmtcontent}
                                formal={formal}
                            ></CommentItem>)
                    }


                    {/* Phần nhập bình luận  */}
                    {
                        allowcmt ?
                            <InputComment
                                onChangeText={text => setCmtContent(text)}
                                submitCommentLoading={submitCommentLoading}
                                cmtContent={cmtContent}
                                onSubmitComment={onSubmitComment}
                            ></InputComment>
                            :
                            <TurnOffComment></TurnOffComment>
                    }

                    {
                        visibleFullImg ? <FullScreenImageModal
                            imgurl={imgurl}
                            visible={visibleFullImg}
                            onPressClose={() => setVisibleFullImg(false)}
                        ></FullScreenImageModal> : null
                    }

                    {
                        settingPostModalVisible ? <SettingPostModal
                            idpost={idpost}
                            visible={settingPostModalVisible}
                            formal={formal}
                            active={active}
                            seescope={seescope}
                            onSelectEditPost={() => {
                                setSettingPostModalVisible(false);
                                setEditModalVisible(true);
                            }}
                            onTouchOutside={() => setSettingPostModalVisible(false)}
                        ></SettingPostModal> : null
                    }

                    {
                        editModalVisible ? <EditPostModal
                            visible={editModalVisible}
                            idpost={idpost}
                            formal={formal}
                            imgurl={imgurl}
                            email={emailuser}
                            content={content}
                            onPressClose={() => setEditModalVisible(false)}
                        ></EditPostModal> : null
                    }

                    <Footer />
                </ScrollView>
            }

        </View>
    );
}


export default PostDetailScreen;