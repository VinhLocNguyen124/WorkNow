import React, { useCallback, useState, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ActivityIndicator,
    TextInput,
    FlatList,
    ToastAndroid,
    Keyboard,
} from 'react-native';

//Firebase
import database from '@react-native-firebase/database';
import { FirebaseErrorRespond } from '../../helpers/FirebaseErrorRespond';

//Styles & Images & Icons
import BackGround from './../../assets/images/svg/BackGround';
import { styles } from '../Styles/styles';
import { Paths } from '../../constansts/path';
import Ionicons from 'react-native-vector-icons/Ionicons';

//api
import { getData } from '../../apis/apiCaller';

//Navigation
import { useNavigation } from '@react-navigation/native';

//helpers
import { setI18nConfig, translate } from '../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';
import { getListRoomChat } from '../../helpers/FirebaseEventHandler';

//Components
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import ItemMessage from './components/ItemMessage';
import Delayed from './../../components/Delayed';
import ItemFriend from './components/ItemFriend'

//Consts
import { Colors } from '../../constansts/color';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { getListFriend, onSearchFriend } from '../../redux/actions/request';


const MessageScreen = () => {
    //States
    const globalUser = useSelector(state => state.globalUser.globalUser);
    const listFriend = useSelector(state => state.request.listFriend);
    const [listRoom, setListRoom] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [showListSearch, setShowListSearch] = useState(false);



    //Others
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const typingTimeout = useRef(null);

    //------------------Effects------------------------
    useEffect(() => {
        let isMounted = true;
        let valueChangeListener;

        setLoading(true);

        valueChangeListener = database()
            .ref(`/roomchats`)
            .on('value', snapshot => {
                getListRoomChat(globalUser._id, (rooms) => {
                    if (isMounted) {
                        setListRoom(rooms);
                        setLoading(false);
                    }
                });
            });

        return () => {
            database()
                .ref(`/roomchats`)
                .off('value', valueChangeListener);
            isMounted = false;

        }
    }, [])

    //------------------Functions----------------------
    const onChangeTextSearch = (text) => {
        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current);
        }

        typingTimeout.current = setTimeout(() => {
            dispatch(onSearchFriend(text, globalUser._id));
        }, 500);

    }

    const onRefresh = () => {
        setRefresh(true);
        getListRoomChat(globalUser._id, (rooms) => {
            setListRoom(rooms);
            console.log("Refresh", rooms);
            setRefresh(false);
        });
    }

    const renderItem = useCallback(
        ({ item }) => <ItemMessage
            key={item._id}
            message={item.message}
            idguess={item.idguess}
            date={item.time}
            unread={item.unread}
            onPress={() => navigation.navigate("MessageDetail", { _idguess: item.idguess })}
        ></ItemMessage>
        ,
        []
    );

    const keyExtractor = useCallback(
        item => item._id,
        []
    );

    const renderItemSearch = useCallback(
        ({ item }) => <ItemFriend
            key={item.idconnect}
            idconnect={item.idconnect}
            iduser={item.iduser}
            urlavatar={item.urlavatar}
            username={item.username}
            headline={item.headline}
            email={item.email}
        ></ItemFriend>
        ,
        []
    );

    const keyExtractorSearch = useCallback(
        item => item.idconnect,
        []
    );

    return (
        <View style={styles.container}>
            <Header
                screenName="Messaging"
                noneBackButton={true}
            ></Header>

            <SearchBar
                placeholder="Find your friends"
                onFocus={() => setShowListSearch(true)}
                onClose={() => {
                    setShowListSearch(false);
                    Keyboard.dismiss();
                }}
                showCloseButton={showListSearch}
                onChangeSearchText={onChangeTextSearch}
            ></SearchBar>

            {
                loading ?
                    <ActivityIndicator size="large" color={Colors.MainBlue}></ActivityIndicator>
                    :
                    <FlatList
                        data={listRoom}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        onRefresh={onRefresh}
                        refreshing={refresh}
                    ></FlatList>
            }

            {
                showListSearch ?
                    <FlatList
                        style={{ position: 'absolute', bottom: 0, right: 0, left: 0, top: 115, backgroundColor: 'white' }}
                        data={listFriend}
                        renderItem={renderItemSearch}
                        keyExtractor={keyExtractorSearch}
                        onRefresh={onRefresh}
                        refreshing={refresh}
                    ></FlatList> : null
            }

        </View>
    );
}

export default MessageScreen;