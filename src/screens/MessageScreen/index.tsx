import React, { useCallback } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    FlatList,
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

//Components
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import ItemMessage from './components/ItemMessage';
import Delayed from './../../components/Delayed';

//Consts
import { Colors } from '../../constansts/color';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

const dataMessage = [
    {
        id: 0,
        message: "You sent a photo ?",
        urlavatar: "https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2019/02/5-create-fake-people-in-2-seconds-on-this-insane-site.jpg",
        date: "2020-12-30T11:53:40.594Z",
        username: "Emma",
        idroomchat: "dfdfdfd"
    },
    {
        id: 1,
        message: "Hello! How are you ? Hello! How are you ? Hello! How are you ?",
        urlavatar: "https://res.cloudinary.com/locnguyen-cloud/image/upload/v1608661587/qrojjtwp5fowfxdldlwn.jpg",
        date: "2020-12-29T04:58:20.474Z",
        username: "Nguyen Vinh Loc",
        idroomchat: "dfdfdfd"
    },
    {
        id: 2,
        message: "Hello! How are you ?",
        urlavatar: "https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-4.jpg",
        date: "2020-12-23T10:22:13.755Z",
        username: "Mark Pollard",
        idroomchat: "dfdfdfd"
    },
    {
        id: 3,
        message: "Hello! How are you ?",
        urlavatar: "https://media.npr.org/assets/img/2018/11/21/gettyimages-962142720-3f4af695a639cbc14deb90e88287cd3c19b676f4-s800-c85.jpg",
        date: "2020-12-22T18:26:29.705Z",
        username: "Jack .ST",
        idroomchat: "dfdfdfd"
    },
    {
        id: 4,
        message: "Hello! How are you ?",
        urlavatar: "https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-01.jpg",
        date: "2020-12-21T17:50:28.903Z",
        username: "Ling Yi",
        idroomchat: "dfdfdfd"
    },
    {
        id: 5,
        message: "Hello! How are you ?",
        urlavatar: "https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-05.jpg",
        date: "2020-12-20T17:47:44.620Z",
        username: "Victor Clark",
        idroomchat: "dfdfdfd"
    },
    {
        id: 6,
        message: "Hello! How are you ?",
        urlavatar: "https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-03.jpg",
        date: "2020-12-18T17:47:44.620Z",
        username: "Daniel John",
        idroomchat: "dfdfdfd"
    },
    {
        id: 7,
        message: "Hello! How are you ?",
        urlavatar: "https://images.newscientist.com/wp-content/uploads/2019/09/05110709/ed-bridges-landscape.jpg",
        date: "2020-12-15T17:47:44.620Z",
        username: "Henry",
        idroomchat: "dfdfdfd"
    },
    {
        id: 8,
        message: "Hello! How are you ?",
        urlavatar: "https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2019/02/5-create-fake-people-in-2-seconds-on-this-insane-site.jpg",
        date: "2020-12-13T17:47:44.620Z",
        username: "Victoria Hollan",
        idroomchat: "dfdfdfd"
    },
]


const MessageScreen = () => {
    //States

    //Others
    const navigation = useNavigation();

    const renderItem = useCallback(
        ({ item }) => <ItemMessage
            key={item.id}
            avatarurl={item.urlavatar}
            message={item.message}
            username={item.username}
            date={item.date}
            onPress={() => navigation.navigate("MessageDetail")}
        ></ItemMessage>
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
                screenName="Messaging"
                noneBackButton={true}
            ></Header>

            <SearchBar
                placeholder="Search messages"
            ></SearchBar>

            <Delayed wait={500} noneLoading={false}>
                <FlatList
                    data={dataMessage}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                ></FlatList>
            </Delayed>


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

export default MessageScreen;