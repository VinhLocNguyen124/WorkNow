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

//Firebase
import auth from '@react-native-firebase/auth';
import { FirebaseErrorRespond } from '../../helpers/FirebaseErrorRespond';

//Styles & Images & Icons
import { styles } from '../Styles/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';

//redux 
import { useSelector, useDispatch } from 'react-redux';
import { getListFriend } from '../../redux/actions/request';

//Navigation
import { useNavigation } from '@react-navigation/native';

//helpers
import { setI18nConfig, translate } from '../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';
import { returnAvatarUser } from '../../helpers/UIHandling';

//Components
import Header from '../../components/Header';
import FriendItem from './components/FriendItem';


//Consts
import { Colors } from '../../constansts/color';
import { Dimens } from '../../constansts/dimension';


const ListFriendScreen = () => {
    //State
    const globalUser = useSelector(state => state.globalUser.globalUser);
    const listFriend = useSelector(state => state.request.listFriend);
    const getListFriendLoading = useSelector(state => state.request.getListFriendLoading);


    //Others
    const navigation = useNavigation();
    const dispatch = useDispatch();

    //----------------Effects----------------------
    useEffect(() => {

        dispatch(getListFriend(globalUser._id))

        return () => {
            //Clean sth
        }
    }, []);


    //----------------Functions--------------------
    const renderItem = useCallback(
        ({ item }) => <FriendItem
            key={item.idconnect}
            idconnect={item.idconnect}
            iduser={item.iduser}
            urlavatar={item.urlavatar}
            username={item.username}
            headline={item.headline}
            email={item.email}
        ></FriendItem>
        ,
        []
    );

    const keyExtractor = useCallback(
        item => item.idconnect,
        []
    );


    return (
        <View style={[styles.container, { backgroundColor: 'white' }]}>
            <Header
                screenName="Friend List"
            ></Header>

            {getListFriendLoading ?
                <ActivityIndicator size="large" color={Colors.MainBlue}></ActivityIndicator>
                :
                <FlatList
                    data={listFriend}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    onRefresh={() => dispatch(getListFriend(globalUser._id))}
                    refreshing={getListFriendLoading}
                ></FlatList>
            }


        </View>
    );
}

export default ListFriendScreen;