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
import Ionicons from 'react-native-vector-icons/Ionicons';

//helpers
import { setI18nConfig, translate } from '../../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment';

//Components
import TextHighLight from '../../../components/TextHighLight';

//Consts
import { Colors } from '../../../constansts/color';
import PropTypes from 'prop-types';


const ItemMessage = (props) => {

    const { avatarurl, username, message, date, onPress } = props;

    return (
        <TouchableOpacity style={tempStyles.post_details_container} onPress={onPress}>
            <View style={{ borderWidth: 2, borderColor: Colors.MainBlue, borderRadius: 30, marginRight: 10 }}>
                <Image source={{ uri: avatarurl }} style={{ ...styles.avatar, margin: 2, marginRight: 2 }} />
            </View>

            <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', flex: 1 }}>
                <TextHighLight
                    mainText={username}
                    fontSizeMT={16}
                />
                <Text style={{ ...styles.text, width: '95%', fontSize: 14, textAlign: 'justify' }} numberOfLines={1} ellipsizeMode="tail">{message}</Text>
                <Text style={{ fontWeight: 'bold', color: Colors.DeepSkyBlue, fontSize: 12 }}>{moment(date).fromNow()}</Text>
            </View>
        </TouchableOpacity>
    );
}

ItemMessage.propTypes = ({
    avatarurl: PropTypes.string,
    username: PropTypes.string,
    message: PropTypes.string,
    date: PropTypes.string,
    onPress: PropTypes.func,
});

ItemMessage.defaultProps = ({
    onPress: null,
});

const tempStyles = StyleSheet.create({

    post_details_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 6,
    },

});



export default React.memo(ItemMessage);