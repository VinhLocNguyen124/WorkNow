import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
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
import BottomSheet from 'reanimated-bottom-sheet';
import BottomSheetList from './Components/BottomSheetList';
import WatchingScope from './Components/WatchingScope';
import Delayed from './../../components/Delayed';

//Consts
import { Colors } from '../../constansts/color';
import { Dimens } from '../../constansts/dimension';
import { dataBottomSheet } from '../../constansts/postDataBottomSheet';
import { URLs } from '../../constansts/url';
import { isConstructorDeclaration } from 'typescript';


const PostScreen = () => {
    console.log("render PostScreen")
    //Consts
    const bottomSheetHeight = (dataBottomSheet.length + 2) * 40;

    //States
    const [email, setEmail] = useState("");
    const [displayname, setDisplayName] = useState("");
    const [postContent, setPostContent] = useState("");
    const [photo, setPhoto] = useState("");
    const [response, setResponse] = useState(null);
    const [imageSource, setImageSource] = useState(null);
    const waitPost = useSelector(state => state.post.loadingAddNewPost);

    //others
    const sheetRef = React.useRef(null);
    const sheetRefWatchingScope = React.useRef(null);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const waitLoadingTime = 100;

    //-------------------------Effects-----------------------------------

    useEffect(() => {
        const { email, displayName } = auth().currentUser;
        setEmail(email);
        setDisplayName(displayName);

        return () => {
            console.log("Post Screen Unmount");
            clearState();
        }
    }, []);

    //-------------------------Functions---------------------------------

    const clearState = () => {
        setPhoto("");
        setPostContent("");
        setResponse(null);
        setImageSource(null);
    }

    const onOpenImageGallery = () => {
        onLaunchImageGallery((source, response) => {
            setResponse(response);
            setImageSource(source);
        });
    }

    const onOpenCamera = () => {
        onLaunchCamera((source, response) => {
            setResponse(response);
            setImageSource(source);
        })
    }

    const onPressPostContent = () => {

        const post = {
            emailuser: email,
            idpostshare: "",
            content: postContent,
            imgurl: "",
            seescope: "anyone",
            allowcmt: "yes"
        }

        dispatch(addNewPost(post, imageSource, navigation));

    }

    //--------------------------------------------------
    const openBottomSheet = async () => {
        await Keyboard.dismiss();
        await sheetRef.current.snapTo(0);
    }

    const openBottomSheetWatchingScope = async () => {
        await Keyboard.dismiss();

        await sheetRefWatchingScope.current.snapTo(0);

    }

    const closeBottomSheetWatchingScope = () => {
        sheetRefWatchingScope.current.snapTo(6);
    }

    const returnSnapPoints = (height: number) => {
        return [height, height - 10, height - 20, height - 30, height - 40, height - 50, -500]
    }

    const onPressBottomSheetItem = (lable: string) => {
        console.log(lable);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('BottomTabs')}>
                    <Ionicons name="md-arrow-back" size={24} color={Colors.Gray}></Ionicons>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Share post</Text>
                <TouchableOpacity style={{ width: 35 }} onPress={onPressPostContent}>
                    {waitPost ?
                        <ActivityIndicator color={Colors.MainBlue} />
                        :
                        <Text style={tempStyles.ps_text_header_btn}>Post</Text>
                    }
                </TouchableOpacity>
            </View>

            {/* inputContainer  */}
            <Delayed wait={waitLoadingTime}>
                <View style={{
                    flex: 1,
                    margin: 20,
                    flexDirection: 'column',
                    backgroundColor: 'transparent',
                }}>

                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Image source={require('../../assets/images/locnguyen.jpg')} style={styles.avatar} />
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Text style={{ fontWeight: '700', fontSize: 15, marginBottom: 5 }}>Vinh Loc Nguyen</Text>

                            <TouchableOpacity style={tempStyles.ps_watching_scope_btn}
                                onPress={openBottomSheetWatchingScope}>
                                <Ionicons name="earth" size={15} color={Colors.Gray}></Ionicons>
                                <Text style={tempStyles.ps_text_watching_scope}>Anyone</Text>
                                <AntDesign name="caretdown" size={13} color={Colors.Gray} ></AntDesign>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <ScrollView style={{ marginHorizontal: 0 }} showsVerticalScrollIndicator={false}>
                        <TextInput
                            autoFocus={true}
                            multiline={true}
                            // onFocus={() => { sheetRef.current.snapTo(2) }}
                            numberOfLines={3}
                            onChangeText={text => setPostContent(text)}
                            value={postContent}
                            style={{ fontSize: 15, backgroundColor: 'transparent' }}
                            placeholder="What do you want to talk about ?"
                        ></TextInput>

                        {response && (
                            <View style={tempStyles.image}>
                                <Image
                                    style={{
                                        width: FitImageDimension(response.width, response.height, 'w'),
                                        height: FitImageDimension(response.width, response.height, 'h')
                                    }}
                                    source={{ uri: response.uri }}
                                />
                            </View>
                        )}

                    </ScrollView>


                </View>
            </Delayed>

            <Delayed wait={waitLoadingTime} noneLoading={false}>
                <View style={{ flexDirection: 'column', marginHorizontal: 20, marginBottom: 10 }}>
                    <TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', color: Colors.MainBlue, }}># Add hashtag</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 1 }}>
                            <TouchableOpacity onPress={onOpenCamera}>
                                <FontAwesome name="camera" size={25} color={Colors.Gray}></FontAwesome>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginHorizontal: 20 }} onPress={onOpenImageGallery}>
                                <FontAwesome name="photo" size={25} color={Colors.Gray}></FontAwesome>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={openBottomSheet}>
                                <Feather name="more-horizontal" size={25} color={Colors.Gray}></Feather>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                            <FontAwesome name="at" size={25} color={Colors.Gray}></FontAwesome>
                        </TouchableOpacity>
                    </View>

                </View>
            </Delayed>



            <Delayed wait={waitLoadingTime}>
                <BottomSheet
                    ref={sheetRef}
                    snapPoints={returnSnapPoints(bottomSheetHeight)}
                    initialSnap={6}
                    enabledInnerScrolling={false}
                    renderContent={() =>
                        (
                            <BottomSheetList
                                data={dataBottomSheet}
                                onPress={onPressBottomSheetItem}
                            ></BottomSheetList>
                        )}
                ></BottomSheet>
            </Delayed>

            <Delayed wait={waitLoadingTime}>
                <BottomSheet
                    ref={sheetRefWatchingScope}
                    snapPoints={returnSnapPoints(Dimens.heightScreen)}
                    initialSnap={6}
                    enabledInnerScrolling={false}
                    renderContent={() =>
                        (
                            <WatchingScope
                                onPressOutside={closeBottomSheetWatchingScope}
                            ></WatchingScope>
                        )}
                ></BottomSheet>
            </Delayed>




        </View>
    );
}

const tempStyles = StyleSheet.create({
    ps_text_header_btn: {
        fontWeight: 'bold',
        color: Colors.Gray
    },
    ps_watching_scope_btn: {
        flexDirection: 'row',
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderColor: Colors.Gray,
        borderRadius: 15,
        paddingBottom: 2,
        paddingHorizontal: 5
    },
    ps_text_watching_scope: {
        fontSize: 13,
        fontWeight: '700',
        color: Colors.Gray,
        marginHorizontal: 5
    },
    response: {
        marginVertical: 16,
        marginHorizontal: 8,
    },
    image: {
        marginVertical: 0,
        alignItems: 'center',
    },
});

export default PostScreen;