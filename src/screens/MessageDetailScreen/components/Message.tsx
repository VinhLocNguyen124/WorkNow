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
import { returnAvatarUser } from '../../../helpers/UIHandling';

//Components
import Wellcome from './WellcomeChatRoom';

//Consts
import { Colors } from '../../../constansts/color';
import { Dimens } from '../../../constansts/dimension';
const imageDimen = Dimens.widthScreen * 0.05;
import PropTypes from 'prop-types';

//redux
import { useSelector } from 'react-redux';


const Message = (props) => {
    const globalUser = useSelector(state => state.globalUser.globalUser);

    const { username, content, time, email, roomKey, urlavatar } = props;

    return (
        username === "admin" ?
            <Wellcome roomKey={roomKey}></Wellcome>
            :
            <View style={{
                flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', marginHorizontal: 5, marginVertical: 2
            }}>
                {username === globalUser.username ? null : <Image source={{ uri: returnAvatarUser(urlavatar) }} style={{ height: imageDimen, width: imageDimen, borderRadius: imageDimen, marginBottom: 10 }}></Image>}
                <View style={{
                    flexDirection: 'column',
                    alignItems: username === globalUser.username ? 'flex-end' : 'flex-start',
                    marginHorizontal: 5,
                    marginVertical: 5,
                    flex: 1
                }}>

                    <Text style={{
                        color: username === globalUser.username ? 'white' : 'black',
                        fontSize: 16,
                        backgroundColor: username === globalUser.username ? Colors.MainBlue : '#f2f2f2',
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        maxWidth: '70%'
                    }}>{content}</Text>


                    <Text style={{ width: '95%', fontSize: 10, textAlign: username === globalUser.username ? 'right' : 'left', marginHorizontal: 5, fontWeight: 'bold' }} >{username} - <Text style={{ fontWeight: 'bold', color: Colors.DeepSkyBlue, fontSize: 10 }}>{moment(time).fromNow()}</Text></Text>

                </View>
                {username !== globalUser.username ? null : <Image source={{ uri: returnAvatarUser(globalUser.urlavatar) }} style={{ height: imageDimen, width: imageDimen, borderRadius: imageDimen, marginBottom: 10 }}></Image>}
            </View>

    );
}

Message.propTypes = ({
    username: PropTypes.string,
    content: PropTypes.string,
    time: PropTypes.number,
    email: PropTypes.string,
    roomKey: PropTypes.string,
    urlavatar: PropTypes.string
});

Message.defaultProps = ({

});

export default React.memo(Message);