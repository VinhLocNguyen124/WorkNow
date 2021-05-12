import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    ActivityIndicator,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    Modal,
    ScrollView,
} from 'react-native';

//Styles & Images & Icons
import { styles } from '../../Styles/styles';
import { tempStyles } from '../../HomeScreen/Styles/index';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//helpers
import { setI18nConfig, translate } from '../../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';
import { onLaunchCamera, onLaunchImageGallery } from '../../../helpers/MediaConfig';
import { FitImageDimension } from '../../../helpers/FitImageDimension';

//Components
import MainButton from '../../../components/MainButton';

//Consts
import { Colors } from '../../../constansts/color';
import { Dimens } from '../../../constansts/dimension';
import PropTypes from 'prop-types';

//redux & actions
import { useSelector, useDispatch } from 'react-redux';
import { updatePost } from '../../../redux/actions/post';

//Navigation
import { useNavigation } from '@react-navigation/native';

const EditPostModal = (props) => {

    //Props
    const { visible, onPressClose, idpost, formal, imgurl, content, email } = props;

    //States
    const globalUser = useSelector(state => state.globalUser.globalUser);
    const loadingUpdatePost = useSelector(state => state.post.loadingUpdatePost);
    const [response, setResponse] = useState(null);
    const [imageSource, setImageSource] = useState(null);
    const [urlImage, setUrlImage] = useState("");
    const [contentPost, setContentPost] = useState("");

    //Others
    const dispatch = useDispatch();
    const navigation = useNavigation();

    //-----------------------------------Effects-----------------------------------------
    useEffect(() => {
        setContentPost(content);
        setUrlImage(imgurl);

        return () => {

        }
    }, []);

    //-----------------------------------Functions---------------------------------------
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
        });
    }

    const onDeleteImage = () => {
        setImageSource(null);
        setResponse(null);
        setUrlImage("");
    }

    const onUpdatePost = () => {
        dispatch(updatePost(idpost, contentPost, urlImage, imageSource, email));
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ ...tempStyles.pi_all_container, justifyContent: 'center', alignItems: 'center' }}>

                <View style={{
                    maxHeight: Dimens.heightScreen / 1.5,
                    width: '100%',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    backgroundColor: 'white',
                }}>

                    <ScrollView style={{ marginVertical: 10 }}>
                        <TextInput
                            style={{
                                flex: 1,
                                fontSize: 14,
                                padding: 5,
                                marginTop: 5,
                                backgroundColor: 'white',
                            }}
                            multiline={true}
                            placeholder="Bạn đang nghỉ gì? ..."
                            onChangeText={text => setContentPost(text)}
                            // autoFocus={editMode}
                            // onBlur={() => setEditMode(false)}
                            value={contentPost}
                        ></TextInput>

                        {response && (
                            <View style={{ marginTop: 10 }}>
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

                        {
                            urlImage ? <View style={{ marginTop: 10 }}>
                                <Image
                                    style={{
                                        width: Dimens.retangleImageFitScreen.width,
                                        height: Dimens.retangleImageFitScreen.height,
                                        borderRadius: 10
                                    }}
                                    source={{ uri: urlImage }}
                                />
                                <View style={{ flex: 1, position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 10 }}></View>
                                <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={onDeleteImage}>
                                    <AntDesign name="closecircleo" size={20} color={Colors.LightGray} />
                                </TouchableOpacity>
                            </View> : null
                        }

                        {
                            urlImage || response ? null : <View style={{
                                flexDirection: 'row', justifyContent: 'center',
                                borderWidth: 1, borderColor: Colors.Gray, borderStyle: 'dashed', borderRadius: 3,
                                padding: 5, marginTop: 20
                            }}>
                                <TouchableOpacity onPress={onOpenCamera}>
                                    <FontAwesome name="camera" size={30} color={Colors.Gray}></FontAwesome>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={onOpenImageGallery}>
                                    <FontAwesome name="photo" size={30} color={Colors.Gray}></FontAwesome>
                                </TouchableOpacity>
                            </View>
                        }
                    </ScrollView>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <TouchableOpacity style={{
                            backgroundColor: Colors.DeepSkyBlue,
                            borderRadius: 4,
                            width: 100,
                            paddingVertical: 5,
                            alignItems: 'center'
                        }} onPress={onUpdatePost}>
                            {
                                loadingUpdatePost ? <ActivityIndicator
                                    size="small" color={'white'}></ActivityIndicator>
                                    :
                                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>Save</Text>
                            }

                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            backgroundColor: Colors.Gray,
                            width: 100,
                            borderRadius: 4,
                            paddingVertical: 5,
                            alignItems: 'center'
                        }} onPress={onPressClose}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </KeyboardAvoidingView>
        </Modal>

    );
}

EditPostModal.propTypes = ({
    visible: PropTypes.bool,
    idpost: PropTypes.string,
    formal: PropTypes.bool,
    imgurl: PropTypes.string,
    content: PropTypes.string,
    email: PropTypes.string,
    onPressClose: PropTypes.func
});

EditPostModal.defaultProps = ({

});

export default React.memo(EditPostModal);