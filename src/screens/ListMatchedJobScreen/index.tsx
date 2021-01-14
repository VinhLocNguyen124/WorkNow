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
import { FormatNumber } from '../../helpers/FormatNumber';
import { returnSnapPoints } from '../../helpers/UIHandling';

//hooks

//redux & actions
import { useSelector, useDispatch } from 'react-redux';
import { getListProvince, onSelectProvince, getListCityOrDistrict, onSelectCity } from '../../redux/actions/listChoice';

//Components
import Delayed from './../../components/Delayed';
import Header from './../../components/Header';
import BottomSheet from 'reanimated-bottom-sheet';
import BottomSheetFilterContent from './components/BottomSheetFilterContent';
import JobItem from './components/JobItem';

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
    {
        id: 4,
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
        id: 5,
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
        id: 6,
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
        id: 7,
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
    const [typeFilter, setTypeFilter] = useState('');
    const loadingProvince = useSelector(state => state.listChoice.loadingProvince);
    const listProvince = useSelector(state => state.listChoice.listProvince);
    const listCityOrDistrict = useSelector(state => state.listChoice.listCityOrDistrict);
    const errorLoadProvince = useSelector(state => state.listChoice.error);
    const path = useSelector(state => state.listChoice.path);

    //others
    const sheetRef = React.useRef(null);
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

    const openBottomSheet = async (type: string) => {
        await setTypeFilter(type);
        await sheetRef.current.snapTo(0);

    }

    const closeBottomSheet = () => {

        sheetRef.current.snapTo(6);

    }


    //--------------------------------------------------
    const _renderItem = useCallback(
        ({ item }) => (
            <JobItem
                key={item.id}
                item={item}
            ></JobItem>
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

            <Delayed wait={500}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ height: 60, }}>

                    <TouchableOpacity
                        style={tempStyles.filter_btn}
                        onPress={() => openBottomSheet('position')}
                    >
                        <Text style={tempStyles.filter_txt}>Position</Text>
                        <AntDesign name="caretdown" size={12} color={Colors.Gray}></AntDesign>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={tempStyles.filter_btn}
                        onPress={() => openBottomSheet('company')}
                    >
                        <Text style={tempStyles.filter_txt}>Company</Text>
                        <AntDesign name="caretdown" size={12} color={Colors.Gray}></AntDesign>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={tempStyles.filter_btn}
                        onPress={() => openBottomSheet('jobname')}
                    >
                        <Text style={tempStyles.filter_txt}>Job name</Text>
                        <AntDesign name="caretdown" size={12} color={Colors.Gray}></AntDesign>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ ...tempStyles.filter_btn, }}
                        onPress={() => openBottomSheet('skills')}
                    >
                        <Text style={tempStyles.filter_txt}>Skills</Text>
                        <AntDesign name="caretdown" size={12} color={Colors.Gray}></AntDesign>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ ...tempStyles.filter_btn, marginRight: 10 }}
                        onPress={() => openBottomSheet('location')}
                    >
                        <Text style={tempStyles.filter_txt}>Location</Text>
                        <AntDesign name="caretdown" size={12} color={Colors.Gray}></AntDesign>
                    </TouchableOpacity>

                </ScrollView>
            </Delayed>

            <Delayed wait={500}>
                <View style={{ backgroundColor: '#f0f0f5', padding: 5, paddingLeft: 10 }}>
                    <Text style={{ color: Colors.Gray }}>{FormatNumber(1425)} {Number(1425) > 2 ? "results" : "result"}</Text>
                </View>
            </Delayed>

            <Delayed wait={500} noneLoading={false}>

                <FlatList
                    data={listMatchedJobs}
                    renderItem={_renderItem}
                    keyExtractor={keyExtractor}
                ></FlatList>

            </Delayed>

            <Delayed wait={500}>
                <BottomSheet
                    ref={sheetRef}
                    snapPoints={returnSnapPoints(Dimens.heightScreen, 0)}
                    initialSnap={6}
                    enabledInnerScrolling={true}
                    enabledContentGestureInteraction={false}
                    renderContent={() =>
                    (
                        <BottomSheetFilterContent
                            type={typeFilter}
                            onPressOutside={closeBottomSheet}
                        ></BottomSheetFilterContent>
                    )}
                ></BottomSheet>
            </Delayed>


        </View>
    );
}

const tempStyles = StyleSheet.create({
    filter_btn: {
        borderWidth: 1, borderColor: Colors.Gray, flexDirection: 'row',
        paddingHorizontal: 15, height: 30, alignSelf: 'center', marginLeft: 10,
        alignItems: 'center', borderRadius: 15, paddingBottom: 3
    },
    filter_txt: {
        color: Colors.Gray, fontSize: 16, marginRight: 5
    }
});

export default ListMatchedJobScreen;