import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Firebase
import auth from '@react-native-firebase/auth';

//Styles & Images & Icons
import { styles } from '../Styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

//helpers
import { setI18nConfig, translate } from '../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';

//redux & actions
import { useSelector, useDispatch } from 'react-redux';
import {
    getListPost,

} from '../../redux/actions/post';

//hooks

//Components
import PostItem from '../HomeScreen/components/PostItem';
import Skeleton from '../../components/Skeleton';

//Consts
import { Colors } from '../../constansts/color';
import { URLs } from '../../constansts/url';
import { fetchData, getData } from '../../apis/apiCaller';

const HomeScreen = () => {
    //States
    const [email, setEmail] = useState("");
    const [displayname, setDisplayName] = useState("");
    const screenLoading = useSelector(state => state.post.loading);
    const postData = useSelector(state => state.post.listPost);


    //Others
    const dispatch = useDispatch();
    const navigation = useNavigation();

    //-----------------------Effects-----------------------------------
    useEffect(() => {
        const { email, displayName } = auth().currentUser;
        setEmail(email);
        setDisplayName(displayName);
    }, []);

    useEffect(() => {
        dispatch(getListPost());
        return () => {

        }
    }, []);

    //-----------------------Functions---------------------------------

    const refreshListPost = () => {
        dispatch(getListPost());
    }

    const signOutUser = () => {
        auth().signOut();
    }

    const renderItem = useCallback(
        ({ item }) => <PostItem
            key={item._id}
            seq={item._id}
            imgurl={item.imgurl}
            textcontent={item.content}
            date={item.date}
            seescope={item.seescope}
            allowcmt={item.allowcmt}
        ></PostItem>
        ,
        []
    );

    const keyExtractor = useCallback(
        item => item._id,
        []
    );


    return (
        <View style={[styles.container, { backgroundColor: Colors.LightGray }]}>
            {/*  Header  */}
            <View style={styles.header}>
                <Image source={require('../../assets/images/locnguyen.jpg')} style={styles.avatarSmall} />
                <View style={tempStyles.search_bar_container}>
                    <Ionicons name="search" size={18} color={'black'} />
                    <TextInput
                        style={tempStyles.input_search_bar}
                        autoCapitalize="none"
                        placeholder="Search"
                    // onChangeText={onChangeText}
                    // value={value}
                    ></TextInput>
                </View>
                <TouchableOpacity onPress={signOutUser}>
                    <Ionicons name="qr-code-sharp" size={25} color={Colors.Gray}></Ionicons>
                </TouchableOpacity>

            </View>
            {/* NewsFeed */}
            {screenLoading ?
                <View style={{ flex: 1, width: '100%', marginTop: 10 }}>
                    <Skeleton></Skeleton>
                    <Skeleton></Skeleton>
                </View>
                :
                <FlatList
                    data={postData}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    maxToRenderPerBatch={5}
                    windowSize={5}
                    onRefresh={refreshListPost}
                    refreshing={screenLoading}
                ></FlatList>
            }
        </View>
    );
}


const tempStyles = StyleSheet.create({
    search_bar_container: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: Colors.Cyan,
        height: 35,
        alignItems: 'center',
        paddingHorizontal: 5,
        borderRadius: 5,
        marginRight: 10
    },
    input_search_bar: {
        color: Colors.Gray,
        fontSize: 11,
        marginLeft: 5,
        flex: 1,
        textAlignVertical: 'center'
    },
});

export default HomeScreen;