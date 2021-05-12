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

//Navigation
import { useNavigation } from '@react-navigation/native';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { markOneAsReadNotification } from '../../../redux/actions/notification';

//Consts
import { Colors } from '../../../constansts/color';
import PropTypes from 'prop-types';
const imgDimen = 45;

const IconTypeNotification = (props) => {
    //Props
    const { type } = props;

    const returnBackGroundIcon = useCallback((type: string) => {
        switch (type) {

            case "job":
            case "social_like":
            case "connection":
                //Hình nút like
                return Colors.MainBlue
                break;

            case "social_comment":
                //Hình trò chuyện
                return "#1dcf70"
                break;

            case "connection_accept":
                //Hình hai người
                return "#fa61d4"
                break;

            case "connection_deny":
                //Hình người dấu trừ
                return "tomato"
                break;

            default:
                return Colors.MainBlue
                break;
                break;

        }
    }, [])

    const returnIcon = useCallback(
        (type: string) => {
            switch (type) {
                case "job":
                    //Hình cái cặp briefcase-sharp
                    return <Ionicons name="briefcase-sharp" size={13} color={'white'}></Ionicons>
                    break;

                case "social_like":
                    //Hình nút like
                    return <AntDesign name="like1" size={13} color={'white'}></AntDesign>
                    break;

                case "social_comment":
                    //Hình trò chuyện
                    return <Ionicons name="chatbox" size={13} color={'white'}></Ionicons>
                    break;

                case "connection":
                    //Hình connect
                    return <Ionicons name="person-add" size={13} color={'white'}></Ionicons>
                    break;

                case "connection_accept":
                    //Hình accept
                    return <Ionicons name="people-sharp" size={13} color={'white'}></Ionicons>
                    break;

                case "connection_deny":
                    //Hình deny
                    return <Ionicons name="person-remove-sharp" size={13} color={'white'}></Ionicons>
                    break;

                default:
                    return <Ionicons name="stopwatch" size={13} color={'white'}></Ionicons>
                    break;
            }
        }
        , [])


    return (
        <View style={{ backgroundColor: returnBackGroundIcon(type), borderRadius: 20, position: 'absolute', bottom: 0, right: 0, padding: 3, paddingHorizontal: 5 }}>
            {returnIcon(type)}
        </View>
    );
}




export default React.memo(IconTypeNotification);