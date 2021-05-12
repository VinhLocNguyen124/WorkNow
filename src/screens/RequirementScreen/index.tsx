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

console.disableYellowBox = true;

//Firebase
import auth from '@react-native-firebase/auth';
import { FirebaseErrorRespond } from '../../helpers/FirebaseErrorRespond';

//Styles & Images & Icons
import { styles } from '../Styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
import { submitRequirement } from '../../redux/actions/requirement';
import { onDeleteRequireSkill } from '../../redux/actions/listSkill';

//Components
import Delayed from './../../components/Delayed';
import FormInput from './../../components/FormInput';
import FormDropDown from './../../components/FormDropDown';
import TextHighLightButton from './../../components/TextHighLightButton';
import Footer from './../../components/Footer';
import ItemListSkill from './components/ItemListSkill';
import AddSkillModal from './components/AddSkillModal';
import ItemHeader from '../ProfileScreen/components/ItemHeader';

//Consts
import { Colors } from '../../constansts/color';
import { Dimens } from '../../constansts/dimension';
import { Positions } from '../../constansts/listPosition';

const iconHeader = <AntDesign name="plussquareo" size={25} color={Colors.MainBlue}></AntDesign>

const RequirementScreen = () => {

    //States
    const province = useSelector(state => state.listChoice.province);
    const city = useSelector(state => state.listChoice.city);
    const path = useSelector(state => state.listChoice.path);
    const globalUser = useSelector(state => state.globalUser.globalUser);
    const submitLoading = useSelector(state => state.requirement.submitLoading);
    const listRequireSkill = useSelector(state => state.listSkill.listRequireSkill);
    const [jobName, setJobName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [position, setPosition] = useState({ _id: '', name: '' });
    const [jobDesc, setJobDesc] = useState('');
    const [modalAddVisible, setModalAddVisible] = useState(false);
    const [showListPosition, setShowListPosition] = useState(false);
    const [listPosition, setListPosition] = useState(Positions);
    const [imageSource, setImageSource] = useState(null);

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

    const onPressCompanyLogoAdding = () => {
        onLaunchImageGallery((source, response) => {
            setImageSource(source);
        })
    }

    const onRemoveCompanyLogo = () => {
        setImageSource(null);
    }

    const onPressSubmit = () => {
        const requirement = {
            iduser: globalUser._id,
            idposition: position._id,
            jobdescription: jobDesc,
            company_name: companyName,
            company_logo: "https://res.cloudinary.com/locnguyen-cloud/image/upload/v1620160155/company_logo_dsexws.png",
            province: province,
            city: city,
            jobname: jobName,
            listskill: listRequireSkill,
        }
        dispatch(submitRequirement(requirement, imageSource));
    }

    const onChangeTextSearchPosition = (text) => {
        setPosition({ _id: '', name: text });
        setShowListPosition(true);
        setListPosition(Positions.filter((position) => {
            return position.name.toLowerCase().trim().search(text.toLowerCase().trim()) !== -1;
        }));
    }

    const _renderItem = useCallback(
        ({ item, index }) => (
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between',
                borderBottomColor: Colors.LightGray, borderBottomWidth: 1, padding: 10,
                alignItems: 'center'
            }}>
                <Text style={{}}>{item.name}</Text>
                <TouchableOpacity onPress={() => dispatch(onDeleteRequireSkill(index))}>
                    <AntDesign name="closesquareo" size={22} color={Colors.Gray}></AntDesign>
                </TouchableOpacity>
            </View>
        ), []
    );

    const keyExtractor = useCallback(
        item => item._id,
        []
    );

    const _renderItemPosition = useCallback(
        ({ item }) => (
            <View
                onStartShouldSetResponder={() => {
                    return true;
                }}
            >
                <TouchableOpacity onPress={() => {
                    setPosition(item);
                    setShowListPosition(false);
                }}>
                    <Text
                        key={item._id}
                        style={{ padding: 5 }}
                    >{item.name}</Text>
                </TouchableOpacity>
            </View>
        ), []);

    const keyExtractorPosition = useCallback(
        item => item._id, []);

    //--------------------------------------------------


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 50 }}>
                    <Ionicons name="md-arrow-back" size={24} color={Colors.Gray}></Ionicons>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Requirement</Text>
                <TouchableOpacity style={{ width: 50 }} onPress={onPressSubmit}>
                    {submitLoading ?
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
                        onChangeText={text => setJobName(text)}
                        value={jobName}
                    ></FormInput>

                    <FormInput
                        title="Company name"
                        style={{ marginTop: 20 }}
                        onChangeText={text => setCompanyName(text)}
                        value={companyName}
                    ></FormInput>

                    <Text style={{ ...styles.inputTitle, marginTop: 20 }}>Company Logo</Text>

                    {imageSource ?
                        <View>
                            <Image
                                source={{ uri: imageSource.uri }}
                                style={{
                                    height: 100,
                                    width: 100,
                                    borderRadius: 10,
                                }}
                            ></Image>
                            <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={onRemoveCompanyLogo}>
                                <AntDesign name="closecircleo" size={20} color={Colors.LightGray} />
                            </TouchableOpacity>
                        </View>
                        :
                        <TouchableOpacity style={{
                            height: 100, width: 100, borderWidth: 1, borderRadius: 5,
                            borderColor: Colors.LightGray, borderStyle: 'dashed',
                            justifyContent: 'center', alignItems: 'center'
                        }} onPress={onPressCompanyLogoAdding}>
                            <FontAwesome name="plus" size={30} color={Colors.LightGray}></FontAwesome>
                        </TouchableOpacity>
                    }

                    <FormInput
                        title="Position"
                        style={{ marginTop: 20 }}
                        onFocus={() => {
                            setShowListPosition(true);
                            Keyboard.dismiss();
                        }}
                        onChangeText={onChangeTextSearchPosition}
                        showKeyboard={false}
                        value={position.name}
                    >
                        {showListPosition ?
                            <FlatList
                                style={{
                                    maxHeight: 150,
                                    backgroundColor: 'white', marginHorizontal: 0,
                                    padding: 10
                                }}
                                data={listPosition}
                                renderItem={_renderItemPosition}
                                keyExtractor={keyExtractorPosition}
                                keyboardShouldPersistTaps='handled'
                                nestedScrollEnabled={true}
                            ></FlatList>
                            : null
                        }
                    </FormInput>

                    <FormDropDown
                        title="Province"
                        value={province}
                        style={{ marginTop: 20 }}
                        param="province"
                        onPress={(param) => navigation.navigate('ListChoice', { title: param })}
                    ></FormDropDown>

                    <FormDropDown
                        title="City/District"
                        value={city}
                        style={{ marginTop: 20 }}
                        param="city/district"
                        onPress={(param) => {
                            if (path !== '') {
                                navigation.navigate('ListChoice', { title: param })
                            } else {
                                ToastAndroid.show("Please select province before selecting city/district", ToastAndroid.SHORT);
                            }
                        }}
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
                            borderRadius: 10, marginTop: 20, paddingHorizontal: 10
                        }}
                        placeholder="Somethings to describe your job"
                        onChangeText={text => setJobDesc(text)}
                        value={jobDesc}
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

                    {listRequireSkill ?
                        <FlatList
                            data={listRequireSkill}
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

        </View >
    );
}

const tempStyles = StyleSheet.create({
    ei_text_header_btn: {
        fontWeight: 'bold',
        color: Colors.Gray
    },
});

export default RequirementScreen;