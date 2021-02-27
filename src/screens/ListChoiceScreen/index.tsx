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

const ListChoiceScreen = () => {

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
    const title = route.params.title;

    //-------------------------Effects-----------------------------------
    useEffect(() => {
        if (title === 'province') {
            dispatch(getListProvince());
        } else {
            dispatch(getListCityOrDistrict(path));
        }

        return () => {
            console.log("Edit Intro Screen Unmount");

        }
    }, []);

    //-------------------------Functions---------------------------------
    //--------------------------------------------------
    const _renderItem = useCallback(
        ({ item }) => (
            <Text
                key={item.id}
                style={{ fontSize: 16, padding: 10, borderBottomWidth: 1, borderBottomColor: Colors.Gray }}
                onPress={() => {
                    dispatch(title === "province" ? onSelectProvince(item.name, item.config.file_path) : onSelectCity(item.pre + " " + item.name));
                    navigation.goBack();
                }}
            >{title === "province" ? item.name : item.pre + " " + item.name}</Text>
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
                screenName={"List " + title}
                textRightButton=""
            ></Header>

            {loadingProvince ?
                <ActivityIndicator size="large" color={Colors.MainBlue}></ActivityIndicator>
                :
                <FlatList
                    data={title === "province" ? listProvince : listCityOrDistrict}
                    renderItem={_renderItem}
                    keyExtractor={keyExtractor}
                ></FlatList>
            }
        </View>
    );
}

const tempStyles = StyleSheet.create({

});

export default ListChoiceScreen;