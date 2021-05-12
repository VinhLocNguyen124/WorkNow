import React, { useCallback } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TouchableNativeFeedback,
    Image,
    Button,
    TextInput,
    StyleSheet
} from 'react-native';

//Styles & Images & Icons
import { styles } from '../../Styles/styles';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

//helpers
import { setI18nConfig, translate } from '../../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment';

//Components
import IconTypeNotification from './IconTypeNotification';
import ButtonNotification from './ButtonNotification';

//Navigation
import { useNavigation } from '@react-navigation/native';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { markOneAsReadNotification, deleteOneNotification } from '../../../redux/actions/notification';
import { acceptRequest, deleteRequest } from '../../../redux/actions/request';

//Consts
import { Colors } from '../../../constansts/color';
import PropTypes from 'prop-types';
const imgDimen = 45;

const ItemNotification = (props) => {
    //Props
    const { index, id, type, avatarurl, idpost, idrequest, idrequirement, content, username, date, read } = props;
    //States
    const globalUser = useSelector(state => state.globalUser.globalUser);

    //Others
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const onPressItemNoti = () => {
        switch (type) {

            case "social_like":
            case "social_comment":
                navigation.navigate("PostDetail", { _idpost: idpost });
                dispatch(markOneAsReadNotification(globalUser._id, id));
                break;

            case "job":

                break;

            case "connection":
                navigation.navigate("ListRequest");
                dispatch(markOneAsReadNotification(globalUser._id, id));
                break;

            case "connection_accept":
                navigation.navigate("ListFriend");
                dispatch(markOneAsReadNotification(globalUser._id, id));
                break;

            case "connection_deny":

                break;

            default:
                return false;
                break;
        }
    }

    return (
        <TouchableNativeFeedback onPress={onPressItemNoti}>

            <View style={{ ...tempStyles.post_details_container, backgroundColor: read ? 'white' : '#ceeff5', }}>
                <View style={{ marginRight: 10, marginTop: 8 }}>
                    <Image source={{ uri: avatarurl }} style={{
                        width: imgDimen,
                        height: imgDimen,
                        borderRadius: 30,
                        marginBottom: 7
                    }} />
                    <IconTypeNotification type={type}></IconTypeNotification>
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', flex: 1, paddingVertical: 4 }}>
                    <Text
                        style={{ fontWeight: 'bold', fontSize: 12 }}
                        numberOfLines={3}
                        ellipsizeMode="tail"
                    >{username} <Text style={styles.text} >{content}</Text></Text>

                    {
                        type === "connection" ?
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }}>
                                <ButtonNotification
                                    text="chấp nhận"
                                    color={Colors.DeepSkyBlue}
                                    onPress={() => dispatch(acceptRequest(idrequest, globalUser.email, () => {
                                        dispatch(deleteOneNotification(id, globalUser._id))
                                    }))}
                                ></ButtonNotification>

                                <ButtonNotification
                                    text="từ chối"
                                    color={'tomato'}
                                    onPress={() => dispatch(deleteRequest(idrequest, globalUser.email, () => {
                                        dispatch(deleteOneNotification(id, globalUser._id));
                                    }))}
                                ></ButtonNotification>
                            </View> : null
                    }

                    <Text style={{ ...styles.text, color: Colors.MainBlue, fontWeight: 'bold', fontSize: 12, textAlign: 'justify', marginTop: 5 }}>{moment(date).fromNow()}</Text>


                </View>

            </View>
        </TouchableNativeFeedback >
    );
}

ItemNotification.propTypes = ({
    index: PropTypes.number,
    id: PropTypes.string,
    type: PropTypes.string,
    avatarurl: PropTypes.string,
    idpost: PropTypes.string,
    idrequest: PropTypes.string,
    idrequirement: PropTypes.string,
    username: PropTypes.string,
    content: PropTypes.string,
    date: PropTypes.string,
    read: PropTypes.bool,

});

ItemNotification.defaultProps = ({

});

const tempStyles = StyleSheet.create({
    post_details_container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 7,
    },

});



export default React.memo(ItemNotification);