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
import ItemBackground from '../ProfileScreen/components/ItemBackground';
import AddExpModal from './components/AddExpModal';
import AddEduModal from './components/AddEduModal';
import EditModal from './components/EditModal';

//Consts
import { Colors } from '../../constansts/color';
import { Dimens } from '../../constansts/dimension';


const marginStandart = 10;

const dataExp = [
    {
        id: 0,
        major: "Mobile Application Developer",
        company: "IkoIOS Hanoi Tech Center",
        position: "Fresher"
    },
    {
        id: 1,
        major: "Web Application Developer",
        company: "FraziTech",
        position: "Intern"
    },
]

const dataEdu = [
    {
        id: 0,
        school: "Ba Ria Vung Tau University",
        major: "Mobile Application and Game Programming",
        session: "2017 - 2021"
    },

]

const iconItemHeader = <AntDesign name="plussquareo" size={25} color={Colors.MainBlue}></AntDesign>



const BackgroundScreen = () => {
    //State
    const [modalExpVisible, setModalExpVisible] = useState(false);
    const [modalEduVisible, setModalEduVisible] = useState(false);
    const [modalEditVisible, setModalEditVisible] = useState(false);
    const [itemEdit, setItemEdit] = useState(null)

    //Others
    const navigation = useNavigation();

    //----------------Effects----------------------



    //----------------Functions--------------------

    const onEditItem = async (item) => {
        await setItemEdit(item);
        await setModalEditVisible(true);
    }

    const renderItemExp = dataExp.map((item) => <ItemBackground
        key={item.id}
        major={item.major}
        company={item.company}
        position={"Position: " + item.position}
        onPress={() => onEditItem(item)}
    ></ItemBackground>
    );

    const renderItemEdu = dataEdu.map((item) => <ItemBackground
        key={item.id}
        major={item.school}
        company={item.major}
        position={item.session}
        onPress={() => onEditItem(item)}
    ></ItemBackground>
    );

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
                        onPress={() => setModalExpVisible(true)}></ItemHeader>
                    {renderItemExp}


                    {/* Education list  */}
                    <ItemHeader
                        title="Education"
                        icon={iconItemHeader}
                        onPress={() => setModalEduVisible(true)}></ItemHeader>
                    {renderItemEdu}

                    <AddExpModal
                        visible={modalExpVisible}
                        onPressClose={() => setModalExpVisible(false)}
                    ></AddExpModal>

                    <AddEduModal
                        visible={modalEduVisible}
                        onPressClose={() => setModalEduVisible(false)}
                    ></AddEduModal>

                    <EditModal
                        visible={modalEditVisible}
                        onPressClose={() => setModalEditVisible(false)}
                        item={itemEdit}
                    ></EditModal>

                </ScrollView>
            </Delayed>




        </View>
    );
}

export default BackgroundScreen;