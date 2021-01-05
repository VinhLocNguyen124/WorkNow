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

// console.disableYellowBox = true;

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
import { useNavigation } from '@react-navigation/native';

//helpers
import { setI18nConfig, translate } from '../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';
import { FitImageDimension } from '../../helpers/FitImageDimension';
import {
    onLaunchImageGallery,
    onLaunchCamera,
    cloudinaryUploadImage
} from '../../helpers/MediaConfig';

//apis
import { fetchData } from '../../apis/apiCaller';

//hooks

//redux & actions
import { useSelector, useDispatch } from 'react-redux';
import { addNewPost } from '../../redux/actions/post';

//Components
import Delayed from './../../components/Delayed';
import FormInput from './../../components/FormInput';
import FormDropDown from './../../components/FormDropDown';
import TextHighLightButton from './../../components/TextHighLightButton';
import Footer from './../../components/Footer';
import ItemListSkill from '../ListSkillScreen/components/ItemListSkill';
import AddSkillModal from '../ListSkillScreen/components/AddSkillModal';
import ItemHeader from '../ProfileScreen/components/ItemHeader';

//Consts
import { Colors } from '../../constansts/color';
import { Dimens } from '../../constansts/dimension';

const iconHeader = <AntDesign name="plussquareo" size={25} color={Colors.MainBlue}></AntDesign>

const RequirementScreen = () => {
    console.log("render Requirement Screen")

    //States
    const province = useSelector(state => state.listChoice.province);
    const city = useSelector(state => state.listChoice.city);
    const uniName = useSelector(state => state.listUni.uniName);
    const path = useSelector(state => state.listChoice.path);
    const [modalAddVisible, setModalAddVisible] = useState(false);
    const listSkill = useSelector(state => state.listSkill.listSkill);

    //others
    const navigation = useNavigation();
    const dispatch = useDispatch();

    //-------------------------Effects-----------------------------------

    useEffect(() => {

        return () => {
            console.log("Requirement Screen Unmount");

        }
    }, []);

    //-------------------------Functions---------------------------------
    const onPressSaveIntro = () => {

    }

    async function onPressItemListSkill(item) {
        // await setModalEditVisible(true);
        // await setSkillEdit(item);
    }

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


    //--------------------------------------------------


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="md-arrow-back" size={24} color={Colors.Gray}></Ionicons>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Requirement</Text>
                <TouchableOpacity style={{ width: 50 }} onPress={onPressSaveIntro}>
                    {false ?
                        <ActivityIndicator color={Colors.MainBlue} />
                        :
                        <Text style={tempStyles.ei_text_header_btn}>Submit</Text>
                    }
                </TouchableOpacity>
            </View>

            <Delayed wait={1000} noneLoading={false}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ marginHorizontal: 0, paddingHorizontal: 10, paddingVertical: 10 }}
                >

                    {/* title, onChangeText, value, style */}
                    <FormInput
                        title="Job name"
                        style={{ marginTop: 10 }}
                    ></FormInput>
                    <FormInput
                        title="Company name"
                        style={{ marginTop: 20 }}
                    ></FormInput>
                    <FormDropDown
                        title="Location"
                        //  value={province}
                        style={{ marginTop: 20 }}
                        param="province"
                        onPress={(param) => navigation.navigate('ListChoice', { title: param })}
                    ></FormDropDown>
                    <FormDropDown
                        title="Position"
                        // value={uniName}
                        style={{ marginTop: 20 }}
                        param="position"
                        onPress={(param) => navigation.navigate('ListUni', { title: param })}
                    ></FormDropDown>

                    <FormDropDown
                        title="Industry"
                        value="Information Technology & Service"
                        style={{ marginTop: 20 }}
                        param="industry"
                        onPress={(param) => console.log(param)}
                    ></FormDropDown>

                    <TextInput
                        autoFocus={false}
                        multiline={true}
                        numberOfLines={3}
                        // onChangeText={text => setPostContent(text)}
                        // value={postContent}
                        style={{
                            fontSize: 15, backgroundColor: 'transparent',
                            borderWidth: 1, borderColor: Colors.Gray,
                            borderRadius: 10, marginTop: 20
                        }}
                        placeholder="Somethings to describe your job"
                    ></TextInput>

                    <TextHighLightButton
                        highLightText="____________________________________________"
                        style={{ alignSelf: 'flex-start', marginBottom: 10 }}
                    ></TextHighLightButton>


                    <ItemHeader
                        title="Needed skills"
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

                    {/* Footer  */}
                    <Footer></Footer>

                </ScrollView>
            </Delayed>


        </View>
    );
}

const tempStyles = StyleSheet.create({
    ei_text_header_btn: {
        fontWeight: 'bold',
        color: Colors.Gray
    },
});

export default RequirementScreen;