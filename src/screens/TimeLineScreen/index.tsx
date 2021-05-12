import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
    Animated,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Firebase
import auth from '@react-native-firebase/auth';

//Styles & Images & Icons
import { styles } from '../Styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

//helpers
import { setI18nConfig, translate } from '../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';

//redux & actions
import { useSelector, useDispatch } from 'react-redux';
import {
    getListPostTimeline,
    clearListPostTimeline
} from '../../redux/actions/post';

//hooks

//Components
import PostItem from '../HomeScreen/components/PostItem';
import Skeleton from '../../components/Skeleton';
import Delayed from '../../components/Delayed';
import FilterPost from './components/FilterPost';
const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);

//Consts
import { Colors } from '../../constansts/color';


const TimelineScreen = () => {
    const { email, displayName } = auth().currentUser;

    //States
    const screenLoading = useSelector(state => state.post.loadingTimeline);
    const postData = useSelector(state => state.post.listPostTimeline);

    //Others
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const animatedValue = useRef(new Animated.Value(0)).current;
    const count = useRef(true);

    //-----------------------Effects----------------------------------

    useEffect(() => {
        dispatch(getListPostTimeline(email));
        return () => {
            dispatch(clearListPostTimeline());
        }
    }, []);

    //-----------------------Functions---------------------------------

    const refreshListPost = () => {
        dispatch(getListPostTimeline(email));
    }

    const onClickExtendArrow = () => {
        if (count.current) {
            Animated.spring(animatedValue, {
                toValue: 1,
                friction: 3,
                tension: 2,
                useNativeDriver: false
            }).start();
            count.current = false;
        } else {
            if (!count.current) {
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false
                }).start();
                count.current = true;
            }
        }
    }

    const onCloseFilterPost = () => {

    }

    const renderItem = useCallback(
        ({ item }) => <PostItem
            key={item._id}
            _id={item._id}
            emailuser={item.emailuser}
            iduser={item.iduser}
            idpostshare={item.idpostshare}
            postshare={item.postshare}
            imgurl={item.imgurl}
            pdfurl={item.pdfurl}
            textcontent={item.content}
            date={item.date}
            seescope={item.seescope}
            allowcmt={item.allowcmt}
            formal={item.formal}
            urlavatar={item.urlavatar}
            username={item.username}
            headline={item.headline}
            liked={item.liked}
            likenumber={item.likenumber}
            cmtnumber={item.cmtnumber}
            recommend={item.recommend}
            onLongPress={() => navigation.navigate("PostDetail", { _idpost: item.idpostshare })}
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
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="md-arrow-back" size={26} color={Colors.Gray}></Ionicons>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Timeline</Text>

                {
                    false ?
                        <ActivityIndicator size="small" color={Colors.MainBlue}></ActivityIndicator>
                        :
                        <TouchableOpacity style={{ paddingLeft: 6 }} onPress={onClickExtendArrow}>
                            <AnimatedIcon
                                style={{
                                    transform: [{
                                        rotate: animatedValue.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['360deg', '270deg']
                                        })
                                    }]
                                }}
                                name="caretleft"
                                size={18}
                                color={Colors.Gray}></AnimatedIcon>
                        </TouchableOpacity>
                }
            </View>

            {/* Filter  */}
            <Delayed wait={500}>
                <FilterPost
                    animatedValue={animatedValue}
                    onPressCancel={onClickExtendArrow}
                ></FilterPost>
            </Delayed>

            {/* Timeline */}
            {screenLoading ?
                <View style={{ flex: 1, width: '100%', backgroundColor: Colors.LightGray }}>
                    <Skeleton></Skeleton>
                </View>
                :
                <FlatList
                    ItemSeparatorComponent={() => <View style={{ backgroundColor: Colors.LightGray, height: 5 }}></View>}
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

export default TimelineScreen;