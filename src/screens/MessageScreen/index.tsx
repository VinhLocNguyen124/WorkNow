import React, { useCallback, useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ActivityIndicator,
    TextInput,
    FlatList,
} from 'react-native';

//Firebase
import database from '@react-native-firebase/database';
import { FirebaseErrorRespond } from '../../helpers/FirebaseErrorRespond';

//Styles & Images & Icons
import BackGround from './../../assets/images/svg/BackGround';
import { styles } from '../Styles/styles';
import { Paths } from '../../constansts/path';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

//Consts
import { Colors } from '../../constansts/color';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';


const MessageScreen = () => {
    //States
    const globalUser = useSelector(state => state.globalUser.globalUser);
    const [listRoom, setListRoom] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);


    //Others
    const navigation = useNavigation();

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
            })

        return () => {
            database()
                .ref(`/roomchats`)
                .off('value', valueChangeListener);
            isMounted = false;

        }
    }, [])

    //------------------Functions----------------------

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

    return (
        <View style={styles.container}>
            <Header
                screenName="Messaging"
                noneBackButton={true}
            ></Header>

            <SearchBar
                placeholder="Search messages"
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

        </View>
    );
}

export default MessageScreen;