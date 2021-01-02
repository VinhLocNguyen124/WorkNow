//use Strict
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    View,
    Text,
    Image,
    StatusBar,
    LayoutAnimation,
    KeyboardAvoidingView,
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


//Components
import MainButton from '../../components/MainButton';
import FormInput from './../../components/FormInput';
import TextHighLightButton from '../../components/TextHighLightButton';

const LoginScreen = () => {
    setI18nConfig();
    console.log('render Login Screen')
    //States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    //Navigation
    const navigation = useNavigation();

    //excute in the first render
    useEffect(() => {
        //similar with componentDidmount
        RNLocalize.addEventListener('change', setI18nConfig);

        return () => {
            //excute when comp unmount
            console.log("login unmount");
            RNLocalize.removeEventListener('change', setI18nConfig);
            setEmail("");
            setPassword("");
            setErrorMessage(null);
        }
    }, []);

    /**
     * useCallback được sử dụng để ngăn tạo mới function khi comp App rerender
     * useMemo được sử dụng để ngăn tạo mới data(biến, mảng,...) khi comp App rerender
    */
    const handleLogin = () => {
        if (email === "" || password === "") {
            FirebaseErrorRespond("empty fields", (mess) => setErrorMessage(mess));
        } else {
            auth().signInWithEmailAndPassword(email, password).catch(error => FirebaseErrorRespond(error.code, (mess) => setErrorMessage(mess)));
        }
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
                    <View style={styles.errorMessage}>
                        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
                    </View>

                    <FormInput
                        title={translate('Email Address')}
                        onChangeText={email => setEmail(email)}
                        value={email}
                    />

                    <FormInput
                        style={{ marginVertical: 30 }}
                        title={translate('Password')}
                        onChangeText={password => setPassword(password)}
                        value={password}
                    />

                    <MainButton onPress={handleLogin} title={translate('Sign In')} />

                    <TextHighLightButton
                        onPress={() => navigation.navigate("Register")}
                        normalText={translate('New to WorkNow')}
                        highLightText={translate('Sign Up')}
                    ></TextHighLightButton>
                </View>

            </View>

        </View>
    );
}

export default LoginScreen;