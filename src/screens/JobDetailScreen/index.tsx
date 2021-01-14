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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


//Navigation
import { useNavigation, useRoute } from '@react-navigation/native';

//helpers
import { setI18nConfig, translate } from '../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';
import { FitImageDimension } from '../../helpers/FitImageDimension';
import {
    onLaunchImageGallery,
    onLaunchCamera,
    cloudinaryUploadImage
} from '../../helpers/MediaConfig';

//hooks

//redux & actions
import { useSelector, useDispatch } from 'react-redux';
import { getListProvince, onSelectProvince, getListCityOrDistrict, onSelectCity } from '../../redux/actions/listChoice';

//Components
import Delayed from './../../components/Delayed';
import FormInput from './../../components/FormInput';
import FormDropDown from './../../components/FormDropDown';
import TextHighLightButton from './../../components/TextHighLightButton';
import Footer from './../../components/Footer';
import Header from './../../components/Header';
import AddSkillModal from './../ListSkillScreen/components/AddSkillModal';
import ItemListSkill from './../ListSkillScreen/components/ItemListSkill';
import EditSkillModal from './../ListSkillScreen/components/EditSkillModal';

//Consts
import { Colors } from '../../constansts/color';
import { Dimens } from '../../constansts/dimension';
import ItemHeader from '../ProfileScreen/components/ItemHeader';

const jd = " - Design and build advanced sdk/applications for web platform\n - Ensure the performance, security, quality, and responsiveness of applications\n - Collaborate with cross-functional teams to define, design, and ship new features\n - Work with team to continuously improve our products’ UI/UX and technical performance to bring the best experiences to the users\n - Unit-test code for robustness, including edge cases, usability, and general reliability\n - Do pair programming and code review"


const JobDetailScreen = () => {
    console.log("render Job detail Screen")

    //States


    //others
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    //-------------------------Effects-----------------------------------

    useEffect(() => {


        return () => {
            console.log("List skill Screen Unmount");

        }
    }, []);

    //-------------------------Functions---------------------------------




    //--------------------------------------------------

    return (
        <View style={{ ...styles.container, backgroundColor: 'transparent' }}>
            <Header
                screenName="Job detail"
            ></Header>
            <ScrollView>

                {/* Job Header  */}
                <View style={{ flexDirection: 'column', padding: 10, paddingVertical: 20, backgroundColor: 'white', elevation: 2 }}>
                    <Text
                        style={{
                            ...styles.text, color: Colors.MainBlue,
                            fontWeight: 'bold', fontSize: 25, textAlign: 'left'
                        }}
                    >Web/Frontend Developer (ReactJS) - Hanoi</Text>

                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <Image
                            source={{ uri: 'https://media-exp1.licdn.com/dms/image/C4E0BAQEyxTIG0-1-9g/company-logo_100_100/0/1600097097514?e=1617235200&v=beta&t=epIoK27VPzpIRYzoEJIPW57XPoiQcFmk0IhNpHWx054' }}
                            style={{ height: 100, width: 80, marginRight: 10 }}
                        ></Image>
                        <View style={{ flexDirection: 'column', height: '100%', }}>
                            <Text style={{ ...styles.text, fontSize: 13 }}>Tripi Miền Nam</Text>
                            <Text style={{ ...styles.text, fontSize: 13 }}>Hanoi, Vietnam</Text>
                            <Text style={{ ...styles.text, fontSize: 13, fontWeight: 'bold', marginTop: 10 }}><Text style={{ color: Colors.DarkTurquoise }}>{Number('0.8') * 100}%</Text> compatibility <Text style={{ color: '#03fc66', fontWeight: 'bold', fontSize: 20 }}>{Number('0.8') > 0.6 ? "  ✓" : null}</Text></Text>

                        </View>
                    </View>

                    <View style={{ height: 1, backgroundColor: Colors.LightGray, width: "50%", marginVertical: 5 }}></View>
                    <Text style={{ ...styles.text }}>two hours ago - <Text style={{ fontSize: 15, color: Colors.DarkTurquoise }}>{true ? "Actively recruiting" : "Expired"}</Text></Text>
                    <TouchableOpacity
                        style={{
                            padding: 10, flexDirection: 'row',
                            backgroundColor: '#1dcf70', borderRadius: 5, elevation: 5,
                            marginTop: 10, width: '100%', alignItems: 'center', justifyContent: 'center'
                        }}

                    >
                        <Text style={{ fontWeight: 'bold', color: 'white', alignSelf: 'center', marginRight: 10 }}>Apply now</Text>
                        <MaterialCommunityIcons name="cube-send" size={25} color={'white'}></MaterialCommunityIcons>
                    </TouchableOpacity>

                </View>

                {/* Job Description */}
                <View style={{ backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 20, marginTop: 10, elevation: 2 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Job Description</Text>
                    <Text style={{ margin: 10, textAlign: 'left' }}>{jd}</Text>
                </View>

                {/* Job Detail  */}
                <View style={{ backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 20, marginTop: 10, elevation: 2 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Job Details</Text>
                    <View style={{ margin: 10 }}>
                        <Text style={{ color: Colors.Gray }}>Position</Text>
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>Mid-Senior</Text>

                        <Text style={{ color: Colors.Gray, marginTop: 10 }}>Industry</Text>
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>Information Technology & Services, Computer Software, Internet</Text>
                    </View>
                </View>

                {/* Essential skills  */}
                <View style={{ backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 20, marginTop: 10, elevation: 2 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Essential skills</Text>
                    <View style={{ margin: 10 }}>

                        <Text style={{ color: 'black', }}> - ReactJS/React Native</Text>
                        <Text style={{ color: 'black', }}> - Redux, Redux-thunk</Text>
                        <Text style={{ color: 'black', }}> - Nắm vững HTML, CSS, Javascript</Text>
                        <Text style={{ color: 'black', }}> - Có kiến thức về RESTFUL API</Text>
                        <Text style={{ color: 'black', }}> - Biết về NodeJS là một lợi thế</Text>

                    </View>
                </View>

                {/* Footer  */}
                <Footer></Footer>
            </ScrollView>


        </View>
    );
}

const tempStyles = StyleSheet.create({

});

export default JobDetailScreen;