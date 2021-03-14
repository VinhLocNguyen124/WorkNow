import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';

//Styles & Images & Icons
import { styles } from '../../Styles/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';

//redux 
import { useSelector, useDispatch } from 'react-redux';
import { disconnect } from '../../../redux/actions/request';

//Navigation
import { useNavigation } from '@react-navigation/native';

//helpers
import { setI18nConfig, translate } from '../../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';
import { returnAvatarUser } from '../../../helpers/UIHandling';

//Components

//Consts
import { Colors } from '../../../constansts/color';
import { Dimens } from '../../../constansts/dimension';


const FriendItem = (props) => {
    //Props
    const { urlavatar, username, headline, email, idconnect, iduser } = props;

    //States
    const globalUser = useSelector(state => state.globalUser.globalUser);

    //Others
    const navigation = useNavigation();
    const dispatch = useDispatch();

    //----------------Effects----------------------

    //----------------Functions--------------------
    const onDisconnect = () => {
        dispatch(disconnect(idconnect, globalUser._id))
    }

    return (
        <View style={{
            flexDirection: 'row', paddingHorizontal: 10, borderBottomWidth: 1,
            borderBottomColor: Colors.LightGray, alignItems: 'center',
            paddingVertical: 10
        }}>
            <TouchableOpacity onPress={() => navigation.navigate("GeneralProfile", { _email: email })}>
                <Image source={{ uri: returnAvatarUser(urlavatar) }} style={{ ...styles.avatar, marginRight: 5 }} />
            </TouchableOpacity>

            <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', flex: 1 }}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ fontSize: 15, fontWeight: 'bold' }}
                    onPress={() => navigation.navigate("GeneralProfile", { _email: email })}
                >{username}</Text>

                {headline ? <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ ...styles.text, width: '90%' }}
                >{headline}</Text> : null}
            </View>

            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{
                    paddingVertical: 5,
                    backgroundColor: 'white', margin: 2,
                    paddingHorizontal: 10, borderRadius: 5, elevation: 5
                }} onPress={() => navigation.navigate("MessageDetail", { _idguess: iduser })}>
                    <AntDesign name="message1" size={18} color={Colors.DarkTurquoise}></AntDesign>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    paddingVertical: 5,
                    backgroundColor: Colors.Gray, margin: 2,
                    paddingHorizontal: 10, borderRadius: 5, elevation: 5
                }} onPress={onDisconnect}>
                    <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>disconnect</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

FriendItem.propTypes = ({
    urlavatar: PropTypes.string,
    username: PropTypes.string,
    headline: PropTypes.string,
    email: PropTypes.string,
    idconnect: PropTypes.string,
    iduser: PropTypes.string,
});

FriendItem.defaultProps = ({

});

export default React.memo(FriendItem);