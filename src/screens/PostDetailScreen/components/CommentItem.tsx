import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Button,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
    Dimensions,
    StyleSheet,
    LayoutAnimation,
    ScrollView,
    Alert,
    TouchableWithoutFeedback,
    ToastAndroid,
    ActivityIndicator,
} from 'react-native';
import Animated from 'react-native-reanimated';

//Firebase
import auth from '@react-native-firebase/auth';

//Styles & Images & Icons
import { styles } from '../../Styles/styles';
import { tempStyles } from '../../HomeScreen/Styles/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//Navigation
import { useNavigation, useRoute } from '@react-navigation/native';

//helpers
import { setI18nConfig, translate } from '../../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';

import moment from 'moment';


//hooks

//redux & actions
import { useSelector, useDispatch } from 'react-redux';

//Components
import TextHighLight from '../../../components/TextHighLight';

//Consts
import { Colors } from '../../../constansts/color';


const CommentItem = (props) => {


    //States
    const globalUser = useSelector(state => state.globalUser.globalUser);
    const { _id, username, urlavatar, date, cmtcontent, email } = props;


    //others

    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    //-------------------------Effects-----------------------------------

    useEffect(() => {

        return () => {

        }
    }, []);

    //-------------------------Functions---------------------------------



    //--------------------------------------------------


    return (
        <View style={{ ...styles.container, marginVertical: 0 }}>

            <View style={tempStyles.post_details_container}>

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
                    <Text style={{ fontSize: 12, padding: 5, marginTop: 5, backgroundColor: '#99f3ff', borderRadius: 10, }}>{cmtcontent}</Text>

                </View>
            </View>

        </View>
    );
}


export default React.memo(CommentItem);