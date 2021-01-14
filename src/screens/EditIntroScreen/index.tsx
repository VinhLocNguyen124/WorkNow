import React, { useState, useEffect } from 'react';
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

//Consts
import { Colors } from '../../constansts/color';
import { Dimens } from '../../constansts/dimension';


const EditIntroScreen = () => {
    console.log("render Edit Intro Screen")
    //States
    const province = useSelector(state => state.listChoice.province);
    const city = useSelector(state => state.listChoice.city);
    const uniName = useSelector(state => state.listUni.uniName);
    const path = useSelector(state => state.listChoice.path);

    //others
    const navigation = useNavigation();
    const dispatch = useDispatch();

    //------------------------Effects-----------------------------------
    useEffect(() => {

        return () => {
            console.log("Edit Intro Screen Unmount");

        }
    }, []);
    //-------------------------Functions---------------------------------
    const onPressSaveIntro = () => {
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
                    {false ?
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
                        <Image
                            source={require('../../assets/images/billgate.jpeg')}
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 50,
                            }}
                        ></Image>
                        <TouchableOpacity style={{
                            backgroundColor: 'white', borderRadius: 20,
                            borderWidth: 1, borderColor: Colors.Gray,
                            elevation: 5, width: 25, height: 25,
                            position: 'absolute', bottom: 0, right: 0,
                            justifyContent: 'center', alignItems: 'center'
                        }} onPress={() => console.log("")}>
                            <FontAwesome name="pencil" size={16} color={Colors.Gray}></FontAwesome>
                        </TouchableOpacity>
                    </View>

                    {/* title, onChangeText, value, style */}
                    <FormInput
                        title="User name"
                        style={{ marginTop: 20 }}
                    ></FormInput>
                    <FormInput
                        title="Headline"
                        style={{ marginTop: 20 }}
                    ></FormInput>

                    <FormDropDown
                        title="Education"
                        value={uniName}
                        style={{ marginTop: 20 }}
                        param="university"
                        onPress={(param) => navigation.navigate('ListUni')}
                    ></FormDropDown>

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
});

export default EditIntroScreen;