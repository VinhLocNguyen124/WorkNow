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
import { returnSnapPoints } from '../../helpers/UIHandling';
import DocumentPicker from 'react-native-document-picker';
import PDF from 'react-native-pdf';

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
import { launchImageLibrary } from 'react-native-image-picker';


const PostScreen = () => {
    console.log("render PostScreen")
    //Consts
    const bottomSheetHeight = (dataBottomSheet.length + 2) * 40;

    //States
    const [email, setEmail] = useState("");
    const [displayname, setDisplayName] = useState("");
    const [postContent, setPostContent] = useState("");
    const [response, setResponse] = useState(null);
    const [imageSource, setImageSource] = useState(null);
    const [pdfSource, setPdfSource] = useState(null);
    const waitPost = useSelector(state => state.post.loadingAddNewPost);

    //others
    const sheetRef = React.useRef(null);
    const sheetRefWatchingScope = React.useRef(null);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const waitLoadingTime = 500;

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
        setPostContent("");
        setResponse(null);
        setImageSource(null);
        setPdfSource(null);
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

    const onPickFile = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });

            await setPdfSource(res);
            console.log(
                res.uri,
                res.type, // mime type
                res.name,
                res.size
            );
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    const onPressBottomSheetItem = (lable: string) => {
        // console.log(lable);
        switch (lable) {
            case "Add a pdf file":
                onPickFile();
                break;

            case "Take a photo":
                onOpenCamera();
                break;

            case "Add a photo":
                onOpenImageGallery();
                break;

            default:
                break;
        }

    }

    const onDeletePdfFile = useCallback(() => {
        setPdfSource(null);
    }, []);

    const onDeleteImage = useCallback(() => {
        setResponse(null);
        setImageSource(null);
    }, []);

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

    const closeBottomSheet = () => {
        sheetRef.current.snapTo(6);
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

            <Delayed wait={100}>
                <BottomSheet
                    ref={sheetRef}
                    snapPoints={returnSnapPoints(Dimens.heightScreen, -500)}
                    initialSnap={6}
                    enabledInnerScrolling={false}
                    enabledContentGestureInteraction={false}
                    renderContent={() =>
                    (
                        <BottomSheetList
                            data={dataBottomSheet}
                            onPress={onPressBottomSheetItem}
                            onPressOutside={closeBottomSheet}
                        ></BottomSheetList>
                    )}
                ></BottomSheet>
            </Delayed>

            <Delayed wait={100}>
                <BottomSheet
                    ref={sheetRefWatchingScope}
                    snapPoints={returnSnapPoints(Dimens.heightScreen, -500)}
                    initialSnap={6}
                    enabledInnerScrolling={false}
                    enabledContentGestureInteraction={false}
                    renderContent={() =>
                    (
                        <WatchingScope
                            onPressOutside={closeBottomSheetWatchingScope}
                        ></WatchingScope>
                    )}
                ></BottomSheet>
            </Delayed>

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
                            <Text style={{ fontWeight: '700', fontSize: 15, marginBottom: 5 }}>Nguyen Vinh Loc</Text>

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
                            autoFocus={false}
                            multiline={true}
                            // onFocus={() => { sheetRef.current.snapTo(2) }}
                            numberOfLines={3}
                            onChangeText={text => setPostContent(text)}
                            value={postContent}
                            style={{ fontSize: 15, }}
                            placeholder="What do you want to talk about ?"
                        ></TextInput>



                        {pdfSource && (
                            <View style={{ height: 120, width: '100%', backgroundColor: '#f2f2f2', padding: 5, borderRadius: 5, marginTop: 20, flexDirection: 'row' }}>
                                <PDF
                                    source={{ uri: pdfSource.uri }}
                                    onLoadComplete={(numberOfPages, filePath) => {
                                        console.log(`number of pages: ${numberOfPages}`);
                                    }}
                                    onPageChanged={(page, numberOfPages) => {
                                        console.log(`current page: ${page}`);
                                    }}
                                    onError={(error) => {
                                        console.log(error);
                                    }}
                                    onPressLink={(uri) => {
                                        console.log(`Link press: ${uri}`)
                                    }}
                                    style={{ height: 110, width: 90 }} />
                                <Text style={{ marginLeft: 5, fontWeight: 'bold', flex: 1, marginRight: 5 }}>{pdfSource.name}</Text>

                                <TouchableOpacity style={{}} onPress={onDeletePdfFile}>
                                    <AntDesign name="closecircleo" size={20} color={Colors.Gray} />
                                </TouchableOpacity>
                                <Text style={{ position: 'absolute', bottom: 5, right: 5, color: Colors.Gray, fontSize: 10 }}>{(pdfSource.size / (1024 * 1024)).toFixed(2)} MB</Text>
                            </View>

                        )}

                        {response && (
                            <View style={{}}>
                                <Image
                                    style={{
                                        width: FitImageDimension(response.width, response.height, 'w'),
                                        height: FitImageDimension(response.width, response.height, 'h'),
                                        borderRadius: 10
                                    }}
                                    source={{ uri: response.uri }}
                                />
                                <View style={{ flex: 1, position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 10 }}></View>
                                <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={onDeleteImage}>
                                    <AntDesign name="closecircleo" size={20} color={Colors.LightGray} />
                                </TouchableOpacity>
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