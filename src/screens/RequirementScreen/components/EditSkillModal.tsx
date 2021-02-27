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
} from "react-native";
import PropTypes from 'prop-types';
import { Colors } from "../../../constansts/color";

//Icons & Styles
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles } from '../../BackgroundScreen/components/styles';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { onChangeImportantSkill, onDeleteSkill } from '../../../redux/actions/listSkill';

//Components
import Delayed from './../../../components/Delayed';


const iconActive = <AntDesign name="star" size={25} color={'orange'}></AntDesign>
const iconInactive = <AntDesign name="staro" size={25} color={Colors.Gray}></AntDesign>

const EditSkillModal = (props) => {
    //Props
    const { visible, onPressClose, skill } = props;


    //States
    const globalUser = useSelector(state => state.globalUser.globalUser);
    const deleteSkillLoading = useSelector(state => state.listSkill.deleteSkillLoading);

    //Others
    const dispatch = useDispatch();

    //------------------------Effects-----------------------------


    //------------------------Functions---------------------------
    const onPressChangeImportantSkill = () => {
        const isImportant = !skill.important;
        dispatch(onChangeImportantSkill(isImportant, skill._id, globalUser.email));
        onPressClose();
    }

    const onPressDeleteSkill = () => {
        dispatch(onDeleteSkill(skill._id, globalUser.email));
    }


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
        >
            <View style={styles.background_view}>
                <View style={styles.modalView}>

                    <Text style={{ ...styles.modalText }}>Edit skill!</Text>

                    <View style={{ flexDirection: 'column', backgroundColor: 'white', width: '100%', marginVertical: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Skill name: <Text style={{ fontWeight: '100' }}>{skill.name}</Text></Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Mark as your best skill: </Text>
                            <TouchableOpacity onPress={onPressChangeImportantSkill}>{skill.important ? iconActive : iconInactive}</TouchableOpacity>
                        </View>


                    </View>



                    <TouchableOpacity style={{
                        ...tempStyles.buttonCateg,
                        backgroundColor: Colors.Gray,
                        marginTop: 10

                    }} onPress={onPressDeleteSkill}>
                        {deleteSkillLoading ?
                            <ActivityIndicator size="small" color={'white'}></ActivityIndicator>
                            :
                            <Text style={{ ...styles.textStyle, fontSize: 18 }}>Delete</Text>
                        }

                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={onPressClose}
                        style={{ position: 'absolute', top: 10, right: 10 }}
                    >
                        <Ionicons name="close-circle-outline" size={30} color={Colors.Gray}></Ionicons>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal >
    );
};

const tempStyles = StyleSheet.create({
    buttonCateg: {
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 20,
        elevation: 5,
        marginRight: 10
    }
})

EditSkillModal.propTypes = ({
    onPressClose: PropTypes.func,
    visible: PropTypes.bool,
    skill: PropTypes.object,
});

EditSkillModal.defaultProps = ({
    onPressClose: null
});

export default React.memo(EditSkillModal);