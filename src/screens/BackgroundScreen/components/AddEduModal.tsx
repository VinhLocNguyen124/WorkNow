import React, { useState, useCallback } from "react";
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

const AddModal = (props) => {
    const { visible, onPressClose } = props;

    const onSaveChange = () => {

    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}
        >
            <View style={styles.background_view}>
                <View style={styles.modalView}>


                    <Text style={styles.modalText}>Adding Education!</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Your school name"
                    ></TextInput>

                    <TextInput
                        style={styles.input}
                        placeholder="Your major"
                    ></TextInput>

                    <Text style={{ fontSize: 15, color: Colors.Gray, alignSelf: 'flex-start', marginTop: 20, marginLeft: 5 }}>School years</Text>
                    <View style={{ marginTop: 5, height: 40, flexDirection: 'row', width: '100%', alignItems: 'center', paddingHorizontal: 10 }}>
                        <Text>From:</Text>
                        <TextInput
                            keyboardType="numeric"
                            style={{ textAlign: 'center', borderWidth: 1, borderColor: Colors.Gray, borderRadius: 5, flex: 1, marginHorizontal: 10 }}
                        ></TextInput>
                        <Text>To:</Text>
                        <TextInput
                            keyboardType="numeric"
                            style={{ textAlign: 'center', borderWidth: 1, borderColor: Colors.Gray, borderRadius: 5, flex: 1, marginLeft: 10 }}
                        ></TextInput>
                    </View>

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


AddModal.propTypes = ({
    onPressClose: PropTypes.func,
    visible: PropTypes.bool,
});

AddModal.defaultProps = ({
    onPressClose: null
});

export default React.memo(AddModal);