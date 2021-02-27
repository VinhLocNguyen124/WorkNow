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
import { setDefaultSkill, onSortDefaultSkill, onAddSkill, onAddDefaultSkill } from '../../../redux/actions/listSkill';

//Components
import Delayed from './../../../components/Delayed';
import { Item } from "native-base";

const AddSkillModal = (props) => {
    //Props
    const { visible, onPressClose } = props;

    //States
    const [activeNumber, setActiveNumber] = useState(1);
    const [showInputAdd, setShowInputAdd] = useState(false);
    const [otherSkillName, setOtherSkillName] = useState('');
    const listDefaultSkill = useSelector(state => state.listSkill.listSkillDefault);
    const addSkillLoading = useSelector(state => state.listSkill.addSkillLoading);
    const globalUser = useSelector(state => state.globalUser.globalUser);


    //Others
    const dispatch = useDispatch();

    //------------------------Effects-----------------------------
    useEffect(() => {

        dispatch(setDefaultSkill());

        return () => {

        }
    }, [])


    //------------------------Functions---------------------------

    const onShow = () => {

    }

    const addSkill = (item) => {
        const userskill = {
            iduser: globalUser._id,
            idskill: item._id,
            name: item.name,
            bestskill: false
        }
        dispatch(onAddSkill(userskill, globalUser.email));

    }

    const _renderItem = useCallback(
        ({ item }) => (
            <Text key={item._id} style={{
                borderBottomColor: Colors.LightGray,
                borderBottomWidth: 1,
                paddingVertical: 12,
                width: '100%'
            }}
                onPress={() => addSkill(item)}
            >{item.name}</Text>
        )
        ,
        []
    );

    const keyExtractor = useCallback(
        item => item._id,
        []
    );

    const onPressButtonType = (code: number) => {

        switch (code) {
            case 1:
                setActiveNumber(1);
                dispatch(onSortDefaultSkill("all"));
                break;
            case 2:
                setActiveNumber(2);
                dispatch(onSortDefaultSkill("lg"));
                break;
            case 3:
                setActiveNumber(3);
                dispatch(onSortDefaultSkill("fw"));
                break;
            case 4:
                setActiveNumber(4);
                dispatch(onSortDefaultSkill("o"));
                break;

            default:
                break;
        }
    }

    const onPressAddOtherSkill = () => {
        if (otherSkillName !== '') {
            dispatch(onAddDefaultSkill(otherSkillName));
            setOtherSkillName('');
            setShowInputAdd(false);
        }

    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
        >
            <View style={styles.background_view}>
                <View style={styles.modalView}>

                    <Text style={{ ...styles.modalText }}>Choose a skill to add!</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginVertical: 10, }}>
                        <TouchableOpacity style={{
                            ...tempStyles.buttonCateg,
                            backgroundColor: activeNumber === 1 ? Colors.MainBlue : Colors.Gray
                        }} onPress={() => onPressButtonType(1)}>
                            <Text style={styles.textStyle}>All</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            ...tempStyles.buttonCateg,
                            backgroundColor: activeNumber === 2 ? Colors.MainBlue : Colors.Gray
                        }} onPress={() => onPressButtonType(2)}>
                            <Text style={styles.textStyle}>Language</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            ...tempStyles.buttonCateg,
                            backgroundColor: activeNumber === 3 ? Colors.MainBlue : Colors.Gray
                        }} onPress={() => onPressButtonType(3)}>
                            <Text style={styles.textStyle}>Framework</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            ...tempStyles.buttonCateg,
                            backgroundColor: activeNumber === 4 ? Colors.MainBlue : Colors.Gray
                        }} onPress={() => onPressButtonType(4)}>
                            <Text style={styles.textStyle}>Others</Text>
                        </TouchableOpacity>

                    </View>
                    {showInputAdd ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={{ flex: 1, fontSize: 15, }}
                            placeholder="add another skill"
                            onChangeText={text => setOtherSkillName(text)}
                            value={otherSkillName}
                        ></TextInput>
                        <TouchableOpacity style={{
                            ...tempStyles.buttonCateg,
                            backgroundColor: Colors.MainBlue,
                            borderRadius: 5,
                        }} onPress={onPressAddOtherSkill}>
                            <Text style={styles.textStyle}>Add</Text>
                        </TouchableOpacity>
                    </View> : null}


                    <Delayed wait={500} noneLoading={false}>

                        <FlatList
                            style={{ height: 300, width: '100%' }}
                            data={listDefaultSkill}
                            renderItem={_renderItem}
                            keyExtractor={keyExtractor}
                        ></FlatList>

                    </Delayed>

                    <TouchableOpacity
                        onPress={onPressClose}
                        style={{ position: 'absolute', top: 10, right: 10 }}
                    >
                        <Ionicons name="close-circle-outline" size={30} color={Colors.Gray}></Ionicons>
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                        onPress={() => setShowInputAdd(!showInputAdd)}
                        style={{ position: 'absolute', top: 10, left: 10 }}
                    >
                        <AntDesign name="plussquareo" size={30} color={Colors.MainBlue}></AntDesign>
                    </TouchableOpacity> */}

                    {addSkillLoading ?
                        <ActivityIndicator
                            size="small"
                            color={Colors.DarkTurquoise}
                            style={{ position: 'absolute', top: 10, left: 10 }}
                        ></ActivityIndicator> : null
                    }
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

AddSkillModal.propTypes = ({
    onPressClose: PropTypes.func,
    visible: PropTypes.bool,
});

AddSkillModal.defaultProps = ({
    onPressClose: null
});

export default React.memo(AddSkillModal);