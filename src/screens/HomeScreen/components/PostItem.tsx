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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

//helpers
import { setI18nConfig, translate } from '../../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';
import { FormatNumber } from '../../../helpers/FormatNumber';
import moment from 'moment';

//Components
import TextHighLight from '../../../components/TextHighLight';
import { Picker } from 'native-base';
import FullScreenImageModal from './FullScreenImageModal';

//Consts
import { Colors } from '../../../constansts/color';
import { Dimens } from '../../../constansts/dimension';
import PropTypes from 'prop-types';


//Dimensions
const standartMargin = 10;

const PostItem = (props) => {

    //props and states
    const { key, seq, imgurl, textcontent, date, seescope, allowcmt } = props;
    console.log(`render PostItem ${seq}`)
    const [shortTextContent, setShortTextContent] = useState(true);
    const [liked, setLiked] = useState(false);
    const [seeMore, setSeeMore] = useState(false);
    const [userRelation, setUserRelation] = useState('java');
    const [visibleFullImg, setVisibleFullImg] = useState(false);

    //functions
    useEffect(() => {
        checkTextContent();

        return () => {

        }
    }, []);

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

                <Picker
                    mode="dropdown"
                    placeholder="Select your relationship"
                    placeholderStyle={{ color: "red" }}
                    placeholderIconColor="#007aff"
                    style={{ width: undefined }}
                    selectedValue={userRelation}
                    onValueChange={value => setUserRelation(value)}
                >
                    <Picker.Item label="Connecting" value="key0" />
                    <Picker.Item label="Disconnect" value="key1" />
                </Picker>
            </View>


            {/* post details */}
            <View style={tempStyles.post_details_container}>
                <Image source={require('../../../assets/images/locnguyen.jpg')} style={styles.avatar} />
                <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <TextHighLight
                        mainText={'Nguyen Vinh Loc'}
                        subText={'- 3rd+'}
                        fontSizeMT={16}
                        fontSizeST={12}
                        colorST={Colors.Gray}
                    />
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>Fresher developer, IkoIOS Hanoi Tech Center</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Text style={styles.text}>{moment(date).fromNow()} - </Text>
                        <Ionicons name={seescope === "anyone" ? "earth" : "people"} size={14} color={Colors.Gray}></Ionicons>
                    </View>

                </View>
            </View>


            {/* Text Content */}
            {renderTextContent()}

            {/* Image if Its available */}
            {imgurl ?
                <TouchableWithoutFeedback onPress={() => setVisibleFullImg(true)}>
                    <Image source={{ uri: imgurl }} style={{
                        width: Dimens.retangleImageFitScreen.width,
                        height: Dimens.retangleImageFitScreen.height,
                    }} />
                </TouchableWithoutFeedback>
                :
                <View></View>
            }


            {/* Reaction bar  */}
            <View style={tempStyles.reacttion_bar_container}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="like1" size={18} color={liked ? Colors.MainBlue : Colors.Gray}></AntDesign>
                    <Text style={styles.text}>{FormatNumber(1982852)}</Text>
                </View>
                <Text style={styles.text}>{FormatNumber(1590)} comments</Text>
            </View>


            {/* Function bar */}
            <View style={tempStyles.function_bar_container}>
                <Text style={[tempStyles.function_text, {
                    color: liked ? Colors.MainBlue : Colors.Gray
                }]} onPress={() => setLiked(!liked)}>Like</Text>
                {allowcmt === "yes" ? <Text style={tempStyles.function_text}>Comment</Text> : null}
                <Text style={tempStyles.function_text}>Share</Text>
                <Text style={tempStyles.function_text}>Send</Text>
            </View>

            {visibleFullImg ? <FullScreenImageModal
                imgurl={imgurl}
                visible={visibleFullImg}
                onPressClose={() => setVisibleFullImg(false)}
            ></FullScreenImageModal> : null}

        </View>
    );
}

PostItem.propTypes = ({
    seq: PropTypes.string,
    key: PropTypes.string,
    imgurl: PropTypes.string,
    textcontent: PropTypes.string,
    date: PropTypes.string,
    seescope: PropTypes.string,
    allowcmt: PropTypes.string,
});

PostItem.defaultProps = ({

});

const tempStyles = StyleSheet.create({
    pi_container: {

    },
    relation_bar_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.LightGray,
        marginHorizontal: standartMargin,
    },
    post_details_container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: standartMargin,
        marginTop: 10,
    },
    reacttion_bar_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: standartMargin,
        marginVertical: 5,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.LightGray,
        paddingBottom: 5
    },
    function_bar_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: standartMargin + 5,
        marginBottom: 10,
    },
    function_text: {
        fontSize: 15,
        color: Colors.Gray,
        fontWeight: 'bold'
    },
    text_content: {
        margin: standartMargin,
        textAlign: 'left',
    }
});





export default React.memo(PostItem);