import React, { useState, useCallback, useEffect, useRef } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    TextInput,
    ActivityIndicator,
    ToastAndroid,
    FlatList,
} from "react-native";
import PropTypes from 'prop-types';
import { Colors } from "../../../constansts/color";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { onSearchCompany } from '../../../redux/actions/company';
import { addExperience } from '../../../redux/actions/globalUser';

//Consts
import { Positions } from '../../../constansts/listPosition';


const AddExpModal = (props) => {
    //Props
    const { visible, onPressClose } = props;

    //State
    const [major, setMajor] = useState('');
    const [company, setCompany] = useState({ _id: '', name: '' });
    const [position, setPosition] = useState({ _id: '', name: '' });
    const [expYear, setExpYear] = useState('');

    const [showList, setShowList] = useState(false);
    const [showListPosition, setShowListPosition] = useState(false);
    const [listPosition, setListPosition] = useState(Positions);
    const listCompany = useSelector(state => state.company.listCompany);
    const globalUser = useSelector(state => state.globalUser.globalUser);
    const addExperienceLoading = useSelector(state => state.globalUser.addExperienceLoading);

    //Others
    const dispatch = useDispatch();
    const typingTimeout = useRef(null)

    //------------------------------------Effects-----------------------------------------
    const onShowModal = () => {
        setMajor('');
        setCompany({ _id: '', name: '' });
        setPosition({ _id: '', name: '' });
        setExpYear('');
    }

    //------------------------------------Functions-----------------------------------------
    const onSaveChange = () => {
        if (company.name === "" || position.name === "" || major === "" || expYear === "") {
            ToastAndroid.show("Vui lòng điền đủ các trường !!", ToastAndroid.SHORT);
        } else {
            const usercompany = {
                iduser: globalUser._id,
                companyname: company.name,
                companyid: company._id,
                positionname: position.name,
                positionid: position._id,
                major: major,
                expyear: expYear,
            }
            dispatch(addExperience(usercompany, globalUser.email));
        }
    }

    const onChangeTextSearchCompany = (text) => {
        setCompany({ _id: '', name: text });
        setShowList(true);
        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current);
        }

        typingTimeout.current = setTimeout(() => {
            dispatch(onSearchCompany(text));
        }, 500);
    }

    const onChangeTextSearchPosition = (text) => {
        setPosition({ _id: '', name: text })
        setShowListPosition(true);
        setListPosition(Positions.filter((position) => {
            return position.name.toLowerCase().trim().search(text.toLowerCase().trim()) !== -1;
        }));
    }

    const _renderItem = useCallback(
        ({ item }) => (
            <TouchableOpacity onPress={() => {
                setCompany(item);
                setShowList(false);
            }}>
                <Text
                    key={item._id}
                    style={{ padding: 5 }}
                >{item.name}</Text>
            </TouchableOpacity>
        ), []);

    const keyExtractor = useCallback(
        item => item._id, []);

    const _renderItemPosition = useCallback(
        ({ item }) => (
            <View
                onStartShouldSetResponder={() => {
                    return true;
                }}
            >
                <TouchableOpacity onPress={() => {
                    setPosition(item);
                    setShowListPosition(false);
                }}>
                    <Text
                        key={item._id}
                        style={{ padding: 5 }}
                    >{item.name}</Text>
                </TouchableOpacity>
            </View>
        ), []);

    const keyExtractorPosition = useCallback(
        item => item._id, []);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onShow={onShowModal}
        >
            <View style={styles.background_view}>

                <View style={styles.modalView}>

                    <Text style={styles.modalText}>Adding Experience!</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Your major"
                        onFocus={() => {
                            setShowList(false);
                            setShowListPosition(false);
                        }}
                        onChangeText={text => setMajor(text)}
                        value={major}
                    ></TextInput>


                    <TextInput
                        style={styles.input}
                        placeholder="Your company name"
                        onChangeText={onChangeTextSearchCompany}
                        onFocus={() => setShowList(true)}
                        value={company.name}
                    ></TextInput>


                    <TextInput
                        style={styles.input}
                        placeholder="Your position"
                        onFocus={() => {
                            setShowList(false);
                            setShowListPosition(true);
                        }}
                        onChangeText={onChangeTextSearchPosition}
                        value={position.name}
                    ></TextInput>

                    <TextInput
                        style={styles.input}
                        placeholder="Your years of experience"
                        onFocus={() => {
                            setShowList(false);
                            setShowListPosition(false);
                        }}
                        onChangeText={text => setExpYear(text)}
                        value={expYear}
                    ></TextInput>

                    <TouchableHighlight
                        style={styles.saveButton}
                        onPress={onSaveChange}
                    >
                        {addExperienceLoading ?
                            <ActivityIndicator size="small" color={'white'}></ActivityIndicator>
                            :
                            <Text style={styles.textStyle}>Save change</Text>
                        }

                    </TouchableHighlight>

                    <TouchableOpacity
                        onPress={onPressClose}
                        style={{ position: 'absolute', top: 10, right: 10 }}
                    >
                        <Ionicons name="close-circle-outline" size={30} color={Colors.Gray}></Ionicons>
                    </TouchableOpacity>

                    {showList ?
                        <FlatList
                            style={{
                                maxHeight: 150, position: 'absolute', top: 205, right: 0, left: 0,
                                backgroundColor: 'white', marginHorizontal: 20,
                                padding: 10
                            }}
                            data={listCompany}
                            renderItem={_renderItem}
                            keyExtractor={keyExtractor}
                            keyboardShouldPersistTaps='handled'
                        ></FlatList>
                        : null
                    }

                    {showListPosition ?
                        <FlatList
                            style={{
                                maxHeight: 120, position: 'absolute', top: 265, right: 0, left: 0,
                                backgroundColor: 'white', marginHorizontal: 20,
                                padding: 10
                            }}
                            data={listPosition}
                            renderItem={_renderItemPosition}
                            keyExtractor={keyExtractorPosition}
                            keyboardShouldPersistTaps='handled'
                        ></FlatList>
                        : null
                    }

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