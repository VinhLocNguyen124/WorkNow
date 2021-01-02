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
import Animated from 'react-native-reanimated';

//Firebase
import auth from '@react-native-firebase/auth';
import { FirebaseErrorRespond } from '../../helpers/FirebaseErrorRespond';

//Styles & Images & Icons
import { styles } from '../Styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

//Navigation
import { useNavigation } from '@react-navigation/native';

//helpers
import { setI18nConfig, translate } from '../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';
import { FitImageDimension } from '../../helpers/FitImageDimension';
import {
    onLaunchImageGallery,
    onLaunchCamera,
    cloudinaryUploadImage
} from '../../helpers/MediaConfig';

//apis
import { fetchData } from '../../apis/apiCaller';

//hooks

//redux & actions
import { useSelector, useDispatch } from 'react-redux';
import { addNewPost } from '../../redux/actions/post';

//Components
import Delayed from './../../components/Delayed';
import FormInput from './../../components/FormInput';
import FormDropDown from './../../components/FormDropDown';
import TextHighLightButton from './../../components/TextHighLightButton';
import Footer from './../../components/Footer';
import Message from './components/Message';

//Consts
import { Colors } from '../../constansts/color';
import { Dimens } from '../../constansts/dimension';

const dataMessage = [
    {
        id: 0,
        message: "You sent a photo ?",
        urlavatar: "https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2019/02/5-create-fake-people-in-2-seconds-on-this-insane-site.jpg",
        date: "2020-12-30T11:53:40.594Z",
        username: "loc",
        idroomchat: "dfdfdfd"
    },
    {
        id: 1,
        message: "Hello! How are you ?",
        urlavatar: "https://res.cloudinary.com/locnguyen-cloud/image/upload/v1608661587/qrojjtwp5fowfxdldlwn.jpg",
        date: "2020-12-29T04:58:20.474Z",
        username: "bao",
        idroomchat: "dfdfdfd"
    },
    {
        id: 2,
        message: "Hello! How are you ? Hello! How are you ? vHello! How are you ? Hello! How are you ?",
        urlavatar: "https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-4.jpg",
        date: "2020-12-23T10:22:13.755Z",
        username: "loc",
        idroomchat: "dfdfdfd"
    },
    {
        id: 3,
        message: "Hello! How are you ?",
        urlavatar: "https://media.npr.org/assets/img/2018/11/21/gettyimages-962142720-3f4af695a639cbc14deb90e88287cd3c19b676f4-s800-c85.jpg",
        date: "2020-12-22T18:26:29.705Z",
        username: "loc",
        idroomchat: "dfdfdfd"
    },
    {
        id: 4,
        message: "Hello! How are you ? Hello! How are you ? Hello! How are you ? Hello! How are you ?",
        urlavatar: "https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-01.jpg",
        date: "2020-12-21T17:50:28.903Z",
        username: "bao",
        idroomchat: "dfdfdfd"
    },
    {
        id: 5,
        message: "Hello! How are you ?",
        urlavatar: "https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-05.jpg",
        date: "2020-12-20T17:47:44.620Z",
        username: "loc",
        idroomchat: "dfdfdfd"
    },
    {
        id: 6,
        message: "Hello! How are you ? Hello! How are you ? vHello! How are you ? Hello! How are you ?",
        urlavatar: "https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-03.jpg",
        date: "2020-12-18T17:47:44.620Z",
        username: "bao",
        idroomchat: "dfdfdfd"
    },
    {
        id: 7,
        message: "Hello! How are you ?",
        urlavatar: "https://images.newscientist.com/wp-content/uploads/2019/09/05110709/ed-bridges-landscape.jpg",
        date: "2020-12-15T17:47:44.620Z",
        username: "bao",
        idroomchat: "dfdfdfd"
    },
    {
        id: 8,
        message: "Hello! How are you ? Hello! How are you ? Hello! How are you ? vHello! How are you ? Hello! How are you ?",
        urlavatar: "https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2019/02/5-create-fake-people-in-2-seconds-on-this-insane-site.jpg",
        date: "2020-12-13T17:47:44.620Z",
        username: "loc",
        idroomchat: "dfdfdfd"
    },
    {
        id: 9,
        message: "Hello! How are you ? Hello! How are you ? vHello! How are you ? Hello! How are you ?",
        urlavatar: "https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-03.jpg",
        date: "2020-12-18T17:47:44.620Z",
        username: "bao",
        idroomchat: "dfdfdfd"
    },
    {
        id: 10,
        message: "Hello! How are you ?",
        urlavatar: "https://images.newscientist.com/wp-content/uploads/2019/09/05110709/ed-bridges-landscape.jpg",
        date: "2020-12-15T17:47:44.620Z",
        username: "bao",
        idroomchat: "dfdfdfd"
    },
    {
        id: 11,
        message: "Hello! How are you ? Hello! How are you ? Hello! How are you ? vHello! How are you ? Hello! How are you ?",
        urlavatar: "https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2019/02/5-create-fake-people-in-2-seconds-on-this-insane-site.jpg",
        date: "2020-12-13T17:47:44.620Z",
        username: "loc",
        idroomchat: "dfdfdfd"
    },
    {
        id: 12,
        message: "Hello! How are you ? Hello! How are you ? Hello! How are you ? vHello! How are you ? Hello! How are you ?",
        urlavatar: "https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2019/02/5-create-fake-people-in-2-seconds-on-this-insane-site.jpg",
        date: "2020-12-13T17:47:44.620Z",
        username: "loc",
        idroomchat: "dfdfdfd"
    },
    {
        id: 13,
        message: "Hello! How are you ? Hello! How are you ? vHello! How are you ? Hello! How are you ?",
        urlavatar: "https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-03.jpg",
        date: "2020-12-18T17:47:44.620Z",
        username: "bao",
        idroomchat: "dfdfdfd"
    },
    {
        id: 14,
        message: "Hello! How are you ?",
        urlavatar: "https://images.newscientist.com/wp-content/uploads/2019/09/05110709/ed-bridges-landscape.jpg",
        date: "2020-12-15T17:47:44.620Z",
        username: "bao",
        idroomchat: "dfdfdfd"
    },
    {
        id: 15,
        message: "Hello! How are you ? Hello! How are you ? Hello! How are you ? vHello! How are you ? Hello! How are you ?",
        urlavatar: "https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2019/02/5-create-fake-people-in-2-seconds-on-this-insane-site.jpg",
        date: "2020-12-13T17:47:44.620Z",
        username: "loc",
        idroomchat: "dfdfdfd"
    },
]


