import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    LayoutAnimation,
    Keyboard,
    TextInput,
    TouchableOpacity,
} from 'react-native';

//Firebase
import auth from '@react-native-firebase/auth';
import { FirebaseErrorRespond } from '../../helpers/FirebaseErrorRespond';

//Styles & Images & Icons
import BackGround from './../../assets/images/svg/BackGround';
import { styles } from '../Styles/styles';
import Entypo from 'react-native-vector-icons/Entypo';

//Navigation
import { useNavigation } from '@react-navigation/native';

//helpers
import { setI18nConfig, translate } from '../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { saveAccount } from '../../redux/actions/login';

//Components
import MainButton from '../../components/MainButton';
import FormInput from '../../components/FormInput';
import TextHighLightButton from '../../components/TextHighLightButton';
import { CheckBox } from 'native-base';

//Consts
import { Paths } from '../../constansts/path';
import { Colors } from '../../constansts/color';


const RegisterScreen = () => {
    setI18nConfig();
    console.log('render Register Screen');
    //States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [waitingRegister, setWaitingRegister] = useState(false);
    const [checkSaveAccount, setCheckSaveAccount] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);

    //Others
    const dispatch = useDispatch();
    const navigation = useNavigation();

    //--------------------------------Effects--------------------------------
    useEffect(() => {
        //similar with componentDidmount
        RNLocalize.addEventListener('change', setI18nConfig);

        return () => {
            //excute when comp unmount
            console.log("register unmount");
            RNLocalize.removeEventListener('change', setI18nConfig);
            setName("");
            setEmail("");
            setPassword("");
            setErrorMessage(null);
        }
    }, []);

    //--------------------------------Functions--------------------------------
    const handleSignUp = () => {
        console.log(email, password, name);
        Keyboard.dismiss();
        setWaitingRegister(true);

        if (email === "" || password === "" || name === "") {
            FirebaseErrorRespond("empty fields", (mess) => setErrorMessage(mess));
        } else {
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(userCredentials => {

                    setWaitingRegister(false);
                    if (checkSaveAccount) {
                        dispatch(saveAccount(email, password, true));
                    }

                    return userCredentials.user.updateProfile({
                        displayName: name
                    });
                })
                .catch(error => {
                    setWaitingRegister(false);
                    FirebaseErrorRespond(error.code, (message) => setErrorMessage(message));
                });
        }
    }

    const onShowAndHidePassWord = () => {
        setHidePassword(!hidePassword);
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" ></StatusBar>
            <BackGround path={Paths.Register}></BackGround>
            <BackGround
                path={Paths.RegisterUnder}
                style={{ position: 'absolute', bottom: -150, left: 0, right: 0 }}
                fill="#0099ff42" />

            <View style={styles.form_container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.normalLogo}
                        source={require('./../../assets/images/logo.png')} />
                </View>

                <View style={styles.errorMessage}>
                    {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
                </View>

                <View style={styles.form}>

                    <FormInput
                        title={translate('Full Name')}
                        onChangeText={name => setName(name)}
                        value={name}
                    />

                    <FormInput
                        style={{ marginVertical: 30 }}
                        title={translate('Email Address')}
                        onChangeText={email => setEmail(email)}
                        value={email}
                    />

                    <View style={{ marginBottom: 30, }}>
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
                            <Entypo name={hidePassword ? "eye-with-line" : "eye"} size={20} color={Colors.Gray}></Entypo>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <CheckBox checked={checkSaveAccount} color={Colors.MainBlue} onPress={() => setCheckSaveAccount(!checkSaveAccount)} />
                        <Text style={{ marginLeft: 20, marginBottom: 10 }}>Save your account</Text>
                    </View>

                    <MainButton onPress={handleSignUp} title={translate('Sign Up')} waiting={waitingRegister} />

                    <TextHighLightButton
                        onPress={() => navigation.navigate("Login")}
                        normalText={translate('Ready to start')}
                        highLightText={translate('Login')}
                    ></TextHighLightButton>

                </View>

            </View>

        </View>
    );
}

export default RegisterScreen;