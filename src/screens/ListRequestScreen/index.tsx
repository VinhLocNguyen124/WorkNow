import React, { useCallback } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native';

//Firebase
import auth from '@react-native-firebase/auth';
import { FirebaseErrorRespond } from '../../helpers/FirebaseErrorRespond';

//Styles & Images & Icons
import BackGround from './../../assets/images/svg/BackGround';
import { styles } from '../Styles/styles';
import { Paths } from '../../constansts/path';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Navigation
import { useNavigation } from '@react-navigation/native';

//helpers
import { setI18nConfig, translate } from '../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';
import { returnAvatarUser } from '../../helpers/UIHandling';

//Components
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import Delayed from './../../components/Delayed';
import TextHighLight from '../../components/TextHighLight';

//Consts
import { Colors } from '../../constansts/color';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { deleteRequest, acceptRequest } from '../../redux/actions/request';



const ListRequestScreen = () => {
    //States
    const globalUser = useSelector(state => state.globalUser.globalUser);
    const deleteLoading = useSelector(state => state.request.deleteLoading);
    const acceptLoading = useSelector(state => state.request.acceptLoading);

    //Others
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const renderItem = useCallback(
        ({ item }) => <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: Colors.LightGray, alignItems: 'center' }}>
            <Image source={{ uri: returnAvatarUser(item.urlavatar) }} style={styles.avatar} />
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', flex: 1 }}>
                <TextHighLight
                    mainText={item.usernamesend}
                    fontSizeMT={16}
                    fontSizeST={12}
                    colorST={Colors.Gray}
                // onPress={() => navigation.navigate("GeneralProfile", { _email: emailuser })}
                />
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ ...styles.text, width: '90%' }}>{item.headline}</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
                <TouchableOpacity style={{
                    padding: 5,
                    backgroundColor: Colors.DarkTurquoise, margin: 2,
                    paddingHorizontal: 20, borderRadius: 5, elevation: 5
                }} onPress={() => dispatch(acceptRequest(item._id, globalUser.email))}>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    padding: 5,
                    backgroundColor: Colors.Gray, margin: 2,
                    paddingHorizontal: 20, borderRadius: 5, elevation: 5
                }} onPress={() => dispatch(deleteRequest(item._id, globalUser.email))}>

                    <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>deny</Text>

                </TouchableOpacity>
            </View>
        </View>
        ,
        []
    );

    const keyExtractor = useCallback(
        item => item._id,
        []
    );

    return (
        <View style={styles.container}>
            {/* Phần Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="md-arrow-back" size={24} color={Colors.Gray}></Ionicons>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>List request</Text>
                {deleteLoading || acceptLoading ?
                    <ActivityIndicator size="small" color={Colors.MainBlue}></ActivityIndicator>
                    :
                    <View style={{ width: 20 }}></View>
                }
            </View>

            {globalUser.requests.length > 0 ?
                <FlatList
                    data={globalUser.requests}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                ></FlatList>
                :
                null
            }

        </View>
    );
}


const tempStyles = StyleSheet.create({
    search_bar_container: {
        flexDirection: 'row',
        backgroundColor: Colors.Cyan,
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 10,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    input_search_bar: {
        color: Colors.Gray,
        fontSize: 16,
        marginLeft: 5,
        flex: 1,
        textAlignVertical: 'center'
    },
});

export default ListRequestScreen;