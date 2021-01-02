import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import { setListUni, onSelectUni, onSearchUni } from '../../redux/actions/listUni';

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


const ListUniScreen = () => {
    console.log("render List Uni Screen")

    //States
    const listUni = useSelector(state => state.listUni.listUni);
    const [textSearch, setTextSearch] = useState('');


    //others
    const navigation = useNavigation();
    const dispatch = useDispatch();

    //-------------------------Effects-----------------------------------

    useEffect(() => {

        dispatch(setListUni());

        return () => {
            console.log("List Uni Screen Unmount");

        }
    }, []);

    //-------------------------Functions---------------------------------
    const onChangeSearchText = (text) => {

        dispatch(onSearchUni(text));
    }



    //--------------------------------------------------
    const _renderItem = useCallback(
        ({ item }) => (
            <Text
                key={item.id}
                style={{ fontSize: 16, padding: 10, borderBottomWidth: 1, borderBottomColor: Colors.Gray }}
                onPress={() => {
                    dispatch(onSelectUni(item.name));
                    navigation.goBack();
                }}
            >{item.name}</Text>
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
                screenName={"List University"}
                textRightButton=""
            ></Header>

            <View style={{ height: 60, justifyContent: 'center', backgroundColor: 'white', marginBottom: 10 }}>
                <View style={tempStyles.search_bar_container}>
                    <Ionicons name="search" size={18} color={'black'} />
                    <TextInput
                        style={tempStyles.input_search_bar}
                        autoCapitalize="none"
                        placeholder="Search"
                        onChangeText={onChangeSearchText}
                    ></TextInput>
                </View>
            </View>

            <Delayed wait={1000} noneLoading={false}>
                <FlatList
                    data={listUni}
                    renderItem={_renderItem}
                    keyExtractor={keyExtractor}
                ></FlatList>
            </Delayed>




        </View>
    );
}

const tempStyles = StyleSheet.create({
    search_bar_container: {
        flexDirection: 'row',
        backgroundColor: Colors.Cyan,
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 10,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    input_search_bar: {
        color: Colors.Gray,
        fontSize: 16,
        marginLeft: 5,
        flex: 1,
        textAlignVertical: 'center'
    },
});

export default ListUniScreen;