import React, { useState, useCallback } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    FlatList,
    ActivityIndicator,
    TextInput,
} from "react-native";
import PropTypes from 'prop-types';

//Style & Icon
import { Colors } from "../../../constansts/color";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

//Consts
import { listUni } from '../../../constansts/listUni';

//helper
import { returnExpectUniArray } from '../../../helpers/ArrayHandling';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { updateEducation, deleteEducation } from '../../../redux/actions/globalUser';

const EditEduModal = (props) => {
    //Props
    const { visible, onPressClose, item } = props;

    //States
    const [schoolName, setSchoolName] = useState('');
    const [major, setMajor] = useState('');
    const [yearStart, setYearStart] = useState('');
    const [yearEnd, setYearEnd] = useState('');

    const [showList, setShowList] = useState(false);
    const [listSchool, setListSchool] = useState(returnExpectUniArray(listUni));
    const globalUser = useSelector(state => state.globalUser.globalUser);
    const updateEducationLoading = useSelector(state => state.globalUser.updateEducationLoading);
    const deleteEducationLoading = useSelector(state => state.globalUser.deleteEducationLoading);

    //Others
    const dispatch = useDispatch();

    //----------------------------Effects------------------------------
    const onShowModal = () => {
        setSchoolName(item.schoolname);
        setMajor(item.major);
        setYearStart(item.schoolyear.slice(0, 4));
        setYearEnd(item.schoolyear.slice(-4, 11));
    }


    //----------------------------Functions----------------------------
    const onDeleteItem = () => {
        dispatch(deleteEducation(item._id, globalUser.email));
    }

    const onSaveChange = () => {
        const userschool = {
            iduserschool: item._id,
            iduser: globalUser._id,
            schoolname: schoolName,
            major: major,
            schoolyear: yearStart + " - " + yearEnd
        }
        dispatch(updateEducation(userschool, globalUser.email));
    }

    const onChangeTextSearchSchool = (text) => {
        setSchoolName(text);
        setShowList(true);
        setListSchool(returnExpectUniArray(listUni).filter((school) => {
            return school.name.toLowerCase().trim().search(text.toLowerCase().trim()) !== -1;
        }));
    }

    const _renderItem = useCallback(
        ({ item }) => (
            <Text
                key={item.id}
                style={{ fontSize: 12, padding: 10, borderBottomWidth: 1, borderBottomColor: Colors.Gray }}
                onPress={() => {
                    setSchoolName(item.name);
                    setShowList(false);
                }}
            >{item.name}</Text>
        )
        ,
        []
    );

    const keyExtractor = useCallback(
        item => item.id.toString(),
        []
    );

    //------------------------------------------------------------------
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onShow={onShowModal}
        >
            <View style={styles.background_view}>
                <View style={styles.modalView}>

                    <Text style={styles.modalText}>Edit Education!</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Your school name"
                        onFocus={() => {
                            setShowList(true);
                        }}
                        onChangeText={onChangeTextSearchSchool}
                        value={schoolName}
                    ></TextInput>

                    <TextInput
                        style={styles.input}
                        placeholder="Your major"
                        onFocus={() => {
                            setShowList(false);
                        }}
                        onChangeText={text => setMajor(text)}
                        value={major}
                    ></TextInput>

                    <Text style={{ fontSize: 15, color: Colors.Gray, alignSelf: 'flex-start', marginTop: 20, marginLeft: 5 }}>School years</Text>
                    <View style={{ marginTop: 5, height: 40, flexDirection: 'row', width: '100%', alignItems: 'center', paddingHorizontal: 10 }}>
                        <Text>From:</Text>
                        <TextInput
                            keyboardType="numeric"
                            style={{ textAlign: 'center', borderWidth: 1, borderColor: Colors.Gray, borderRadius: 5, flex: 1, marginHorizontal: 10 }}
                            onFocus={() => {
                                setShowList(false);
                            }}
                            onChangeText={text => setYearStart(text)}
                            value={yearStart}
                        ></TextInput>
                        <Text>To:</Text>
                        <TextInput
                            keyboardType="numeric"
                            style={{ textAlign: 'center', borderWidth: 1, borderColor: Colors.Gray, borderRadius: 5, flex: 1, marginLeft: 10 }}
                            onFocus={() => {
                                setShowList(false);
                            }}
                            onChangeText={text => setYearEnd(text)}
                            value={yearEnd}
                        ></TextInput>
                    </View>

                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
                        <TouchableHighlight
                            style={styles.saveButton}
                            onPress={onSaveChange}
                        >
                            {updateEducationLoading ?
                                <ActivityIndicator size="small" color={'white'}></ActivityIndicator>
                                :
                                <Text style={styles.textStyle}>Save change</Text>
                            }
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={{ ...styles.saveButton, backgroundColor: Colors.Gray }}
                            onPress={onDeleteItem}
                        >
                            {deleteEducationLoading ?
                                <ActivityIndicator size="small" color={'white'}></ActivityIndicator>
                                :
                                <Text style={styles.textStyle}>Delete</Text>
                            }

                        </TouchableHighlight>
                    </View>

                    <TouchableOpacity
                        onPress={onPressClose}
                        style={{ position: 'absolute', top: 10, right: 10 }}
                    >
                        <Ionicons name="close-circle-outline" size={30} color={Colors.Gray}></Ionicons>
                    </TouchableOpacity>

                    {showList ?
                        <FlatList
                            style={{
                                maxHeight: 230, position: 'absolute', top: 145, right: 0, left: 0,
                                backgroundColor: 'white', marginHorizontal: 20,
                                padding: 10
                            }}
                            data={listSchool}
                            renderItem={_renderItem}
                            keyExtractor={keyExtractor}
                            keyboardShouldPersistTaps='handled'
                        ></FlatList>
                        : null
                    }

                </View>
            </View>
        </Modal>
    );
};


EditEduModal.propTypes = ({
    onPressClose: PropTypes.func,
    visible: PropTypes.bool,
    item: PropTypes.any,
});

EditEduModal.defaultProps = ({
    onPressClose: null
});

export default React.memo(EditEduModal);