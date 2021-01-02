import React, { useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    TextInput,
} from "react-native";
import PropTypes from 'prop-types';
import { Colors } from "../../../constansts/color";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';


const AddExpModal = (props) => {
    const { visible, onPressClose } = props;


    const onSaveChange = () => {

    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
        >
            <View style={styles.background_view}>

                <View style={styles.modalView}>

                    <Text style={styles.modalText}>Adding Experience!</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Your major"
                    ></TextInput>

                    <TextInput
                        style={styles.input}
                        placeholder="Your company name"
                    ></TextInput>

                    <TextInput
                        style={styles.input}
                        placeholder="Your position"
                    ></TextInput>

                    <TouchableHighlight
                        style={styles.saveButton}
                        onPress={onSaveChange}
                    >
                        <Text style={styles.textStyle}>Save change</Text>
                    </TouchableHighlight>

                    <TouchableOpacity
                        onPress={onPressClose}
                        style={{ position: 'absolute', top: 10, right: 10 }}
                    >
                        <Ionicons name="close-circle-outline" size={30} color={Colors.Gray}></Ionicons>
                    </TouchableOpacity>

                </View>

            </View>
        </Modal>
    );
};


AddExpModal.propTypes = ({
    onPressClose: PropTypes.func,
    visible: PropTypes.bool,
});

AddExpModal.defaultProps = ({
    onPressClose: null
});

export default React.memo(AddExpModal);