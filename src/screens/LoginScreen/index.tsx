//use Strict
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    View,
    Text,
    Image,
    StatusBar,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    LayoutAnimation,
    KeyboardAvoidingView,
    Keyboard,
} from 'react-native';

//Navigation
import { useNavigation } from '@react-navigation/native';

//helpers
import { setI18nConfig, translate } from '../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';

//Firebase
import auth from '@react-native-firebase/auth';
import { FirebaseErrorRespond } from '../../helpers/FirebaseErrorRespond';

//styles & images & icons
import { styles } from '../Styles/styles';
import { Paths } from '../../constansts/path';
import BackGround from './../../assets/images/svg/BackGround';
import Entypo from 'react-native-vector-icons/Entypo';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { saveAccount } from '../../redux/actions/login';


//Components
import MainButton from '../../components/MainButton';
import FormInput from './../../components/FormInput';
import TextHighLightButton from '../../components/TextHighLightButton';
import NoteModal from './components/NoteModal';
import { CheckBox } from 'native-base';

//consts
import { Colors } from '../../constansts/color';

const LoginScreen = () => {
    setI18nConfig();
    console.log('render Login Screen')
    //States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const savedEmail = useSelector(state => state.login.email);
    const savedPassword = useSelector(state => state.login.password);
    const savedCheckSaveAccount = useSelector(state => state.login.checkSaveAccount);
    const [hidePassword, setHidePassword] = useState(true);
    const [waitingLogin, setWaitingLogin] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [checkSaveAccount, setCheckSaveAccount] = useState(false);
    const [visibleNoteModal, setVisibleNoteModal] = useState(false);

    //Others
    const dispatch = useDispatch();
    const navigation = useNavigation();

    //-----------------------------------Effects-----------------------------------
    useEffect(() => {
        //similar with componentDidmount
        setEmail(savedEmail);
        setPassword(savedPassword);
        setCheckSaveAccount(savedCheckSaveAccount);
        RNLocalize.addEventListener('change', setI18nConfig);

        return () => {
            //excute when comp unmount
            console.log("login unmount");
            RNLocalize.removeEventListener('change', setI18nConfig);
            setErrorMessage(null);
            setHidePassword(true);
            setWaitingLogin(false);
        }
    }, []);

    //-----------------------------------Functions-----------------------------------
    /**
     * useCallback được sử dụng để ngăn tạo mới function khi comp App rerender
     * useMemo được sử dụng để ngăn tạo mới data(biến, mảng,...) khi comp App rerender
    */
    const handleLogin = () => {
        Keyboard.dismiss();
        setWaitingLogin(true);
        if (email === "" || password === "") {
            setWaitingLogin(false);
            FirebaseErrorRespond("empty fields", (mess) => setErrorMessage(mess));
        } else {
            auth().signInWithEmailAndPassword(email, password)
                .then(value => {
                    setWaitingLogin(false);
                    if (checkSaveAccount) {
                        dispatch(saveAccount(email, password, checkSaveAccount));
                    } else {
                        dispatch(saveAccount("", "", false));
                    }
                })
                .catch(error => {
                    FirebaseErrorRespond(error.code, (mess) => setErrorMessage(mess));
                    setWaitingLogin(false);
                });
        }
    }

    const onShowAndHidePassWord = () => {
        setHidePassword(!hidePassword);
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" ></StatusBar>
            <BackGround path={Paths.Login} />
            <BackGround
                path={Paths.LoginUnder}
                style={{ position: 'absolute', bottom: -90, left: 0, right: 0 }}
                fill="#0099ff42" />

            <View style={styles.form_container}>

                <View style={styles.logoContainer}>
                    <Image style={styles.normalLogo}
                        source={require('./../../assets/images/logo.png')} />
                </View>

                <View style={styles.form}>
                    {/* Title */}
                    <Text style={styles.greeting}>
                        {translate('hello')}
                    </Text>

                    {/* Error */}
                    <View style={{
                        height: errorMessage ? 50 : 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 30
                    }}>
                        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
                    </View>



                    <FormInput
                        title={translate('Email Address')}
                        onChangeText={email => setEmail(email)}
                        value={email}
                        contentType={"emailAddress"}
                    />

                    <View style={{ marginVertical: 20, }}>
                        <Text style={styles.inputTitle}>{translate('Password')}</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry={hidePassword ? true : false}
                            autoCapitalize="none"
                            onChangeText={password => setPassword(password)}
                            value={password}
                        ></TextInput>

                        <TouchableOpacity style={{
                            position: 'absolute', right: 5, top: 25,
                        }} onPress={onShowAndHidePassWord}>
                            <Entypo name={hidePassword ? "eye-with-line" : "eye"} size={25} color={Colors.Gray}></Entypo>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <CheckBox checked={checkSaveAccount} color={Colors.MainBlue} onPress={() => setCheckSaveAccount(!checkSaveAccount)} />
                        <Text style={{ marginLeft: 20, marginBottom: 10 }}>{translate('Save your account')}</Text>
                    </View>

                    <MainButton onPress={handleLogin} title={translate('Sign In')} waiting={waitingLogin} />

                    <TextHighLightButton
                        onPress={() => navigation.navigate("Register")}
                        normalText={translate('New to WorkNow')}
                        highLightText={translate('Sign Up')}
                    ></TextHighLightButton>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30 }}>
                        <TextHighLightButton
                            onPress={() => navigation.navigate('ForgotPassword')}
                            highLightText={translate('Forgot password')}
                        ></TextHighLightButton>

                        <TouchableOpacity
                            style={{ alignSelf: 'center', marginTop: 20, }}
                            onPress={() => setVisibleNoteModal(true)}
                        >
                            <Text>
                                <Text style={{ ...styles.highLightText, color: 'black' }}>{translate('Plaese note')}</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <NoteModal
                        visible={visibleNoteModal}
                        title={translate('Plaese note')}
                        onPressClose={() => setVisibleNoteModal(false)}
                    ></NoteModal>

                </View>

            </View>

        </View>
    );
}

export default LoginScreen;