import React from 'react';
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
    const navigation = useNavigation();
    const listSkill = useSelector(state => state.listSkill.listSkill)

    //Others

    return (
        <View style={[styles.container, { backgroundColor: 'transparent' }]}>
            <Delayed wait={500} noneLoading={false}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Personal Info  */}
                    <View style={{ flexDirection: 'column', backgroundColor: 'white', paddingBottom: 10, }}>
                        <Image source={require('../../assets/images/billgate.jpeg')} style={{ height: 100, width: '100%' }} ></Image>
                        <TouchableOpacity style={{ alignSelf: 'flex-end', padding: marginStandart }} onPress={() => navigation.navigate('EditIntro')}>
                            <FontAwesome name="pencil" size={20} color={'black'}></FontAwesome>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'column', margin: marginStandart, }}>
                            <Text style={styles.headerTitle}>Vinh Loc Nguyen</Text>
                            <Text style={styles.textNormal}>Student at Ba Ria Vung Tau University</Text>
                            <Text style={styles.textNormal}>Vung Tau, Ba Ria-Vung Tau, Viet Nam</Text>
                            <Text style={styles.textNormal}>0 connections</Text>
                        </View>

                        <Image
                            source={require('../../assets/images/billgate.jpeg')}
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
                    <HorizontalBarChart point={39}></HorizontalBarChart>

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
                        listSkill={listSkill}
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