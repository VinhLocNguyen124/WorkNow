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

//helpers
import { setI18nConfig, translate } from '../../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';
import { insertMessage } from '../../../helpers/FirebaseEventHandler';

//Consts
import { Colors } from '../../../constansts/color';
import { Dimens } from '../../../constansts/dimension';
import PropTypes from 'prop-types';

//redux
import { useSelector } from 'react-redux';


const WellcomeChatRoom = (props) => {
    const globalUser = useSelector(state => state.globalUser.globalUser);

    const { roomKey } = props;

    return (
        <View style={{
            width: "100%", backgroundColor: 'white', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingVertical: 40
        }}>

            <Image source={require('../../../assets/images/wellcome.png')} style={{ width: Dimens.widthScreen * 0.8, height: Dimens.widthScreen * 0.8 }}></Image>
            <TouchableOpacity style={{
                backgroundColor: 'rgb(245, 245, 239)',
                padding: 10, marginTop: 20,
                borderRadius: 15, elevation: 5
            }} >
                <Text style={{ color: 'rgb(31, 31, 20)' }}>Cùng trò chuyện với nhau nào !!</Text>
            </TouchableOpacity>
        </View>
    );
}

WellcomeChatRoom.propTypes = ({
    roomKey: PropTypes.string,
});

WellcomeChatRoom.defaultProps = ({
});

export default React.memo(WellcomeChatRoom);