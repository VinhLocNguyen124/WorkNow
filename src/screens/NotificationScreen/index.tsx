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
        content: "One can use this method also to create a thumbNail from a video in a specific size. Currently it is impossible to specify a concrete position, the OS will decide wich Thumbnail you'll get then",
        urlavatar: "https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2019/02/5-create-fake-people-in-2-seconds-on-this-insane-site.jpg",
        date: "2020-12-30T11:53:40.594Z",
        username: "Emma",
        unread: true,
        type: "post"

    },
    {
        id: 1,
        content: "One can use this method also to create a thumbNail from a video in a specific size. Currently it is impossible to specify a concrete position, the OS will decide wich Thumbnail you'll get then",
        urlavatar: "https://res.cloudinary.com/locnguyen-cloud/image/upload/v1608661587/qrojjtwp5fowfxdldlwn.jpg",
        date: "2020-12-29T04:58:20.474Z",
        username: "Nguyen Vinh Loc",
        unread: false,
        type: "post"
    },
    {
        id: 2,
        content: "One can use this method also to create a thumbNail from a video in a specific size. Currently it is impossible to specify a concrete position, the OS will decide wich Thumbnail you'll get then",
        urlavatar: "https://img.icons8.com/cotton/2x/news.png",
        date: "2020-12-23T10:22:13.755Z",
        username: "Mark Pollard",
        unread: true,
        type: "post"
    },
    {
        id: 3,
        content: "One can use this method also to create a thumbNail from a video in a specific size. Currently it is impossible to specify a concrete position, the OS will decide wich Thumbnail you'll get then",
        urlavatar: "https://img.icons8.com/cotton/2x/news.png",
        date: "2020-12-22T18:26:29.705Z",
        username: "Jack .ST",
        unread: true,
        type: "event"
    },
    {
        id: 4,
        content: "One can use this method also to create a thumbNail from a video in a specific size. Currently it is impossible to specify a concrete position, the OS will decide wich Thumbnail you'll get then",
        urlavatar: "https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-01.jpg",
        date: "2020-12-21T17:50:28.903Z",
        username: "Ling Yi",
        unread: true,
        type: "post"
    },
    {
        id: 5,
        content: "One can use this method also to create a thumbNail from a video in a specific size. Currently it is impossible to specify a concrete position, the OS will decide wich Thumbnail you'll get then",
        urlavatar: "https://img.icons8.com/cotton/2x/news.png",
        date: "2020-12-20T17:47:44.620Z",
        username: "Victor Clark",
        unread: false,
        type: "event"
    },
    {
        id: 6,
        content: "One can use this method also to create a thumbNail from a video in a specific size. Currently it is impossible to specify a concrete position, the OS will decide wich Thumbnail you'll get then",
        urlavatar: "https://img.icons8.com/cotton/2x/news.png",
        date: "2020-12-18T17:47:44.620Z",
        username: "Daniel John",
        unread: false,
        type: "event"
    },
    {
        id: 7,
        content: "One can use this method also to create a thumbNail from a video in a specific size. Currently it is impossible to specify a concrete position, the OS will decide wich Thumbnail you'll get then",
        urlavatar: "https://img.icons8.com/cotton/2x/news.png",
        date: "2020-12-15T17:47:44.620Z",
        username: "Henry",
        unread: true,
        type: "post"
    },
    {
        id: 8,
        content: "One can use this method also to create a thumbNail from a video in a specific size. Currently it is impossible to specify a concrete position, the OS will decide wich Thumbnail you'll get then",
        urlavatar: "https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2019/02/5-create-fake-people-in-2-seconds-on-this-insane-site.jpg",
        date: "2020-12-13T17:47:44.620Z",
        username: "Victoria Hollan",
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