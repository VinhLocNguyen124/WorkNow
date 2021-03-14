import React, { useState, useEffect } from 'react';
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
import { getUserInfo } from '../../../helpers/FirebaseEventHandler';
import { returnAvatarUser } from '../../../helpers/UIHandling';

//Components
import TextHighLight from '../../../components/TextHighLight';

//Consts
import { Colors } from '../../../constansts/color';
import PropTypes from 'prop-types';


const ItemMessage = (props) => {

    const { idguess, message, date, unread, onPress } = props;

    const [user, setUser] = useState({
        "_id": "",
        "urlavatar": "",
        "username": "",
        "headline": "",
        "email": ""
    });

    useEffect(() => {
        let isMounted = true;
        getUserInfo(idguess).then(data => {
            if (isMounted) setUser(data);
        })

        return () => {
            isMounted = false;
        }
    }, []);

    return (
        <TouchableOpacity style={tempStyles.post_details_container} onPress={onPress}>
            <View style={{ borderWidth: 2, borderColor: Colors.MainBlue, borderRadius: 30, marginRight: 10 }}>
                <Image source={{ uri: returnAvatarUser(user.urlavatar) }} style={{ ...styles.avatar, margin: 2, marginRight: 2 }} />
            </View>

            <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', flex: 1 }}>
                <TextHighLight
                    mainText={user.username}
                    fontSizeMT={16} />

                <Text
                    style={{ ...styles.text, width: '95%', fontSize: 13, textAlign: 'justify', fontWeight: unread ? 'bold' : 'normal', color: unread ? Colors.Gray : Colors.LightGray }}
                    numberOfLines={1}
                    ellipsizeMode="tail">  {message}</Text>

                <Text
                    style={{ fontWeight: unread ? 'bold' : 'normal', color: unread ? Colors.DeepSkyBlue : Colors.LightGray, fontSize: 12 }}
                >{moment(date).fromNow()}</Text>
            </View>

            {unread ?
                <View style={{ height: 5, width: 5, borderRadius: 5, backgroundColor: Colors.MainBlue }}></View>
                :
                null
            }
        </TouchableOpacity>
    );
}

ItemMessage.propTypes = ({
    idguess: PropTypes.string,
    message: PropTypes.string,
    date: PropTypes.number,
    unread: PropTypes.bool,
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