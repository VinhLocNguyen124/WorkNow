import React, { useState, useEffect, useCallback } from 'react';
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
import { styles } from '../Styles/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';

//redux 
import { useSelector, useDispatch } from 'react-redux';

//Navigation
import { useNavigation } from '@react-navigation/native';

//helpers
import { setI18nConfig, translate } from '../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';

//Components
import Footer from '../../components/Footer';
import Delayed from '../../components/Delayed';
import Header from '../../components/Header';
import ItemHeader from '../ProfileScreen/components/ItemHeader';
import EducationItem from './components/EducationItem';
import ExperienceItem from './components/ExperienceItem';
import AddExpModal from './components/AddExpModal';
import AddEduModal from './components/AddEduModal';
import EditExpModal from './components/EditExpModal';
import EditEduModal from './components/EditEduModal';

//Consts
import { Colors } from '../../constansts/color';
import { Dimens } from '../../constansts/dimension';


const iconItemHeader = <AntDesign name="plussquareo" size={25} color={Colors.MainBlue}></AntDesign>


const BackgroundScreen = () => {
    //State
    const globalUser = useSelector(state => state.globalUser.globalUser);

    const [modalExpVisible, setModalExpVisible] = useState(false);
    const [modalEduVisible, setModalEduVisible] = useState(false);
    const [modalEditVisible, setModalEditVisible] = useState(false);
    const [modalEditEduVisible, setModalEditEduVisible] = useState(false);
    const [itemExpEdit, setItemExpEdit] = useState({
        _id: "",
        companyname: "",
        position: "",
        major: "",
        expyear: ""
    });
    const [itemEduEdit, setItemEduEdit] = useState({
        _id: "",
        iduser: "",
        schoolname: "",
        major: "",
        schoolyear: "",
    });

    //Others
    const navigation = useNavigation();

    //----------------Effects----------------------



    //----------------Functions--------------------

    const onEditItem = async (item) => {
        await setItemExpEdit(item);
        await setModalEditVisible(true);
    }

    const onEditEduItem = async (item) => {
        await setItemEduEdit(item);
        await setModalEditVisible(true);
    }

    return (
        <View style={[styles.container, { backgroundColor: 'white' }]}>
            <Header
                screenName="Background"
            ></Header>

            <Delayed wait={500} noneLoading={false}>

                <ScrollView style={{ flex: 1, padding: 10 }}>
                    {/* Experience list  */}
                    <ItemHeader
                        title="Experience"
                        icon={iconItemHeader}
                        onPress={() => setModalExpVisible(true)} />

                    {globalUser.companies.length > 0 ?
                        globalUser.companies.map((item) => <ExperienceItem
                            key={item._id}
                            major={item.major}
                            companyname={item.companyname}
                            position={item.position}
                            expyear={item.expyear}
                            onPress={() => {
                                setItemExpEdit(item);
                                setModalEditVisible(true);
                            }}
                        ></ExperienceItem>
                        )
                        :
                        null
                    }

                    <View style={{ height: 20 }}></View>

                    {/* Education list  */}
                    <ItemHeader
                        title="Education"
                        icon={iconItemHeader}
                        onPress={() => setModalEduVisible(true)}></ItemHeader>

                    {globalUser.schools.length > 0 ?
                        globalUser.schools.map((item) => <EducationItem
                            key={item._id}
                            schoolname={item.schoolname}
                            major={item.major}
                            schoolyaer={item.schoolyear}
                            onPress={() => {
                                setItemEduEdit(item);
                                setModalEditEduVisible(true);
                            }}
                        ></EducationItem>
                        )
                        :
                        null
                    }

                </ScrollView>

            </Delayed>

            <AddExpModal
                visible={modalExpVisible}
                onPressClose={() => setModalExpVisible(false)}
            ></AddExpModal>

            <AddEduModal
                visible={modalEduVisible}
                onPressClose={() => setModalEduVisible(false)}
            ></AddEduModal>

            <EditExpModal
                visible={modalEditVisible}
                onPressClose={() => setModalEditVisible(false)}
                item={itemExpEdit}
            ></EditExpModal>

            <EditEduModal
                visible={modalEditEduVisible}
                onPressClose={() => setModalEditEduVisible(false)}
                item={itemEduEdit}
            ></EditEduModal>

        </View>
    );
}

export default BackgroundScreen;