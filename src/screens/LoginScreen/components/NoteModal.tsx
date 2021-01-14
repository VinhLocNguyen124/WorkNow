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

//Components
import Delayed from './../../../components/Delayed';

//consts
import { Notes } from './../../../constansts/notes';

const NoteModal = (props) => {
    //Props
    const { visible, onPressClose, title } = props;

    //States


    //Others
    const dispatch = useDispatch();

    //------------------------Effects-----------------------------
    useEffect(() => {

        return () => {

        }
    }, [])


    //------------------------Functions---------------------------

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
                    height: '60%',
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

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={{ textAlign: 'justify', marginHorizontal: 10, marginTop: 15, fontWeight: 'bold', fontSize: 13 }}>{Notes.intro}</Text>
                        <Text style={{ textAlign: 'justify', marginHorizontal: 20, marginTop: 10 }}>{Notes.info}</Text>
                        <Text style={{ textAlign: 'justify', marginHorizontal: 20, marginTop: 10 }}>{Notes.email}</Text>
                        <Text style={{ textAlign: 'justify', marginHorizontal: 20, marginTop: 10 }}>{Notes.private}</Text>
                    </ScrollView>

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

NoteModal.propTypes = ({
    onPressClose: PropTypes.func,
    visible: PropTypes.bool,
    title: PropTypes.string,
});

NoteModal.defaultProps = ({
    onPressClose: null
});

export default React.memo(NoteModal);