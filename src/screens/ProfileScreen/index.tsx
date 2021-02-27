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
} from 'react-native';

//Firebase
import auth from '@react-native-firebase/auth';
import { FirebaseErrorRespond } from '../../helpers/FirebaseErrorRespond';

//Styles & Images & Icons
import BackGround from './../../assets/images/svg/BackGround';
import { styles } from '../Styles/styles';
import { Paths } from '../../constansts/path';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Navigation
import { useNavigation } from '@react-navigation/native';

//redux
import { useSelector, useDispatch } from 'react-redux';

//helpers
import { setI18nConfig, translate } from '../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';
import { randomCoverImage } from '../../helpers/randomCoverImage';

//Components
import HorizontalBarChart from './components/HorizontalBarChart';
import ShortTimeline from './components/ShortTimeline';
import Background from './components/Background';
import ListSkill from './components/ListSkill';
import Contact from './components/Contact';
import Footer from '../../components/Footer';
import Delayed from '../../components/Delayed';
import JobFinder from './components/JobFinder';

//Consts
import { Colors } from '../../constansts/color';
import { Dimens } from '../../constansts/dimension';
const marginStandart = 10;

const ProfileScreen = () => {
    //State
    const globalUser = useSelector(state => state.globalUser.globalUser);

    //notsure
    const listSkill = useSelector(state => state.listSkill.listSkill)

    //Others
    const navigation = useNavigation();

    //------------------------------------Effects-------------------------------------
    useEffect(() => {
        console.log(globalUser);

        return () => {

        }
    }, []);

    //------------------------------------Functions-----------------------------------

    return (
        <View style={[styles.container, { backgroundColor: 'transparent' }]}>
            <Delayed wait={500} noneLoading={false}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Personal Info  */}
                    <View style={{ flexDirection: 'column', backgroundColor: 'white', paddingBottom: 10, }}>
                        <Image source={{ uri: randomCoverImage() }} style={{ height: 100, width: '100%' }} ></Image>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>

                            <TouchableOpacity style={{
                                alignSelf: 'flex-end', padding: marginStandart,
                                backgroundColor: Colors.DarkTurquoise, margin: 10,
                                paddingHorizontal: 40, borderRadius: 5, elevation: 5
                            }} onPress={() => navigation.navigate('ListRequest')}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>requests</Text>

                                {globalUser.requests.length > 0 ?
                                    <View style={{
                                        height: 10, width: 10, backgroundColor: 'red',
                                        position: 'absolute', top: 0, left: 0, borderRadius: 20, borderWidth: 1, borderColor: 'white'
                                    }}></View> : null
                                }
                            </TouchableOpacity>

                            <TouchableOpacity style={{ padding: marginStandart }} onPress={() => navigation.navigate('EditIntro')}>
                                <FontAwesome name="pencil" size={20} color={'black'}></FontAwesome>
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

                    {/* Job require and Find job  */}
                    <JobFinder></JobFinder>

                    {/* Profile strength */}
                    <HorizontalBarChart point={globalUser.point}></HorizontalBarChart>

                    {/* Short timeline  */}
                    <ShortTimeline
                        seeAllPress={() => navigation.navigate('Timeline')}
                        startPostPress={() => navigation.navigate('postModal')}
                    ></ShortTimeline>

                    {/* Background */}
                    <Background
                        onPress={() => navigation.navigate('Background')}
                    ></Background>

                    {/* List Skills */}
                    <ListSkill
                        onPress={() => navigation.navigate("ListSkill")}
                        listSkill={globalUser.skills}
                    ></ListSkill>

                    {/* Contact */}
                    <Contact></Contact>

                    {/* Footer  */}
                    <Footer></Footer>

                </ScrollView>
            </Delayed>
        </View>
    );
}

export default ProfileScreen;