import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    Button,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
    Dimensions,
    StyleSheet,
    LayoutAnimation,
    ScrollView,
    Alert,
    FlatList,
    ToastAndroid,
    ActivityIndicator,
} from 'react-native';

//Firebase
import { FirebaseErrorRespond } from '../../helpers/FirebaseErrorRespond';

//Styles & Images & Icons
import { styles } from '../Styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

//Navigation
import { useNavigation, useRoute } from '@react-navigation/native';

//helpers
import { setI18nConfig, translate } from '../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';
import { FitImageDimension } from '../../helpers/FitImageDimension';
import {
    checkExistingRoom,
    getUserInfo,
    createNewRoomChat,
    loadRoomChatContent,
    insertMessage
} from '../../helpers/FirebaseEventHandler';
import { returnAvatarUser } from '../../helpers/UIHandling';

//hooks

//redux & actions
import { useSelector, useDispatch } from 'react-redux';
import { onTriggerNewMessageNotification } from '../../redux/actions/notification';

//Firebase 
import database from '@react-native-firebase/database';

//Components
import Message from './components/Message';

//Consts
import { Colors } from '../../constansts/color';
import { Dimens } from '../../constansts/dimension';


const MessageDetailScreen = () => {
    console.log("Render Screen")

    //States
    const globalUser = useSelector(state => state.globalUser.globalUser);
    const [loading, setLoading] = useState(false);
    const [sendLoading, setSendLoading] = useState(false);
    const [roomKey, setRoomKey] = useState("");
    const [message, setMessage] = useState("");
    const [user, setUser] = useState({
        "_id": "",
        "urlavatar": "",
        "username": "",
        "headline": "",
        "email": ""
    });
    const [messages, setMessages] = useState([
        // {
        //     "content": "",
        //     "email": "",
        //     "time": "",
        //     "username": ""
        // }
    ])

    //others
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();
    const idguess = route.params._idguess;

    //-------------------------Effects-----------------------------------

    useEffect(() => {
        let valueChangeListener;
        let isMounted = true;

        setLoading(true);

        getUserInfo(idguess).then(data => {

            setUser(data);

            checkExistingRoom(globalUser._id, idguess,
                (key: string) => {
                    //Thực hiện khi id room đã tồn tại
                    if (isMounted) setRoomKey(key);

                    //Bắt sự kiện khi có thay đổi trong room chat
                    valueChangeListener = database()
                        .ref(`/roomchats/${key}`)
                        .on('value', snapshot => {
                            //Có thay đổi thì tải lại
                            loadRoomChatContent(key, (data) => {
                                if (isMounted) {
                                    setMessages(data);
                                    setLoading(false);
                                }
                            })
                        });

                },
                () => {
                    const key = globalUser._id + "_" + idguess;

                    //Thực hiện khi chưa có id room 
                    createNewRoomChat(globalUser._id, idguess);
                    if (isMounted) setRoomKey(key);

                    //Bắt sự kiện khi có thay đổi trong room chat
                    valueChangeListener = database()
                        .ref(`/roomchats/${key}`)
                        .on('value', snapshot => {
                            loadRoomChatContent(key, (data) => {
                                if (isMounted) {
                                    setMessages(data);
                                    setLoading(false);
                                }
                            })
                        });

                });
        })

        return () => {
            //Clear bát sự kiện thay đổi khi unmount màn hình
            database()
                .ref(`/roomchats/${roomKey}`)
                .off('value', valueChangeListener);
            isMounted = false
        }

    }, []);

    //-------------------------Functions---------------------------------

    const onPressCamera = () => {

    }

    const onPressPicture = () => {

    }

    const onSeenMessage = () => {
        database()
            .ref("/roomchats/" + roomKey)
            .update({
                unread: false
            })
    }

    const onPressButtonSend = () => {
        setSendLoading(true);
        insertMessage(message, roomKey, globalUser, () => {
            setSendLoading(false);
            setMessage("");
        });
        dispatch(onTriggerNewMessageNotification(roomKey, message, globalUser._id, globalUser.username, globalUser.urlavatar, messages[0].time.toString()))
    }

    const renderItem = useCallback(
        ({ item }) => <Message
            key={item.time}
            content={item.content}
            username={item.username}
            time={item.time}
            email={item.email}
            urlavatar={item.urlavatar}
            roomKey={roomKey}
        ></Message>
        ,
        []
    );

    const keyExtractor = useCallback(
        item => item.time.toString(),
        []
    );
    //--------------------------------------------------
    return (
        <View style={styles.container}>
            <View style={{ ...styles.header, justifyContent: 'flex-start', paddingVertical: 5 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Ionicons name="md-arrow-back" size={24} color={Colors.Gray}></Ionicons>
                </TouchableOpacity>

                <Image source={{ uri: returnAvatarUser(user.urlavatar) }} style={{ ...styles.avatarSmall, marginLeft: 10, marginRight: 10 }} />
                <View style={{ flexDirection: 'column', width: 200 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{user.username}</Text>
                    {user.headline ? <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ color: Colors.Gray, fontSize: 12 }}
                    >{user.headline}</Text> : null}
                </View>
            </View>

            {loading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={Colors.MainBlue}></ActivityIndicator>
                </View>

                :
                <FlatList
                    inverted
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                ></FlatList>
            }


            <View style={{ flexDirection: 'row', margin: 10, backgroundColor: 'transparent', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                    <TouchableOpacity onPress={onPressCamera}>
                        <FontAwesome name="camera" size={25} color={Colors.Gray}></FontAwesome>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={onPressPicture}>
                        <FontAwesome name="photo" size={25} color={Colors.Gray}></FontAwesome>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={{
                        flex: 1, height: 40,
                        marginHorizontal: 10, borderWidth: 1, borderColor: Colors.Gray,
                        borderRadius: 15,
                        paddingHorizontal: 10,
                    }}
                    placeholder="Aa"
                    onChangeText={txt => setMessage(txt)}
                    onFocus={onSeenMessage}
                    value={message}
                ></TextInput>

                <TouchableOpacity onPress={onPressButtonSend} >
                    {sendLoading ?
                        <ActivityIndicator size="small" color={Colors.MainBlue}></ActivityIndicator>
                        :
                        <FontAwesome name="send" size={25} color={Colors.MainBlue}></FontAwesome>
                    }
                </TouchableOpacity>
            </View>
        </View>
    );
}

const tempStyles = StyleSheet.create({
    ei_text_header_btn: {
        fontWeight: 'bold',
        color: Colors.Gray
    },
});

export default MessageDetailScreen;