import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    LayoutAnimation
} from 'react-native';

//Firebase
import auth from '@react-native-firebase/auth';
import { FirebaseErrorRespond } from '../../helpers/FirebaseErrorRespond';

//Styles & Images & Icons
import BackGround from './../../assets/images/svg/BackGround';
import { styles } from '../Styles/styles';
import { Paths } from '../../constansts/path';

//Navigation
import { useNavigation } from '@react-navigation/native';

//helpers
import { setI18nConfig, translate } from '../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';

//Components
import MainButton from '../../components/MainButton';
import FormInput from '../../components/FormInput';
import TextHighLightButton from '../../components/TextHighLightButton';

//Consts



const RegisterScreen = () => {
    setI18nConfig();
    console.log('render Register Screen');
    //States
    const [name, setName] = useState("");
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
            console.log("register unmount");
            RNLocalize.removeEventListener('change', setI18nConfig);
            setName("");
            setEmail("");
            setPassword("");
            setErrorMessage(null);
        }
    }, []);


    const handleSignUp = () => {
        console.log(email, password, name);
        if (email === "" || password === "" || name === "") {
            FirebaseErrorRespond("empty fields", (mess) => setErrorMessage(mess));
        } else {
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(userCredentials => {
                    return userCredentials.user.updateProfile({
                        displayName: name
                    });
                })
                .catch(error => FirebaseErrorRespond(error.code, (message) => setErrorMessage(message)));
        }
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

                    <FormInput
                        style={{ marginBottom: 30 }}
                        title={translate('Password')}
                        onChangeText={password => setPassword(password)}
                        value={password}
                    />

                    <MainButton onPress={handleSignUp} title={translate('Sign Up')} />

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