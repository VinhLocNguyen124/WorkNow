import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    Share,
    Modal,
} from 'react-native';

import auth from '@react-native-firebase/auth';

//Styles & Images & Icons
import { styles } from '../../Styles/styles';
import { tempStyles } from '../Styles/index';
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
import PropTypes from 'prop-types';

//redux & actions
import { useSelector, useDispatch } from 'react-redux';
import { sendRequest } from '../../../redux/actions/request';

//Navigation
import { useNavigation } from '@react-navigation/native';

const BottomSheetModal = (props) => {
    const { email, displayName } = auth().currentUser;

    //Props 
    const { _id, emailuser, iduser, recommend, visibleEditOption, onHideModal } = props;

    //State
    const globalUser = useSelector(state => state.globalUser.globalUser);

    //Others
    const dispatch = useDispatch();
    const navigation = useNavigation();

    //-----------------------------------Effects-----------------------------------------
    //-----------------------------------Functions---------------------------------------

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visibleEditOption}
        >
            <View style={tempStyles.pi_all_container}>
                <TouchableOpacity style={tempStyles.pi_outside_touch} onPress={onHideModal}></TouchableOpacity>

                <View style={tempStyles.pi_main_container}>
                    <View style={tempStyles.pi_header}>
                        <View style={tempStyles.pi_horizontal_bar}></View>
                    </View>

                    {
                        email === emailuser ? null : recommend ?
                            <BottomSheetItem
                                icon={<FontAwesome5 name="link" size={20} color={Colors.Gray}></FontAwesome5>}
                                label={"Connect this person"}
                                onPress={() => dispatch(sendRequest(globalUser._id, iduser))}
                            ></BottomSheetItem>
                            :
                            null
                    }

                    <BottomSheetItem
                        icon={<AntDesign name="bars" size={20} color={Colors.Gray}></AntDesign>}
                        label={"View post detail"}
                        onPress={() => {
                            onHideModal();
                            navigation.navigate("PostDetail", { _idpost: _id });
                        }}
                    ></BottomSheetItem>

                    <View style={{ ...tempStyles.pi_header, height: 40 }} />

                </View>
            </View>
        </Modal>
    );
}

BottomSheetModal.propTypes = ({
    _id: PropTypes.string,
    emailuser: PropTypes.string,
    iduser: PropTypes.string,
    recommend: PropTypes.bool,
    visibleEditOption: PropTypes.bool,
    onHideModal: PropTypes.func
});

BottomSheetModal.defaultProps = ({

});

export default React.memo(BottomSheetModal);