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
    ToastAndroid,
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
import CodeConfirmModal from './components/CodeConfirmModal';

//consts
import { Colors } from '../../constansts/color';

const ForgotPasswordScreen = () => {
    setI18nConfig();
    //States
    const [errorMessage, setErrorMessage] = useState(null);
    const [email, setEmail] = useState('');
    // const [newPassword, setNewPassword] = useState('');
    const [visibleModal, setVisibleModal] = useState(false);
    const [waiting, setWaiting] = useState(false);

    //Others
    const dispatch = useDispatch();
    const navigation = useNavigation();

    //-----------------------------------Effects-----------------------------------
    useEffect(() => {
        //similar with componentDidmount

        RNLocalize.addEventListener('change', setI18nConfig);

        return () => {
            //excute when comp unmount
            RNLocalize.removeEventListener('change', setI18nConfig);

        }
    }, []);

    //-----------------------------------Functions-----------------------------------
    const onSendConfirmCodeViaEmail = () => {
        Keyboard.dismiss();
        setWaiting(true);
        if (email === "") {
            setWaiting(false);
            FirebaseErrorRespond("empty fields", (mess) => setErrorMessage(mess));
        } else {
            auth().sendPasswordResetEmail(email, null)
                .then(value => {
                    setWaiting(false);
                    ToastAndroid.show("The change password link has sent via your email, please check it !", ToastAndroid.LONG);
                    navigation.navigate('Login');
                    // setVisibleModal(true);
                })
                .catch(error => {
                    FirebaseErrorRespond(error.code, (mess) => setErrorMessage(mess));
                    setWaiting(false);
                });
        }
    }


    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" ></StatusBar>
            <BackGround path={Paths.ResetPassword} />
            <BackGround
                path={Paths.ResetPasswordUnder}
                style={{ position: 'absolute', bottom: -90, left: 0, right: 0 }}
                fill="#0099ff42" />

            <View style={styles.form_container}>

                <View style={styles.form}>
                    {/* Title */}
                    <Text style={styles.greeting}>
                        {translate('Reset password')}
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
                        title={translate('Type email address to send change password link')}
                        onChangeText={email => setEmail(email)}
                        value={email}
                        style={{ marginBottom: 20 }}
                    />

                    {/* <FormInput
                        title={translate('Type new password')}
                        onChangeText={password => setNewPassword(password)}
                        value={newPassword}
                        style={{ marginBottom: 20 }}
                    /> */}

                    <MainButton title={translate('Send link via email')} onPress={onSendConfirmCodeViaEmail} waiting={waiting} />



                    <TextHighLightButton
                        onPress={() => navigation.navigate("Login")}
                        normalText={translate('Back to')}
                        highLightText={translate('Login')}
                    ></TextHighLightButton>




                </View>

                {/* <CodeConfirmModal
                    visible={visibleModal}
                    title={"Confirm code"}
                    newPassword={newPassword}
                    onPressClose={() => setVisibleModal(false)}
                ></CodeConfirmModal> */}

            </View>

        </View>
    );
}

export default ForgotPasswordScreen;