const MessageDetailScreen = () => {
    console.log("render Edit Intro Screen")

    //States
    const province = useSelector(state => state.listChoice.province);
    const city = useSelector(state => state.listChoice.city);
    const uniName = useSelector(state => state.listUni.uniName);
    const path = useSelector(state => state.listChoice.path);

    //others
    const navigation = useNavigation();
    const dispatch = useDispatch();

    //-------------------------Effects-----------------------------------

    useEffect(() => {

        return () => {
            console.log("Edit Intro Screen Unmount");

        }
    }, []);

    //-------------------------Functions---------------------------------
    const renderItem = useCallback(
        ({ item }) => <Message
            key={item.id}
            message={item.message}
            username={item.username}
            date={item.date}
        ></Message>
        ,
        []
    );

    const keyExtractor = useCallback(
        item => item.id.toString(),
        []
    );


    //--------------------------------------------------


    return (
        <View style={styles.container}>
            <View style={{ ...styles.header, justifyContent: 'flex-start', paddingVertical: 5 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Ionicons name="md-arrow-back" size={24} color={Colors.Gray}></Ionicons>
                </TouchableOpacity>

                <Image source={require('../../assets/images/locnguyen.jpg')} style={{ ...styles.avatarSmall, marginLeft: 10, marginRight: 10 }} />
                <View style={{ flexDirection: 'column', width: 200 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Vinh Loc Nguyen</Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ color: Colors.Gray, fontSize: 12 }}
                    >TechLead at SoftTech Vietnam echLead at SoftTech Vietnam</Text>
                </View>
            </View>

            <FlatList
                inverted
                data={dataMessage}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            ></FlatList>

            <View style={{ flexDirection: 'row', margin: 10, backgroundColor: 'transparent', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                    <TouchableOpacity>
                        <FontAwesome name="camera" size={25} color={Colors.Gray}></FontAwesome>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginHorizontal: 10 }}>
                        <FontAwesome name="photo" size={25} color={Colors.Gray}></FontAwesome>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name="paperclip" size={25} color={Colors.Gray}></Feather>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={{
                        flex: 1, height: 35,
                        marginHorizontal: 10, borderWidth: 1, borderColor: Colors.Gray,
                        borderRadius: 15,
                        paddingHorizontal: 10,
                    }}
                    placeholder="Aa"
                ></TextInput>

                <TouchableOpacity>
                    <FontAwesome name="send" size={25} color={Colors.MainBlue}></FontAwesome>
                </TouchableOpacity>
            </View>

            {/* <Delayed wait={1000} noneLoading={false}>
               
                   
            </Delayed> */}


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