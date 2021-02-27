import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
} from 'react-native';

//Firebase
import auth from '@react-native-firebase/auth';
import { FirebaseErrorRespond } from '../../helpers/FirebaseErrorRespond';

//Styles & Images & Icons
import BackGround from './../../assets/images/svg/BackGround';
import { styles } from '../Styles/styles';
import { Paths } from '../../constansts/path';

//Navigation
import { useNavigation } from '@react-navigation/native';

//helpers
import { setI18nConfig, translate } from '../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';

//Components
import Header from '../../components/Header';
import ItemNotification from './components/ItemNotification';
import Delayed from '../../components/Delayed';

//Consts

const dataNotification = [
    {
        id: 0,
        content: "Lâm Hoàng Mai đã bình luận về bài viết của bạn",
        urlavatar: "https://res.cloudinary.com/locnguyen-cloud/image/upload/v1611476340/rc6xqphdduwkayvrsgg3.jpg",
        date: "2021-01-24T15:53:59.804+00:00",
        username: "Emma",
        unread: true,
        type: "post"

    },
    {
        id: 1,
        content: "Đã tìm thấy ứng viên phù hợp",
        urlavatar: "https://res.cloudinary.com/locnguyen-cloud/image/upload/v1608661587/qrojjtwp5fowfxdldlwn.jpg",
        date: "2021-01-24T16:04:10.576+00:00",
        username: "Nguyen Vinh Loc",
        unread: false,
        type: "post"
    },
    {
        id: 3,
        content: "Pháp đã bình luận về bài viết của bạn",
        urlavatar: "https://res.cloudinary.com/locnguyen-cloud/image/upload/v1611472191/tetcewzei123k1yiqtl5.jpg",
        date: "2021-01-24T16:12:35.183+00:00",
        username: "Jack .ST",
        unread: true,
        type: "event"
    },
    {
        id: 4,
        content: "Pháp đã thích bài viết của bạn",
        urlavatar: "https://res.cloudinary.com/locnguyen-cloud/image/upload/v1611472191/tetcewzei123k1yiqtl5.jpg",
        date: "2020-12-21T17:50:28.903Z",
        username: "Ling Yi",
        unread: true,
        type: "post"
    },

]


const NotificationScreen = () => {


    //--------------------------Funtions----------------------------

    const renderItem = useCallback(
        ({ item }) => <ItemNotification
            key={item.id}
            avatarurl={item.urlavatar}
            content={item.content}
            username={item.username}
            date={item.date}
            unread={item.unread}
        ></ItemNotification>
        ,
        []
    );

    const keyExtractor = useCallback(
        item => item.id.toString(),
        []
    );


    return (
        <View style={styles.container}>
            <Header
                screenName="Notifications"
                noneBackButton={true}
            ></Header>

            <Delayed wait={500} noneLoading={false}>
                <FlatList
                    data={dataNotification}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                ></FlatList>
            </Delayed>
        </View>
    );
}

export default NotificationScreen;