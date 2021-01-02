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
    const { visible, onPressClose, item } = props;


    const onSaveChange = () => {

    }
    const onDeleteItem = () => {

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

                    <Text style={styles.modalText}>Edit {item ? (item.school ? 'education' : 'experience') : ''}</Text>

                    <TextInput
                        style={styles.input}
                        value={item ? (item.school ? item.school : item.major) : ''}
                    ></TextInput>

                    <TextInput
                        style={styles.input}
                        value={item ? (item.school ? item.major : item.company) : ''}
                    ></TextInput>

                    <TextInput
                        style={styles.input}
                        value={item ? (item.school ? item.session : item.position) : ''}
                    ></TextInput>

                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
                        <TouchableHighlight
                            style={styles.saveButton}
                            onPress={onSaveChange}
                        >
                            <Text style={styles.textStyle}>Save change</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={{ ...styles.saveButton, backgroundColor: Colors.Gray }}
                            onPress={onDeleteItem}
                        >
                            <Text style={styles.textStyle}>Delete</Text>
                        </TouchableHighlight>
                    </View>


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
    item: PropTypes.object,
});

AddExpModal.defaultProps = ({
    onPressClose: null
});

export default React.memo(AddExpModal);