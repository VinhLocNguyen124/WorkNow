import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    Switch,
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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

//redux & actions
import { useSelector, useDispatch } from 'react-redux';
import { onSelectProvince, onSelectCity } from '../../redux/actions/listChoice';
import { onUpdateUser } from '../../redux/actions/globalUser';

//Components
import Delayed from './../../components/Delayed';
import FormInput from './../../components/FormInput';
import FormDropDown from './../../components/FormDropDown';
import TextHighLightButton from './../../components/TextHighLightButton';
import Footer from './../../components/Footer';
// import { Switch } from 'native-base';

//Consts
import { Colors } from '../../constansts/color';
import { Dimens } from '../../constansts/dimension';


const EditIntroScreen = () => {

    //States
    const globalUser = useSelector(state => state.globalUser.globalUser);
    const [urlAvatar, setUrlAvatar] = useState(globalUser.urlavatar);
    const [userName, setUserName] = useState(globalUser.username);
    const [headline, setHeadline] = useState(globalUser.headline);
    const [phone, setPhone] = useState(globalUser.phone);
    const [underwork, setUnderwork] = useState(globalUser.underwork);
    const province = useSelector(state => state.listChoice.province);
    const city = useSelector(state => state.listChoice.city);
    const [imageSource, setImageSource] = useState(null);
    const updateLoaing = useSelector(state => state.globalUser.updateLoading);
    const updateError = useSelector(state => state.globalUser.error);

    //not sure
    const path = useSelector(state => state.listChoice.path);

    //others
    const navigation = useNavigation();
    const dispatch = useDispatch();

    //------------------------Effects-----------------------------------
    useEffect(() => {

        dispatch(onSelectProvince(globalUser.province, globalUser.path));
        dispatch(onSelectCity(globalUser.city));

        return () => {
            console.log("Edit Intro Screen Unmount");
        }
    }, []);
    //-------------------------Functions---------------------------------

    const onPressSaveIntro = () => {
        const user = {
            //Không cập nhật QRcode ở đây
            username: userName,
            email: globalUser.email,
            urlavatar: globalUser.urlavatar,
            phone: phone,
            province: province,
            city: city,
            headline: headline,
            underwork: underwork,
            path: path,
        }
        dispatch(onUpdateUser(user, imageSource));
    }

    const onPressEditAvatar = () => {
        onLaunchImageGallery((source, response) => {
            setImageSource(source);
        })
    }

    //--------------------------------------------------
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="md-arrow-back" size={24} color={Colors.Gray}></Ionicons>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit introduction</Text>
                <TouchableOpacity style={{ width: 35 }} onPress={onPressSaveIntro}>
                    {updateLoaing ?
                        <ActivityIndicator color={Colors.MainBlue} />
                        :
                        <Text style={tempStyles.ei_text_header_btn}>Save</Text>
                    }
                </TouchableOpacity>
            </View>

            <Delayed wait={1000} noneLoading={false}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ marginHorizontal: 0, paddingHorizontal: 10, paddingVertical: 10 }}
                >
                    <Text style={{ fontWeight: 'bold', fontSize: 16, alignSelf: 'center', }}>Profile photo</Text>

                    <View style={{
                        height: 100,
                        width: 100, alignSelf: 'center',
                        marginTop: 10,
                    }}>

                        {imageSource ?
                            <Image
                                source={{ uri: imageSource.uri }}
                                style={{
                                    height: 100,
                                    width: 100,
                                    borderRadius: 50,
                                }}
                            ></Image>
                            :
                            urlAvatar === "" ?
                                <View style={{
                                    height: 100,
                                    width: 100,
                                    borderRadius: 50,
                                    borderWidth: 3,
                                    borderColor: Colors.LightGray,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <FontAwesome5 name="user-check" size={45} color={Colors.Gray}></FontAwesome5>
                                </View>
                                :
                                <Image
                                    source={{ uri: urlAvatar }}
                                    style={{
                                        height: 100,
                                        width: 100,
                                        borderRadius: 50,
                                    }}
                                ></Image>
                        }
                        <TouchableOpacity style={{
                            backgroundColor: 'white', borderRadius: 20,
                            borderWidth: 1, borderColor: Colors.Gray,
                            elevation: 5, width: 25, height: 25,
                            position: 'absolute', bottom: 0, right: 0,
                            justifyContent: 'center', alignItems: 'center'
                        }} onPress={onPressEditAvatar}>
                            <FontAwesome name="pencil" size={16} color={Colors.Gray}></FontAwesome>
                        </TouchableOpacity>
                    </View>

                    {/* title, onChangeText, value, style */}
                    <FormInput
                        title="User name"
                        style={{ marginTop: 20 }}
                        value={userName}
                        onChangeText={text => setUserName(text)}
                    ></FormInput>
                    <FormInput
                        title="Headline"
                        style={{ marginTop: 20 }}
                        value={headline}
                        onChangeText={text => setHeadline(text)}
                    ></FormInput>

                    <FormInput
                        title="Phone number"
                        style={{ marginTop: 20 }}
                        value={phone}
                        onChangeText={text => setPhone(text)}
                    ></FormInput>

                    <View style={tempStyles.ws_view3}>
                        <View style={tempStyles.ws_view4}>
                            <Text style={styles.normalTitle}>Employment status</Text>
                            <Text style={styles.text}>{underwork ? 'Still have no job' : 'Already have a job'}</Text>
                        </View>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff6E" }}
                            thumbColor={underwork ? Colors.MainBlue : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => setUnderwork(!underwork)}
                            value={underwork} />
                    </View>


                    <TextHighLightButton
                        highLightText="____________________________________________"
                        style={{ marginTop: 20, alignSelf: 'flex-end' }}
                    ></TextHighLightButton>

                    <FormDropDown
                        title="Province"
                        value={province}
                        style={{ marginTop: 20 }}
                        param="province"
                        onPress={(param) => navigation.navigate('ListChoice', { title: param })}
                    ></FormDropDown>

                    <FormDropDown
                        title="City/District"
                        value={city}
                        style={{ marginTop: 20 }}
                        param="city/district"
                        onPress={(param) => {
                            if (path !== '') {
                                navigation.navigate('ListChoice', { title: param })
                            } else {
                                ToastAndroid.show("Please select province before selecting city/district", ToastAndroid.SHORT);
                            }
                        }}
                    ></FormDropDown>

                    <FormDropDown
                        title="Industry"
                        value="Information Technology & Service"
                        style={{ marginTop: 20 }}
                        param="industry"
                        onPress={(param) => console.log(param)}
                    ></FormDropDown>

                    {/* Footer  */}
                    <Footer></Footer>

                </ScrollView>
            </Delayed>
        </View>
    );
}

const tempStyles = StyleSheet.create({
    ei_text_header_btn: {
        fontWeight: 'bold',
        color: Colors.Gray
    },
    ws_view3: {
        flexDirection: 'row', marginTop: 20,
    },
    ws_view4: {
        flexDirection: 'column', alignItems: 'flex-start', flex: 1
    },
});

export default EditIntroScreen;