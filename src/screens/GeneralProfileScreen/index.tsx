import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    ToastAndroid,
} from 'react-native';

//Firebase
import auth from '@react-native-firebase/auth';
import { FirebaseErrorRespond } from '../../helpers/FirebaseErrorRespond';

//Styles & Images & Icons
import { styles } from '../Styles/styles';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

//Navigation
import { useNavigation, useRoute } from '@react-navigation/native';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { sendRequest } from '../../redux/actions/request';

//helpers
import { setI18nConfig, translate } from '../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';
import { randomCoverImage } from '../../helpers/randomCoverImage';
import { getData, fetchData } from '../../apis/apiCaller';

//Components
import HorizontalBarChart from './components/HorizontalBarChart';
import Background from './components/Background';
import ListSkill from './components/ListSkill';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ItemHeader from './components/ItemHeader'


//Consts
import { Colors } from '../../constansts/color';
import { Dimens } from '../../constansts/dimension';
const marginStandart = 10;

const GeneralProfileScreen = () => {
    //State
    const globalUserReal = useSelector(state => state.globalUser.globalUser);
    const [globalUser, setGlobalUser] = useState({
        _id: "",
        username: "",
        email: "",
        urlavatar: "",
        phone: "",
        province: "",
        city: "",
        qrcode: "",
        headline: "",
        underwork: true,
        path: "",
        point: 0,
        schools: [],
        companies: [],
        skills: []
    });
    const [loadingGetInfo, setLoadingGetInfo] = useState(false);
    const sendLoading = useSelector(state => state.request.sendLoading);
    const [statusConnect, setStatusConnect] = useState("not");

    //Others
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    //------------------------------------Effects-------------------------------------
    useEffect(() => {
        const email = route.params._email;
        setLoadingGetInfo(true);
        getData("users/" + email).then(data => {
            if (data) {
                checkRelationship(globalUserReal._id, data._id);
                setGlobalUser(data);
            }
        })
            .then(() => setLoadingGetInfo(false))
            .catch(error => {
                ToastAndroid.show(`Error: ${error.message || 'Unexpected Error!!!'}`, ToastAndroid.SHORT);
            });


        return () => {

        }
    }, []);

    //------------------------------------Functions-----------------------------------

    const checkRelationship = (idUserSend: string, idUserRecieve: string) => {
        const body = {
            idusersend: idUserSend,
            iduserrecieve: idUserRecieve,
        }
        fetchData("requests/checkrelationship", "POST", body).then(data => {
            console.log(data);
            if (data.status === "not") {
                setStatusConnect("not");
            } else {
                if (data.status === "waiting") {
                    setStatusConnect("waiting");
                } else {
                    setStatusConnect("yet");
                }
            }
        }).catch(error => {
            ToastAndroid.show(`Error: ${error.message || '2Unexpected Error!!!'}`, ToastAndroid.SHORT);
        });
    }

    const onClickSendRequest = () => {
        if (statusConnect === "not") {
            dispatch(sendRequest(globalUserReal._id, globalUser._id));
            setStatusConnect("waiting");
        }
    }

    return (
        <View style={[styles.container, { backgroundColor: 'transparent' }]}>
            <Header screenName="User profile"></Header>
            {loadingGetInfo ?
                <ActivityIndicator size="large" color={Colors.MainBlue}></ActivityIndicator>
                :
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Personal Info  */}
                    <View style={{ flexDirection: 'column', backgroundColor: 'white', paddingBottom: 10, }}>
                        <Image source={{ uri: randomCoverImage() }} style={{ height: 100, width: '100%' }} ></Image>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <TouchableOpacity style={{
                                padding: 5,
                                backgroundColor: 'white', margin: 2,
                                borderRadius: 20, elevation: 5
                            }} onPress={() => navigation.navigate("MessageDetail", { _idguess: globalUser._id })}>
                                <AntDesign name="message1" size={24} color={Colors.DarkTurquoise}></AntDesign>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                padding: marginStandart,
                                backgroundColor: Colors.MainBlue, margin: 10, paddingHorizontal: 15,
                                borderRadius: 5, elevation: 5
                            }} onPress={onClickSendRequest}>

                                {sendLoading ?
                                    <ActivityIndicator size="small" color={'white'}></ActivityIndicator>
                                    :
                                    <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>{statusConnect === "not" ? "Connect" : statusConnect === "waiting" ? "Sending request" : "Connecting"}</Text>
                                }
                            </TouchableOpacity>
                        </View>


                        <View style={{ flexDirection: 'column', marginLeft: marginStandart, }}>
                            <Text style={styles.headerTitle}>{globalUser.username}</Text>
                            {globalUser.headline === "" ? null : <Text style={styles.textNormal}>{globalUser.headline}</Text>}
                            {globalUser.province === "" || globalUser.city === "" ? null : <Text style={styles.textNormal}>{globalUser.city + ", " + globalUser.province}</Text>}

                        </View>

                        {globalUser.urlavatar === "" ?
                            <View style={{
                                height: 100,
                                width: 100,
                                borderRadius: 50,
                                borderWidth: 5,
                                borderColor: 'white',
                                position: 'absolute',
                                top: 50,
                                left: 20,
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <FontAwesome5 name="user-check" size={45} color={Colors.Gray}></FontAwesome5>
                            </View>
                            :
                            <Image
                                source={{ uri: globalUser.urlavatar }}
                                style={{
                                    height: 100,
                                    width: 100,
                                    borderRadius: 50,
                                    borderWidth: 5,
                                    borderColor: 'white',
                                    position: 'absolute',
                                    top: 50,
                                    left: 20
                                }}
                            ></Image>
                        }

                        <View style={{
                            height: 20, width: 20, borderRadius: 10,
                            backgroundColor: Colors.MainBlue,
                            position: 'absolute',
                            top: 125, left: 95, borderWidth: 1,
                            borderColor: 'white', elevation: 10
                        }}></View>

                    </View>

                    {/* Profile strength */}
                    <HorizontalBarChart point={globalUser.point}></HorizontalBarChart>

                    {/* Background */}
                    <Background
                        listCompany={globalUser.companies}
                        listSchool={globalUser.schools}
                    ></Background>

                    {/* List Skills */}
                    <ListSkill
                        username={globalUser.username}
                        listSkill={globalUser.skills}
                    ></ListSkill>

                    {/* Contact */}
                    <View style={{
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        marginTop: 10,
                        paddingHorizontal: 10,
                        paddingTop: 10,
                        paddingBottom: 20,
                        alignItems: 'flex-start'
                    }}>

                        <ItemHeader title="Contact"></ItemHeader>

                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', paddingLeft: 10 }}>
                            <Entypo name="email" size={18} color={'black'}></Entypo>
                            <View style={{ flex: 1, flexDirection: 'column', borderBottomColor: Colors.LightGray, borderBottomWidth: 1, padding: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Your email</Text>
                                <Text >{globalUser.email}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', paddingLeft: 10 }}>
                            <Entypo name="phone" size={18} color={'black'}></Entypo>
                            <View style={{ flex: 1, flexDirection: 'column', borderBottomColor: Colors.LightGray, borderBottomWidth: 1, padding: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Your phone</Text>
                                <Text >{globalUser.phone}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    {/* Footer  */}
                    <Footer></Footer>

                </ScrollView>
            }

        </View>
    );
}

export default GeneralProfileScreen;