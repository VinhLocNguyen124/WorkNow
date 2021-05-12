import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    TouchableNativeFeedback,
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

//redux
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications, reloadNotification, deleteAllNotification, deleteOneNotification, markAllAsReadNotification } from '../../redux/actions/notification';

//Components
import Header from '../../components/Header';
import ItemNotification from './components/ItemNotification';
import SwipeableRow from './components/SwipeableRow';

//Consts
import { Colors } from '../../constansts/color';
import { Picker } from 'native-base';
import { Dimens } from '../../constansts/dimension';

const dropdownContent = [
    {
        id: "0",
        content: "Mark all as read"
    },
    {
        id: "1",
        content: "Delete all notifications"
    }

]


const NotificationScreen = () => {

    //States
    const globalUser = useSelector(state => state.globalUser.globalUser);
    const notifications = useSelector(state => state.notification.notifications);
    const loadingGetNotification = useSelector(state => state.notification.loadingGetNotification);
    const loadingDeleteAll = useSelector(state => state.notification.loadingDeleteAll);
    const loadingDeleteOne = useSelector(state => state.notification.loadingDeleteOne);
    const loadingMarkAsRead = useSelector(state => state.notification.loadingMarkAsRead);
    const [showDropdown, setShowDropdown] = useState(false);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    //Effects

    useEffect(() => {
        let valueChangeListener;

        dispatch(getNotifications(globalUser._id));

        valueChangeListener = database()
            .ref(`/notifications/${globalUser.email.replace(".", "")}`)
            .on('value', snapshot => {
                dispatch(reloadNotification(globalUser._id));
            });

        return () => {
            database()
                .ref(`/notifications/${globalUser.email.replace(".", "")}`)
                .off('value', valueChangeListener);
        }
    }, []);

    //--------------------------Funtions----------------------------
    const onSelectDropdownItem = (value: string) => {
        switch (value) {
            case "0":
                //On select Mark all as read
                dispatch(markAllAsReadNotification(globalUser._id));
                setShowDropdown(false);
                break;
            case "1":
                //On select Delete all
                dispatch(deleteAllNotification(globalUser._id));
                setShowDropdown(false);
                break;

            default:
                break;
        }
    }

    const onRefresh = () => {
        dispatch(getNotifications(globalUser._id));
    }

    const renderItem = useCallback(
        ({ item, index }) => <SwipeableRow
            key={item._id}
            onDeleteNoti={() => dispatch(deleteOneNotification(item._id, globalUser._id))}
        >
            <ItemNotification
                id={item._id}
                type={item.type}
                avatarurl={item.urlavatar}
                idpost={item.idpost}
                idrequest={item.idrequest}
                idrequirement={item.idrequirement}
                content={item.content}
                username={item.username}
                date={item.date}
                read={item.read}
            ></ItemNotification>
        </SwipeableRow>
        ,
        []
    );

    const keyExtractor = useCallback(
        item => item._id,
        []
    );

    const renderItemDropdown = useCallback(
        ({ item, index }) => <TouchableNativeFeedback key={item.id} onPress={() => onSelectDropdownItem(item.id)}>
            <View>
                <Text
                    style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: Colors.LightGray, borderLeftColor: Colors.LightGray, borderLeftWidth: 1 }}
                >{item.content}</Text>
            </View>
        </TouchableNativeFeedback>
        , []);

    const keyExtractorDropdown = useCallback(
        item => item.id,
        []
    );

    return (
        <View style={styles.container}>

            {/* Header  */}
            <View style={styles.header}>
                <View style={{ width: 24 }}></View>

                <Text style={styles.headerTitle}>Notifications</Text>

                {
                    loadingDeleteAll || loadingDeleteOne || loadingMarkAsRead ?
                        <ActivityIndicator size="small" color={Colors.MainBlue}></ActivityIndicator>
                        :
                        <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)} >
                            <Ionicons name="ellipsis-vertical" size={20} color={Colors.Gray}></Ionicons>
                        </TouchableOpacity>
                }

            </View>

            {
                loadingGetNotification ?
                    <ActivityIndicator size={"large"} color={Colors.MainBlue}></ActivityIndicator>
                    :
                    <FlatList
                        ItemSeparatorComponent={() => <View style={{ backgroundColor: Colors.LightGray, height: 2 }}></View>}
                        data={notifications}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        onRefresh={onRefresh}
                        refreshing={loadingGetNotification}
                    ></FlatList>
            }

            {
                showDropdown ?
                    <FlatList
                        style={{ position: 'absolute', top: 50, right: 0, width: Dimens.widthScreen * 0.6, backgroundColor: 'white' }}
                        data={dropdownContent}
                        renderItem={renderItemDropdown}
                        keyExtractor={keyExtractorDropdown}
                    ></FlatList>
                    : null
            }

        </View>
    );
}

export default NotificationScreen;