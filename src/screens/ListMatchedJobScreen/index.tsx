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
import moment from 'moment';

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

//Consts
import { Colors } from '../../constansts/color';
import { Dimens } from '../../constansts/dimension';

const listMatchedJobs = [
    {
        id: 0,
        jobname: "Mobile Developer AzureTech",
        companyname: 'AFRY',
        compatibility: '0.8',
        location: 'Ho Chi Minh City',
        position: 'fresher',
        date: 'a day ago',
        active: true,
        applicant: 2,
        urljobavatar: "https://media-exp1.licdn.com/dms/image/C4E0BAQEyxTIG0-1-9g/company-logo_100_100/0/1600097097514?e=1617235200&v=beta&t=epIoK27VPzpIRYzoEJIPW57XPoiQcFmk0IhNpHWx054",
        jobdescription: 'Write readable and maintainable code that not only performs the task but eases future modifications\n Work in a team environment, cooperating on designing and implementing user friendly solutions\n Keep up with security standards for user privacy \nTranslate designs and wireframes into highly reusable code \nKeep track of work progress and work in an objective oriented environment \nCreate and maintain documentation on solution design and maintenance',
    },
    {
        id: 1,
        jobname: "Website Developer",
        companyname: 'Sigma Aviation Services',
        compatibility: '0.65',
        location: 'Ho Chi Minh City',
        position: 'junior',
        date: 'two days ago',
        active: false,
        urljobavatar: "https://media-exp1.licdn.com/dms/image/C4D0BAQEUvYPSC8F0sQ/company-logo_100_100/0/1519915974042?e=1617235200&v=beta&t=psnNO83wAUM2ULuMlOOQEni9Kg6DkLJWa6Rhlq3keHc",
        jobdescription: 'Write readable and maintainable code that not only performs the task but eases future modifications\n Work in a team environment, cooperating on designing and implementing user friendly solutions\n Keep up with security standards for user privacy \nTranslate designs and wireframes into highly reusable code \nKeep track of work progress and work in an objective oriented environment \nCreate and maintain documentation on solution design and maintenance',
    },
    {
        id: 2,
        jobname: "ReactJS/React Native developer",
        companyname: 'Evizi',
        compatibility: '0.5',
        location: 'Ho Chi Minh City',
        position: 'techlead',
        date: 'a day ago',
        active: true,
        urljobavatar: "https://media-exp1.licdn.com/dms/image/C560BAQFOwe6fDnE-Kg/company-logo_100_100/0/1556602193231?e=1617235200&v=beta&t=QUTzxUsv0LvX35oUQpfSpUwX9WsqhSVTR7gwKFVujF4",
        jobdescription: 'Write readable and maintainable code that not only performs the task but eases future modifications\n Work in a team environment, cooperating on designing and implementing user friendly solutions\n Keep up with security standards for user privacy \nTranslate designs and wireframes into highly reusable code \nKeep track of work progress and work in an objective oriented environment \nCreate and maintain documentation on solution design and maintenance',
    },
    {
        id: 3,
        jobname: "Frontend Developer",
        companyname: 'Doo Technology Limited',
        compatibility: '0.4',
        location: 'Ho Chi Minh City',
        position: 'fresher',
        date: 'a day ago',
        active: true,
        applicant: 2,
        urljobavatar: "https://media-exp1.licdn.com/dms/image/C510BAQEkTDAkXMKqeQ/company-logo_100_100/0/1558065625621?e=1617235200&v=beta&t=FwwQ1SqA0dOqRLAZIn6Ttp_5tS1VPzbXU4IretwFoMI",
        jobdescription: 'Write readable and maintainable code that not only performs the task but eases future modifications\n Work in a team environment, cooperating on designing and implementing user friendly solutions\n Keep up with security standards for user privacy \nTranslate designs and wireframes into highly reusable code \nKeep track of work progress and work in an objective oriented environment \nCreate and maintain documentation on solution design and maintenance',
    },
]

const ListMatchedJobScreen = () => {
    console.log("render Edit Intro Screen")

    //States
    const loadingProvince = useSelector(state => state.listChoice.loadingProvince);
    const listProvince = useSelector(state => state.listChoice.listProvince);
    const listCityOrDistrict = useSelector(state => state.listChoice.listCityOrDistrict);
    const errorLoadProvince = useSelector(state => state.listChoice.error);
    const path = useSelector(state => state.listChoice.path);

    //others
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();


    //-------------------------Effects-----------------------------------

    useEffect(() => {
        // if (title === 'province') {
        //     dispatch(getListProvince());
        // } else {
        //     dispatch(getListCityOrDistrict(path));
        // }


        return () => {
            console.log("Edit Intro Screen Unmount");

        }
    }, []);

    //-------------------------Functions---------------------------------



    //--------------------------------------------------
    const _renderItem = useCallback(
        ({ item }) => (
            <View style={{ flexDirection: 'column', padding: 10, borderBottomWidth: 1, borderBottomColor: Colors.LightGray }}>




                <Text style={{ ...styles.text, color: Colors.MainBlue, fontWeight: 'bold', fontSize: 16, textAlign: 'justify' }}
                    numberOfLines={1} ellipsizeMode="tail"
                >{item.jobname}</Text>

                <Text style={{ ...styles.text, fontSize: 13 }}>{item.companyname}</Text>
                <Text style={{ ...styles.text, fontSize: 13 }}>{item.location}, Vietnam</Text>
                <Text style={{ ...styles.text, fontSize: 13, fontWeight: 'bold' }}><Text style={{ color: Colors.DarkTurquoise }}>{Number(item.compatibility) * 100}%</Text> compatibility <Text style={{ color: '#03fc66', fontWeight: 'bold', fontSize: 20 }}>{Number(item.compatibility) > 0.6 ? "✓" : null}</Text></Text>

                <View style={{ height: 1, backgroundColor: Colors.LightGray, width: "20%", marginVertical: 5 }}></View>
                <Text style={{ ...styles.text }}>{item.date} - <Text style={{ fontSize: 15, color: Colors.DarkTurquoise }}>{item.active ? "Actively recruiting" : "Expired"}</Text></Text>
                <TouchableOpacity style={{ padding: 10, backgroundColor: '#1dcf70', borderRadius: 5, marginTop: 10, width: '70%', alignSelf: 'flex-end' }}>
                    <Text style={{ fontWeight: 'bold', color: 'white', alignSelf: 'center' }}>Apply now</Text>
                </TouchableOpacity>

                <Image source={{ uri: item.urljobavatar }} style={{ height: 80, width: 80, position: 'absolute', top: 20, right: 20 }}></Image>

            </View>

        )
        ,
        []
    );

    const keyExtractor = useCallback(
        item => item.id.toString(),
        []
    );

    return (
        <View style={styles.container}>
            <Header
                screenName={"List matched jobs "}
                textRightButton=""
            ></Header>

            {loadingProvince ?
                <ActivityIndicator size="large" color={Colors.MainBlue}></ActivityIndicator>
                :
                <FlatList
                    data={listMatchedJobs}
                    renderItem={_renderItem}
                    keyExtractor={keyExtractor}
                ></FlatList>
            }


        </View>
    );
}

const tempStyles = StyleSheet.create({

});

export default ListMatchedJobScreen;