import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput,
    Modal,
    ActivityIndicator,
} from 'react-native';

//Firebase

//Styles & Images & Icons
import { styles } from '../../Styles/styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//Navigation
import { useNavigation, useRoute } from '@react-navigation/native';

//helpers
import { setI18nConfig, translate } from '../../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';

import moment from 'moment';


//hooks

//redux & actions
import { useSelector, useDispatch } from 'react-redux';
import { updateComment, deleteComment } from '../../../redux/actions/post';

//Components
import TextHighLight from '../../../components/TextHighLight';

//Consts
import { Colors } from '../../../constansts/color';
import { Dimens } from '../../../constansts/dimension';


const CommentItem = (props) => {
    //Props
    const { _id, username, urlavatar, date, cmtcontent, email, idpost, formal } = props;

    //States
    const globalUser = useSelector(state => state.globalUser.globalUser);
    const loadingUpdateComment = useSelector(state => state.post.loadingUpdateComment);
    const [modalVisible, setModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [updateCmtContent, setUpdateCmtContent] = useState('');

    //others
    const navigation = useNavigation();
    const dispatch = useDispatch();

    //-------------------------Effects-----------------------------------

    useEffect(() => {
        setUpdateCmtContent(cmtcontent);
        return () => {

        }
    }, []);

    //-------------------------Functions---------------------------------



    //--------------------------------------------------


    return (
        <TouchableOpacity style={{ ...styles.container, marginVertical: 0 }} onLongPress={() => setModalVisible(true)}>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginHorizontal: 10,
                marginTop: 10,
            }}>

                {urlavatar !== "" ?
                    <TouchableOpacity onPress={() => {
                        globalUser.email === email ?
                            navigation.navigate("Profile")
                            :
                            navigation.navigate("GeneralProfile", { _email: email })
                    }}>
                        <Image source={{ uri: urlavatar }}
                            style={styles.avatarSmall} />
                    </TouchableOpacity>
                    :
                    <View style={{
                        height: 48,
                        width: 48,
                        borderRadius: 50,
                        borderWidth: 1,
                        marginRight: 15,
                        borderColor: Colors.LightGray,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <FontAwesome5 name="user-check" size={20} color={Colors.Gray}></FontAwesome5>
                    </View>
                }

                <View style={{
                    flexDirection: 'column', justifyContent: 'space-between',
                    flex: 1
                }}>
                    <TextHighLight
                        mainText={username}
                        subText={" - " + moment(date).fromNow()}
                        fontSizeMT={14}
                        fontSizeST={10}
                        colorST={Colors.Gray}
                        onPress={() => {
                            globalUser.email === email ?
                                navigation.navigate("Profile")
                                :
                                navigation.navigate("GeneralProfile", { _email: email })
                        }}
                    />
                    <Text style={{ fontSize: 12, padding: 5, marginTop: 5, backgroundColor: '#f2f2f2', borderRadius: 10, }}>{cmtcontent}</Text>

                </View>
            </View>

            {
                globalUser.email === email && modalVisible ?
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <View style={tempStyles.pi_all_container}>

                            {
                                editMode ? null : <TouchableOpacity style={tempStyles.pi_outside_touch} onPress={() => setModalVisible(false)}></TouchableOpacity>
                            }

                            <View style={tempStyles.pi_main_container}>

                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                                    {
                                        editMode ?
                                            <TextInput
                                                style={{
                                                    flex: 1,
                                                    minHeight: 40,
                                                    fontSize: 12,
                                                    padding: 5,
                                                    marginTop: 5,
                                                    backgroundColor: 'white',
                                                    borderRadius: 10,
                                                    borderWidth: 1,
                                                    borderColor: Colors.Gray
                                                }}
                                                multiline={true}
                                                onChangeText={text => setUpdateCmtContent(text)}
                                                autoFocus={editMode}
                                                onBlur={() => setEditMode(false)}
                                                value={updateCmtContent}
                                            ></TextInput>
                                            :
                                            <Text style={{ fontSize: 12, padding: 5, marginTop: 5, backgroundColor: '#f2f2f2', borderRadius: 10, flex: 1 }}>{updateCmtContent}</Text>
                                    }

                                    {
                                        loadingUpdateComment ?
                                            <View style={{ padding: 10 }}>
                                                <ActivityIndicator size="small" color={Colors.MainBlue}></ActivityIndicator>
                                            </View>
                                            :
                                            <TouchableOpacity style={{ padding: 10 }} disabled={false} onPress={() => dispatch(updateComment(email, idpost, _id, updateCmtContent, formal))}>
                                                <AntDesign name="reload1" size={21} color={Colors.MainBlue}></AntDesign>
                                            </TouchableOpacity>
                                    }

                                </View>

                                <View style={tempStyles.pi_header}>
                                    <TouchableOpacity onPress={() => setEditMode(!editMode)}>
                                        <AntDesign name="edit" size={25} color={Colors.Gray}></AntDesign>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => dispatch(deleteComment(email, idpost, _id))}>
                                        <AntDesign name="delete" size={25} color={Colors.Gray}></AntDesign>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity style={tempStyles.pi_outside_touch} onPress={() => {
                                setModalVisible(false);
                                setEditMode(false)
                            }}></TouchableOpacity>

                        </View>
                    </Modal> : null
            }


        </TouchableOpacity>
    );
}

const tempStyles = StyleSheet.create({
    pi_all_container: {
        backgroundColor: 'rgba(0,0,0,0.5)', height: Dimens.heightScreen
    },
    pi_outside_touch: {
        flex: 1, backgroundColor: 'transparent',
    },
    pi_main_container: {
        padding: 10,
        backgroundColor: 'white',
    },
    pi_header: {
        padding: 10,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: Colors.LightGray
    },
});


export default React.memo(CommentItem);