import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    Button,
    TextInput,
    StyleSheet,
    Dimensions,
    Modal,
} from 'react-native';

//Styles & Images & Icons
import { styles } from '../../Styles/styles';
import { tempStyles } from '../Styles/index';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//helpers
import { setI18nConfig, translate } from '../../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';
import { FormatNumber } from '../../../helpers/FormatNumber';
import moment from 'moment';
import PDF from 'react-native-pdf';

//Components
import TextHighLight from '../../../components/TextHighLight';
import { Picker } from 'native-base';
import FullScreenImageModal from './FullScreenImageModal';
import BottomSheetItem from '../../PostScreen/Components/BottomSheetItem';

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

    //Props 
    const { key, _id, emailuser, seq, imgurl, textcontent, date, seescope, allowcmt, pdfurl, urlavatar, username, headline, liked } = props;
    console.log(`render PostItem ${seq}`)

    //State
    const [shortTextContent, setShortTextContent] = useState(true);
    const [seeMore, setSeeMore] = useState(false);
    const [userRelation, setUserRelation] = useState('java');
    const [likedPost, setLikedPost] = useState(false);

    const [visibleFullImg, setVisibleFullImg] = useState(false);
    const [visibleEditOption, setVisibleEditOption] = useState(false);
    const globalUser = useSelector(state => state.globalUser.globalUser);

    //Others
    const dispatch = useDispatch();
    const navigation = useNavigation();

    //-----------------------------------Effects-----------------------------------------
    useEffect(() => {
        checkTextContent();
        setLikedPost(liked);

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
        <View style={{ backgroundColor: 'white', marginBottom: 10 }}>
            {/* Relation bar  */}
            <View style={tempStyles.relation_bar_container}>
                <Text style={{ fontSize: 12 }}>Recommend for you</Text>

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
            { renderTextContent()}

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
                    <Text style={styles.text}>{FormatNumber(19)}</Text>
                </View>
                <Text style={styles.text}>{FormatNumber(5)} comments</Text>
            </View>


            {/* Function bar */}
            <View style={tempStyles.function_bar_container}>

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

                {allowcmt === true ? <Text style={tempStyles.function_text} onPress={() => navigation.navigate("PostDetail", { _idpost: _id })}>Comment</Text> : null}

                <Text style={tempStyles.function_text}>Share</Text>

                <Text style={tempStyles.function_text}>Send</Text>

            </View>

            {
                visibleFullImg ? <FullScreenImageModal
                    imgurl={imgurl}
                    visible={visibleFullImg}
                    onPressClose={() => setVisibleFullImg(false)}
                ></FullScreenImageModal> : null
            }

            {
                visibleEditOption ?
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={visibleEditOption}
                    >
                        <View style={tempStyles.pi_all_container}>
                            <TouchableOpacity style={tempStyles.pi_outside_touch} onPress={() => setVisibleEditOption(false)}>

                            </TouchableOpacity>

                            <View style={tempStyles.pi_main_container}>
                                <View style={tempStyles.pi_header}>
                                    <View style={tempStyles.pi_horizontal_bar}></View>
                                </View>

                                <BottomSheetItem
                                    icon={<AntDesign name="disconnect" size={20} color={Colors.Gray}></AntDesign>}
                                    label={"Disconnect this person"}
                                    onPress={() => { }}
                                ></BottomSheetItem>

                                <BottomSheetItem
                                    icon={<AntDesign name="edit" size={20} color={Colors.Gray}></AntDesign>}
                                    label={"Edit this post"}
                                    onPress={() => { }}
                                ></BottomSheetItem>

                                <BottomSheetItem
                                    icon={<Ionicons name="notifications-off" size={20} color={Colors.Gray}></Ionicons>}
                                    label={"Don't recieve notification from this post"}
                                    onPress={() => { }}
                                ></BottomSheetItem>

                                <BottomSheetItem
                                    icon={<Ionicons name="share-social-outline" size={20} color={Colors.Gray}></Ionicons>}
                                    label={"Share with"}
                                    onPress={() => { }}
                                ></BottomSheetItem>

                                {false ?
                                    <BottomSheetItem
                                        icon={<Feather name="shield-off" size={20} color={Colors.Gray}></Feather>}
                                        label={"Make this post natural"}
                                        onPress={() => { }}
                                    ></BottomSheetItem>
                                    :
                                    <BottomSheetItem
                                        icon={<Feather name="shield" size={20} color={Colors.Gray}></Feather>}
                                        label={"Keep this post formal"}
                                        onPress={() => { }}
                                    ></BottomSheetItem>
                                }

                                <BottomSheetItem
                                    icon={<AntDesign name="delete" size={20} color={Colors.Gray}></AntDesign>}
                                    label={"Delete post"}
                                    onPress={() => { }}
                                ></BottomSheetItem>

                                <View style={{ ...tempStyles.pi_header, height: 40 }} />

                            </View>
                        </View>
                    </Modal>
                    :
                    null
            }

        </View >
    );
}

PostItem.propTypes = ({
    seq: PropTypes.string,
    _id: PropTypes.string,
    emailuser: PropTypes.string,
    key: PropTypes.string,
    imgurl: PropTypes.string,
    pdfurl: PropTypes.string,
    textcontent: PropTypes.string,
    date: PropTypes.string,
    seescope: PropTypes.string,
    allowcmt: PropTypes.bool,
    urlavatar: PropTypes.string,
    username: PropTypes.string,
    headline: PropTypes.string,
    liked: PropTypes.bool,
});

PostItem.defaultProps = ({

});







export default React.memo(PostItem);