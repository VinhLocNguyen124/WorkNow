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

//Navigation
import { useNavigation } from '@react-navigation/native';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { markOneAsReadNotification } from '../../../redux/actions/notification';

//Consts
import { Colors } from '../../../constansts/color';
import PropTypes from 'prop-types';


const ButtonNotification = (props) => {
    //Props
    const { text, onPress, color } = props;


    return (
        <TouchableNativeFeedback onPress={onPress}>
            <View style={{
                paddingVertical: 4, paddingHorizontal: 15,
                backgroundColor: 'white',
                elevation: 5,
                paddingBottom: 6,
                borderWidth: 2, borderColor: color,
                borderRadius: 20, marginLeft: 10
            }}>
                <Text style={{ color: color, fontWeight: 'bold', }}>{text}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}

ButtonNotification.propTypes = ({
    text: PropTypes.string,
    color: PropTypes.string,
    onPress: PropTypes.func
});

ButtonNotification.defaultProps = ({
    onPress: null
});




export default React.memo(ButtonNotification);