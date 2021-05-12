import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    ActivityIndicator,
    Modal,
} from 'react-native';

//Styles & Images & Icons
import { styles } from '../../Styles/styles';
import { tempStyles } from '../../HomeScreen/Styles/index';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//helpers
import { setI18nConfig, translate } from '../../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';

//Components
import BottomSheetItem from '../../PostScreen/Components/BottomSheetItem';

//Consts
import { Colors } from '../../../constansts/color';
import { Dimens } from '../../../constansts/dimension';
import PropTypes from 'prop-types';

//redux & actions
import { useSelector, useDispatch } from 'react-redux';
import { deletePost, updateFormalMode, updateSeescope, updateActive } from '../../../redux/actions/post';

//Navigation
import { useNavigation } from '@react-navigation/native';

const SettingPostModal = (props) => {

    //Props
    const { visible, onTouchOutside, idpost, formal, onSelectEditPost, seescope, active } = props;

    //States
    const loadingDeletePost = useSelector(state => state.post.loadingDeletePost);
    const globalUser = useSelector(state => state.globalUser.globalUser);

    //Others
    const dispatch = useDispatch();
    const navigation = useNavigation();

    //-----------------------------------Effects-----------------------------------------
    useEffect(() => {


        return () => {

        }
    }, []);
    //-----------------------------------Functions---------------------------------------


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
        >
            <View style={tempStyles.pi_all_container}>
                <TouchableOpacity style={tempStyles.pi_outside_touch} onPress={onTouchOutside}>

                </TouchableOpacity>

                <View style={tempStyles.pi_main_container}>
                    <View style={tempStyles.pi_header}>
                        <View style={tempStyles.pi_horizontal_bar}></View>
                    </View>

                    <BottomSheetItem
                        icon={<AntDesign name="edit" size={20} color={Colors.Gray}></AntDesign>}
                        label={"Edit this post"}
                        onPress={onSelectEditPost}
                    ></BottomSheetItem>


                    <BottomSheetItem
                        icon={<Ionicons name={seescope === "anyone" ? "earth-sharp" : "people"} size={20} color={Colors.Gray}></Ionicons>}
                        label={seescope === "anyone" ? "Who can see this post: Anyone" : "Who can see this post: Connection only"}
                        onPress={() => dispatch(updateSeescope(globalUser.email, idpost))}
                    ></BottomSheetItem>


                    {
                        active ?
                            <BottomSheetItem
                                icon={<Ionicons name="notifications-off" size={20} color={Colors.Gray}></Ionicons>}
                                label={"Don't recieve notification from this post"}
                                onPress={() => dispatch(updateActive(globalUser.email, idpost))}
                            ></BottomSheetItem>
                            :
                            <BottomSheetItem
                                icon={<Ionicons name="notifications" size={20} color={Colors.Gray}></Ionicons>}
                                label={"Turn on notification from this post"}
                                onPress={() => dispatch(updateActive(globalUser.email, idpost))}
                            ></BottomSheetItem>
                    }

                    {formal ?
                        <BottomSheetItem
                            icon={<Feather name="shield-off" size={20} color={Colors.Gray}></Feather>}
                            label={"Make this post natural"}
                            onPress={() => {
                                dispatch(updateFormalMode(globalUser.email, idpost));
                                onTouchOutside();
                            }}
                        ></BottomSheetItem>
                        :
                        <BottomSheetItem
                            icon={<Feather name="shield" size={20} color={Colors.Gray}></Feather>}
                            label={"Keep this post in formal"}
                            onPress={() => {
                                dispatch(updateFormalMode(globalUser.email, idpost));
                                onTouchOutside();
                            }}
                        ></BottomSheetItem>
                    }

                    <BottomSheetItem
                        icon={loadingDeletePost ? <ActivityIndicator size={20} color={Colors.MainBlue} /> : <AntDesign name="delete" size={20} color={Colors.Gray}></AntDesign>}
                        label={"Delete post"}
                        onPress={() => dispatch(deletePost(globalUser.email, idpost, navigation))}
                    ></BottomSheetItem>

                    <View style={{ ...tempStyles.pi_header, height: 40 }} />

                </View>
            </View>
        </Modal>

    );
}

SettingPostModal.propTypes = ({
    visible: PropTypes.bool,
    idpost: PropTypes.string,
    formal: PropTypes.bool,
    active: PropTypes.bool,
    seescope: PropTypes.string,
    onTouchOutside: PropTypes.func,
    onSelectEditPost: PropTypes.func
});

SettingPostModal.defaultProps = ({

});

export default React.memo(SettingPostModal);