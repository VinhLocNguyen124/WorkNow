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
import Animated from 'react-native-reanimated';

//Firebase
import auth from '@react-native-firebase/auth';
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
import { FitImageDimension } from '../../helpers/FitImageDimension';
import {
    onLaunchImageGallery,
    onLaunchCamera,
    onPickFile
} from '../../helpers/MediaConfig';
import { FormatNumber } from '../../helpers/FormatNumber';
import moment from 'moment';

//apis
import { fetchData } from '../../apis/apiCaller';

//hooks

//redux & actions
import { useSelector, useDispatch } from 'react-redux';
import { likePost, disLikePost, getSpecificPost, submitComment } from '../../redux/actions/post';

//Components
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import FullScreenImageModal from '../HomeScreen/components/FullScreenImageModal';
import TextHighLight from '../../components/TextHighLight';
import CommentItem from './components/CommentItem';

//Consts
import { Colors } from '../../constansts/color';
import { Dimens } from '../../constansts/dimension';
import { dataBottomSheet } from '../../constansts/postDataBottomSheet';
import { URLs } from '../../constansts/url';
import { isConstructorDeclaration } from 'typescript';
import { launchImageLibrary } from 'react-native-image-picker';


const PostDetailScreen = () => {


    //States
    const globalUser = useSelector(state => state.globalUser.globalUser);
    const [visibleFullImg, setVisibleFullImg] = useState(false);
    const [likedPost, setLikedPost] = useState(false);
    const [cmtContent, setCmtContent] = useState('');

    const { _id, emailuser, seq, imgurl, content, date, seescope, allowcmt, pdfurl, urlavatar, username, headline, liked, comments } = useSelector(state => state.post.specificPost);
    const specificLoading = useSelector(state => state.post.specificLoading);
    const submitCommentLoading = useSelector(state => state.post.submitCommentLoading);

    //others

    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    //-------------------------Effects-----------------------------------

    useEffect(() => {
        dispatch(getSpecificPost(globalUser.email, route.params._idpost));
        setLikedPost(liked);
        return () => {
            setCmtContent('');
        }
    }, []);

    //-------------------------Functions---------------------------------

    const onSubmitComment = () => {
        const body = {
            iduser: globalUser._id,
            idpost: _id,
            cmtcontent: cmtContent
        }
        dispatch(submitComment(body, globalUser.email, _id))
        setCmtContent('');
    }
    //--------------------------------------------------


    return (
        <View style={styles.container}>
            <Header screenName="Post detail"></Header>

            {specificLoading ?
                <ActivityIndicator size="large" color={Colors.MainBlue}></ActivityIndicator>
                :
                <ScrollView>
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
                            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>{headline}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <Text style={styles.text}>{moment(date).fromNow()} - </Text>
                                <Ionicons name={seescope === "anyone" ? "earth" : "people"} size={14} color={Colors.Gray}></Ionicons>
                            </View>

                        </View>
                    </View>


                    {/* Text Content */}
                    <Text style={tempStyles.text_content}> {content} </Text>

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
                            <AntDesign name="like1" size={18} color={likedPost ? Colors.MainBlue : Colors.Gray}></AntDesign>
                            <Text style={styles.text}>{FormatNumber(1982852)}</Text>
                        </View>
                        <Text style={styles.text}>{FormatNumber(1590)} comments</Text>
                    </View>


                    {/* Function bar */}
                    <View style={{ ...tempStyles.function_bar_container, }}>

                        <Text style={[tempStyles.function_text, {
                            color: likedPost ? Colors.MainBlue : Colors.Gray
                        }]} onPress={() => {
                            if (!likedPost) {
                                setLikedPost(true);
                                dispatch(likePost(globalUser._id, _id));
                            } else {
                                setLikedPost(false);
                                dispatch(disLikePost(globalUser._id, _id));
                            }

                        }}>Like</Text>

                        {allowcmt === true ? <Text style={tempStyles.function_text}>Comment</Text> : null}

                        <Text style={tempStyles.function_text}>Share</Text>

                        <Text style={tempStyles.function_text}>Send</Text>

                    </View>

                    <View style={{ height: 1, width: '100%', backgroundColor: Colors.LightGray }}></View>


                    {/* Phần chứa các bình luận */}
                    {
                        comments && comments.map(item => <CommentItem
                            key={item._id}
                            _id={item._id}
                            username={item.username}
                            email={item.email}
                            urlavatar={item.urlavatar}
                            date={item.date}
                            cmtcontent={item.cmtcontent}
                        ></CommentItem>)
                    }


                    {/* Phần nhập bình luận  */}
                    <View style={{
                        flexDirection: 'row', padding: 10,
                        backgroundColor: 'transparent', alignItems: 'center',
                        borderWidth: 1, borderColor: Colors.LightGray, marginTop: 10
                    }}>
                        <TextInput
                            style={{
                                flex: 1, height: 40,
                                marginHorizontal: 10, borderWidth: 1, borderColor: Colors.Gray,
                                borderRadius: 15,
                                paddingHorizontal: 10,
                            }}
                            placeholder="Nhập bình luận của bạn ..."
                            onChangeText={text => setCmtContent(text)}
                            value={cmtContent}
                        ></TextInput>

                        <TouchableOpacity onPress={onSubmitComment}>
                            {submitCommentLoading ?
                                <ActivityIndicator size="small" color={Colors.MainBlue}></ActivityIndicator>
                                :
                                <FontAwesome name="send" size={25} color={Colors.MainBlue}></FontAwesome>
                            }
                        </TouchableOpacity>
                    </View>

                    {
                        visibleFullImg ? <FullScreenImageModal
                            imgurl={imgurl}
                            visible={visibleFullImg}
                            onPressClose={() => setVisibleFullImg(false)}
                        ></FullScreenImageModal> : null
                    }

                    <Footer />
                </ScrollView>
            }

        </View>
    );
}


export default PostDetailScreen;