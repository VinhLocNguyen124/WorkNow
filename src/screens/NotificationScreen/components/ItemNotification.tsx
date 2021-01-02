import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Button,
    TextInput,
    StyleSheet
} from 'react-native';

//Styles & Images & Icons
import { styles } from '../../Styles/styles';
import Feather from 'react-native-vector-icons/Feather';

//helpers
import { setI18nConfig, translate } from '../../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment';

//Components


//Consts
import { Colors } from '../../../constansts/color';
import PropTypes from 'prop-types';


const ItemNotification = (props) => {

    const { avatarurl, content, date, onPress, unread } = props;

    const renderTextContent = () => {

        if (content.length > 150) {
            const shortContent = content.substring(0, 150);
            return shortContent + "...";
        } else {
            return content;
        }



    }

    return (
        <TouchableOpacity style={{ ...tempStyles.post_details_container, backgroundColor: unread ? '#b3f0ff' : 'white' }} onPress={onPress}>

            <Image source={{ uri: avatarurl }} style={{ ...styles.avatarSmall, }} />


            <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', flex: 1 }}>
                <Text style={styles.text} numberOfLines={3} ellipsizeMode="tail">{content}</Text>
                <Text style={{ ...styles.text, color: Colors.MainBlue, fontWeight: 'bold', fontSize: 14, textAlign: 'justify' }}>{moment(date).fromNow()}</Text>
            </View>

            <Feather name="more-vertical" size={18} color={Colors.Gray}></Feather>
        </TouchableOpacity >
    );
}

ItemNotification.propTypes = ({
    avatarurl: PropTypes.string,
    username: PropTypes.string,
    content: PropTypes.string,
    date: PropTypes.string,
    unread: PropTypes.bool,
    onPress: PropTypes.func,
});

ItemNotification.defaultProps = ({
    onPress: null,
});

const tempStyles = StyleSheet.create({
    post_details_container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderBottomWidth: 1, borderBottomColor: Colors.LightGray,
    },

});



export default React.memo(ItemNotification);