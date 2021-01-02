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
import AntDesign from 'react-native-vector-icons/AntDesign';


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
import AddSkillModal from './components/AddSkillModal';
import ItemListSkill from './components/ItemListSkill';
import EditSkillModal from './components/EditSkillModal';

//Consts
import { Colors } from '../../constansts/color';
import { Dimens } from '../../constansts/dimension';
import ItemHeader from '../ProfileScreen/components/ItemHeader';



const iconHeader = <AntDesign name="plussquareo" size={25} color={Colors.MainBlue}></AntDesign>

const ListSkillScreen = () => {
    console.log("render List skill Screen")

    //States
    const [modalAddVisible, setModalAddVisible] = useState(false);
    const [modalEditVisible, setModalEditVisible] = useState(false);
    const [skillEdit, setSkillEdit] = useState({
        id: 0,
        name: '',
        type: '',
        important: false
    });
    const listSkill = useSelector(state => state.listSkill.listSkill);

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

    async function onPressItemListSkill(item) {
        await setModalEditVisible(true);
        await setSkillEdit(item);
    }


    //--------------------------------------------------
    const _renderItem = useCallback(
        ({ item }) => (
            <ItemListSkill
                key={item.id}
                name={item.name}
                important={item.important}
                onPress={() => { onPressItemListSkill(item) }}
            ></ItemListSkill>
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
                screenName={"List skill"}
            ></Header>
            <View style={{ flex: 1, margin: 10 }}>
                <ItemHeader
                    title="Your current skills"
                    icon={iconHeader}
                    onPress={() => setModalAddVisible(true)}
                ></ItemHeader>
                {listSkill ?
                    <FlatList
                        data={listSkill}
                        renderItem={_renderItem}
                        keyExtractor={keyExtractor}
                    ></FlatList>
                    : <View></View>
                }

                <AddSkillModal
                    visible={modalAddVisible}
                    onPressClose={() => setModalAddVisible(false)}
                ></AddSkillModal>

                <EditSkillModal
                    visible={modalEditVisible}
                    onPressClose={() => setModalEditVisible(false)}
                    skill={skillEdit}
                ></EditSkillModal>
            </View>


        </View>
    );
}

const tempStyles = StyleSheet.create({

});

export default ListSkillScreen;