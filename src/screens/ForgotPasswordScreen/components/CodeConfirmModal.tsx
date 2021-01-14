import React, { useState, useCallback, useEffect } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    TextInput,
    FlatList,
    ActivityIndicator,
    ScrollView,
    Keyboard
} from "react-native";
import PropTypes from 'prop-types';


//Icons & Styles
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles } from '../../BackgroundScreen/components/styles';

//helpers
import { FirebaseErrorRespond } from '../../../helpers/FirebaseErrorRespond';
import auth from '@react-native-firebase/auth';

//redux
import { useSelector, useDispatch } from 'react-redux';

//Components
import Delayed from './../../../components/Delayed';
import MainButton from '../../../components/MainButton';

//consts
import { Notes } from './../../../constansts/notes';
import { Colors } from "../../../constansts/color";

const CodeConfirmModal = (props) => {
    //Props
    const { visible, onPressClose, title, newPassword } = props;

    //States
    const [waiting, setWaiting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [confirmCode, setConfirmCode] = useState('');

    //Others
    const dispatch = useDispatch();

    //------------------------Effects-----------------------------
    useEffect(() => {

        return () => {

        }
    }, [])

    //------------------------Functions---------------------------

    const onConfirmCode = () => {
        Keyboard.dismiss();
        setWaiting(true);

        if (confirmCode === "") {
            setWaiting(false);
            FirebaseErrorRespond("empty fields", (mess) => setErrorMessage(mess));
        } else {
            auth().confirmPasswordReset(confirmCode, newPassword)
                .then(value => {
                    setWaiting(false);
                    onPressClose();
                })
                .catch(error => {
                    FirebaseErrorRespond(error.code, (mess) => setErrorMessage(mess));
                    setWaiting(false);
                });
        }
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
        >
            <View style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0,0.7)',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View style={{
                    width: '80%',
                    backgroundColor: "white",
                    borderRadius: 10,
                    paddingBottom: 30
                }}>

                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50,
                        elevation: 10, backgroundColor: 'white', borderTopRightRadius: 10, borderTopLeftRadius: 10, paddingHorizontal: 10
                    }}>
                        <TouchableOpacity
                            onPress={onPressClose}
                            style={{}}
                        >
                            <Ionicons name="arrow-back" size={25} color={Colors.Gray}></Ionicons>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{title}</Text>
                        <View style={{ width: 20 }}></View>
                    </View>

                    <TextInput
                        style={{
                            borderColor: Colors.Gray, borderWidth: 1, borderRadius: 10,
                            marginHorizontal: 30, backgroundColor: 'white', paddingHorizontal: 10, marginVertical: 20
                        }}
                        placeholder={"type confirm code here ..."}
                        onChangeText={text => setConfirmCode(text)}
                        value={confirmCode}
                    ></TextInput>

                    <MainButton
                        title={"Confirm"}
                        onPress={onConfirmCode}
                        waiting={waiting}
                    ></MainButton>

                </View>

            </View>
        </Modal >
    );
};

const tempStyles = StyleSheet.create({
    buttonCateg: {
        borderRadius: 5,
        padding: 5,
        elevation: 5,
        marginRight: 10
    }
})

CodeConfirmModal.propTypes = ({
    onPressClose: PropTypes.func,
    visible: PropTypes.bool,
    title: PropTypes.string,
    newPassword: PropTypes.string,
});

CodeConfirmModal.defaultProps = ({
    onPressClose: null
});

export default React.memo(CodeConfirmModal);