import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Modal,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

//Styles & Images & Icons
import { styles } from '../Styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

//helpers
import { setI18nConfig, translate } from '../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';
import { knuth_shuffle } from '../../helpers/Algorithm';

//redux & actions
import { useSelector, useDispatch } from 'react-redux';
import { getListPost, } from '../../redux/actions/post';
import { getUserAndSetToGobal } from '../../redux/actions/globalUser';
import { handleMessageBadge, handleNotificationBadge } from '../../redux/actions/badge';

//hooks

//Components
import PostItem from '../HomeScreen/components/PostItem';
import Skeleton from '../../components/Skeleton';

//Consts
import { Colors } from '../../constansts/color';
import { URLs } from '../../constansts/url';
import { fetchData, getData } from '../../apis/apiCaller';

const HomeScreen = () => {
    const { email, displayName } = auth().currentUser;

    //States
    const screenLoading = useSelector(state => state.post.loading);
    const postData = useSelector(state => state.post.listPost);

    //Others
    const dispatch = useDispatch();
    const navigation = useNavigation();

    //-----------------------Effects-----------------------------------
    useEffect(() => {
        let valueChatChangeListener;
        let valueNotiChangeListener;

        dispatch(getUserAndSetToGobal(email));
        dispatch(getListPost(email));

        //Lắng nghe thay đổi và cập nhật badge message
        valueChatChangeListener = database()
            .ref(`/roomchats`)
            .on('value', snapshot => {
                dispatch(handleMessageBadge(email));
            });

        //Firebase path không chứa các kí tự ".","#","$","[","]"
        //Loại bỏ kí tự "." khỏi email
        valueNotiChangeListener = database()
            .ref(`/notifications/${email.replace(".", "")}`)
            .on('value', snapshot => {
                dispatch(handleNotificationBadge(email));
            });

        return () => {
            database()
                .ref(`/roomchats`)
                .off('value', valueChatChangeListener);
            database()
                .ref(`/notifications/${email.replace(".", "")}`)
                .off('value', valueNotiChangeListener);
        }

    }, []);

    //-----------------------Functions---------------------------------

    const refreshListPost = () => {
        dispatch(getListPost(email));
    }

    const onPressScanQRCode = () => {

    }

    function mergeDedupe(arr) {
        return [...new Set([].concat(...arr))];
    }

    const renderItem = useCallback(
        ({ item }) => <PostItem
            key={item._id}
            _id={item._id}
            emailuser={item.emailuser}
            iduser={item.iduser}
            idpostshare={item.idpostshare}
            postshare={item.postshare}
            imgurl={item.imgurl}
            pdfurl={item.pdfurl}
            textcontent={item.content}
            date={item.date}
            seescope={item.seescope}
            allowcmt={item.allowcmt}
            formal={item.formal}
            urlavatar={item.urlavatar}
            username={item.username}
            headline={item.headline}
            liked={item.liked}
            likenumber={item.likenumber}
            cmtnumber={item.cmtnumber}
            recommend={item.recommend}
        ></PostItem>
        ,
        []
    );

    const keyExtractor = useCallback(
        item => item._id,
        []
    );

    return (
        <View style={[styles.container, { backgroundColor: Colors.LightGray }]}>
            {/*  Header  */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons name="menu-sharp" size={30} color={Colors.Gray}></Ionicons>
                </TouchableOpacity>
                <View style={tempStyles.search_bar_container}>
                    <Ionicons name="search" size={18} color={'black'} />
                    <TextInput
                        style={tempStyles.input_search_bar}
                        autoCapitalize="none"
                        placeholder="Search"
                    // onChangeText={onChangeText}
                    // value={value}
                    ></TextInput>
                </View>
                <TouchableOpacity onPress={onPressScanQRCode}>
                    <Ionicons name="qr-code-sharp" size={25} color={Colors.Gray}></Ionicons>
                </TouchableOpacity>

            </View>
            {/* NewsFeed */}
            {screenLoading ?
                <View style={{ flex: 1, width: '100%', marginTop: 10 }}>
                    <Skeleton></Skeleton>
                </View>
                :
                <FlatList
                    ItemSeparatorComponent={() => <View style={{ backgroundColor: Colors.LightGray, height: 5 }}></View>}
                    data={postData}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    maxToRenderPerBatch={5}
                    windowSize={5}
                    onRefresh={refreshListPost}
                    refreshing={screenLoading}
                ></FlatList>

            }
        </View>
    );
}


const tempStyles = StyleSheet.create({
    search_bar_container: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: Colors.Cyan,
        height: 35,
        alignItems: 'center',
        paddingHorizontal: 5,
        borderRadius: 5,
        marginHorizontal: 10
    },
    input_search_bar: {
        color: Colors.Gray,
        fontSize: 11,
        marginLeft: 5,
        flex: 1,
        textAlignVertical: 'center'
    },
});

export default HomeScreen;