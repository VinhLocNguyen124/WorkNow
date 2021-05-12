import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    Share,
    Modal,
} from 'react-native';

import auth from '@react-native-firebase/auth';

//Styles & Images & Icons
import { styles } from '../../Styles/styles';
import { tempStyles } from '../Styles/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//helpers
import { setI18nConfig, translate } from '../../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';
import { FormatNumber } from '../../../helpers/FormatNumber';
import moment from 'moment';
import { returnAvatarUser } from '../../../helpers/UIHandling';

//Components
import TextHighLight from '../../../components/TextHighLight';
import FullScreenImageModal from './FullScreenImageModal';
import BottomSheetModal from './BottomSheetModal';
import PostShareThumbnail from '../../PostScreen/Components/PostShareThumbnail';

//Consts
import { Colors } from '../../../constansts/color';
import { Dimens } from '../../../constansts/dimension';
import PropTypes from 'prop-types';

//redux & actions
import { useSelector, useDispatch } from 'react-redux';
import { likePost, disLikePost } from '../../../redux/actions/post';


//Navigation
import { useNavigation } from '@react-navigation/native';

const PostItem = (props) => {
    const { email, displayName } = auth().currentUser;

    //Props 
    const { key, _id, emailuser, iduser, idpostshare, postshare, seq, imgurl, textcontent, date, seescope, allowcmt, formal, pdfurl, urlavatar, username, headline, liked, likenumber, cmtnumber, recommend } = props;
    console.log(`render PostItem ${seq}`)

    //State
    const [shortTextContent, setShortTextContent] = useState(true);
    const [seeMore, setSeeMore] = useState(false);
    const [status, setStatus] = useState({
        likePost: false,
        likeNumber: 0
    });

    const [visibleFullImg, setVisibleFullImg] = useState(false);
    const [visibleEditOption, setVisibleEditOption] = useState(false);
    const globalUser = useSelector(state => state.globalUser.globalUser);
    //Others
    const dispatch = useDispatch();
    const navigation = useNavigation();

    //-----------------------------------Effects-----------------------------------------
    useEffect(() => {
        checkTextContent();
        setStatus({
            likePost: liked,
            likeNumber: likenumber
        })

        return () => {

        }
    }, []);


    //-----------------------------------Functions---------------------------------------


    const checkTextContent = () => {
        textcontent.length > 170 ? setShortTextContent(false) : setShortTextContent(true);
    }

    //render nội dung rút gọn nếu text quá dài
    const renderTextContent = () => {
        if (shortTextContent) {
            return (
                <Text style={tempStyles.text_content}>{textcontent}</Text>
            );
        } else {

            if (!seeMore) {
                const shortContent = textcontent.substring(0, 170);
                return (
                    <Text style={tempStyles.text_content}> {shortContent}... <Text
                        style={{ color: Colors.Gray }}
                        onPress={() => setSeeMore(true)}
                    >see more</Text> </Text>
                );
            } else {
                return (
                    <Text style={tempStyles.text_content}> {textcontent} <Text
                        style={{ color: Colors.Gray }}
                        onPress={() => setSeeMore(false)}
                    >see less</Text> </Text>
                );
            }
        }
    }


    return (
        <View style={{ backgroundColor: 'white' }}>
            {/* Relation bar  */}
            <View style={tempStyles.relation_bar_container}>
                {
                    recommend && email !== emailuser ?
                        <Text style={{ fontSize: 12 }}>Recommend for you</Text>
                        :
                        <Text style={{ fontSize: 12 }}></Text>
                }


                <TouchableOpacity style={{ paddingVertical: 5, paddingLeft: 10 }} onPress={() => setVisibleEditOption(true)}>
                    <Ionicons name="ellipsis-horizontal" size={25} color={Colors.Gray}></Ionicons>
                </TouchableOpacity>
            </View>


            {/* post details */}
            <View style={tempStyles.post_details_container}>

                {urlavatar !== "" ?
                    <TouchableOpacity onPress={() => {
                        globalUser.email === emailuser ?
                            navigation.navigate("Profile")
                            :
                            navigation.navigate("GeneralProfile", { _email: emailuser })
                    }}>
                        <Image source={{ uri: returnAvatarUser(urlavatar) }} style={styles.avatar} />
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
                        subText={email === emailuser ? '' : recommend ? '- 3rd+' : '- In your network'}
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
            { renderTextContent()}

            {/* PostShare content  */}
            {
                postshare ?
                    <PostShareThumbnail
                        margin={10}
                        padding={5}
                        idpostshare={idpostshare}
                        imgurl={postshare.imgurl}
                        textcontent={postshare.textcontent}
                        date={postshare.date}
                        seescope={postshare.seescope}
                        urlavatar={postshare.urlavatar}
                        username={postshare.username}
                        headline={postshare.headline}
                        emailuser={postshare.emailuser}
                        recommend={postshare.recommend}
                        onLongPress={() => navigation.navigate("PostDetail", { _idpost: idpostshare })}
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
                    <AntDesign name="like1" size={18} color={status.likePost ? Colors.MainBlue : Colors.Gray}></AntDesign>
                    <Text style={styles.text}> {status.likePost == true && status.likeNumber > 1 ? `You and ${FormatNumber(status.likeNumber - 1)} others` : status.likePost == true && status.likeNumber == 1 ? "You" : FormatNumber(status.likeNumber)}</Text>
                </View>
                <Text style={styles.text}>{FormatNumber(cmtnumber)} comments</Text>
            </View>

            {/* Function bar */}
            <View style={tempStyles.function_bar_container}>

                <TouchableOpacity onPress={() => {
                    if (status.likePost === false) {
                        setStatus({
                            likePost: true,
                            likeNumber: status.likeNumber + 1
                        })
                        dispatch(likePost(globalUser._id, _id));
                    } else {
                        setStatus({
                            likePost: false,
                            likeNumber: status.likeNumber - 1
                        })
                        dispatch(disLikePost(globalUser._id, _id));
                    }

                }}>
                    <Text style={[tempStyles.function_text, {
                        color: status.likePost ? Colors.MainBlue : Colors.Gray
                    }]} >Like</Text>
                </TouchableOpacity>

                {allowcmt === true ?
                    <TouchableOpacity onPress={() => navigation.navigate("PostDetail", { _idpost: _id })}>
                        <Text style={tempStyles.function_text}>Comment</Text>
                    </TouchableOpacity>
                    : null
                }

                <TouchableOpacity onPress={() => navigation.navigate("postModal", {
                    _idpost: _id,
                    _imgurl: imgurl,
                    _textcontent: textcontent,
                    _date: date,
                    _seescope: seescope,
                    _urlavatar: urlavatar,
                    _username: username,
                    _headline: headline,
                    _emailuser: emailuser,
                    _recommend: recommend
                })}>
                    <Text style={tempStyles.function_text}>Share</Text>
                </TouchableOpacity>

            </View>

            {
                visibleFullImg ? <FullScreenImageModal
                    imgurl={imgurl}
                    visible={visibleFullImg}
                    onPressClose={() => setVisibleFullImg(false)}
                ></FullScreenImageModal> : null
            }

            {
                visibleEditOption ? <BottomSheetModal
                    _id={_id}
                    emailuser={emailuser}
                    iduser={iduser}
                    recommend={recommend}
                    visibleEditOption={visibleEditOption}
                    onHideModal={() => setVisibleEditOption(false)}
                ></BottomSheetModal> : null
            }

        </View >
    );
}

PostItem.propTypes = ({
    seq: PropTypes.string,
    _id: PropTypes.string,
    emailuser: PropTypes.string,
    iduser: PropTypes.string,
    idpostshare: PropTypes.string,
    postshare: PropTypes.any,
    key: PropTypes.string,
    imgurl: PropTypes.string,
    pdfurl: PropTypes.string,
    textcontent: PropTypes.string,
    date: PropTypes.string,
    seescope: PropTypes.string,
    allowcmt: PropTypes.bool,
    formal: PropTypes.bool,
    urlavatar: PropTypes.string,
    username: PropTypes.string,
    headline: PropTypes.string,
    liked: PropTypes.bool,
    likenumber: PropTypes.number,
    cmtnumber: PropTypes.number,
    recommend: PropTypes.bool
});

PostItem.defaultProps = ({

});

export default React.memo(PostItem);