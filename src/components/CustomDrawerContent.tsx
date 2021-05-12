import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image,
} from 'react-native';


import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

//Firebase
import auth from '@react-native-firebase/auth';

//UIsupport
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles } from '../screens/Styles/styles';
import BackGround from '../assets/images/svg/BackGround';

//consts
import { Colors } from '../constansts/color';
import { Paths } from '../constansts/path';
import { Dimens } from '../constansts/dimension';

//redux 
import { useSelector } from 'react-redux';

//helpers
import { returnAvatarUser } from '../helpers/UIHandling';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchData } from '../apis/apiCaller';
import { fcmService } from '../notifications/FCMService';


const CustomDrawerContent = (props) => {
    const { navigation } = props;

    //State
    const globalUser = useSelector(state => state.globalUser.globalUser);

    //-----------------------------Functions-------------------------------
    const onPressScanQRCode = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            await fetchData('test/' + token, 'POST')

            console.log(token);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <DrawerContentScrollView showsVerticalScrollIndicator={false}>

            <View style={{ height: Dimens.heightScreen }}>
                <BackGround path={Paths.Drawer} style={{ marginTop: -10 }} />
                <BackGround
                    path={Paths.DrawerUnder}
                    style={{ position: 'absolute', bottom: -80, left: 0, right: 0 }}
                    fill="#0099ff42" />

                <View style={{ position: 'absolute', top: 120, left: 0, right: 0, backgroundColor: 'transparent' }}>
                    {/* phần ảnh đại diện và tên  */}
                    <View style={{ flexDirection: 'row', marginBottom: 20, alignItems: 'center' }}>
                        <Image style={{
                            height: 80,
                            width: 80,
                            marginLeft: 5,
                            borderRadius: 50,
                            borderWidth: 2,
                            borderColor: Colors.DarkTurquoise,
                        }}
                            source={{
                                uri: globalUser ?
                                    returnAvatarUser(globalUser.urlavatar) :
                                    'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg'
                            }} />
                        <TouchableOpacity style={{
                            padding: 5, margin: 5, borderWidth: 2,
                            borderColor: '#cccccc', flex: 1, borderRadius: 5,
                            backgroundColor: '#f2f2f2', elevation: 0,
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
                        }} onPress={() => navigation.navigate('Profile')}>
                            <Text style={{
                                backgroundColor: 'transparent',
                                textAlign: 'center', fontSize: 16,
                                fontWeight: 'bold',
                            }}>{globalUser ? globalUser.username : 'Username'}</Text>
                            <AntDesign name="right" size={18} color={'#8c8c8c'}></AntDesign>
                        </TouchableOpacity>

                    </View>


                    {/* Phần menu  */}
                    <DrawerItem
                        label="Home Page"
                        onPress={() => navigation.navigate('Home')}
                        icon={() => <AntDesign name="home" size={18} color={Colors.Gray}></AntDesign>}
                    />
                    <DrawerItem
                        label="Your Profile"
                        onPress={() => navigation.navigate('Profile')}
                        icon={() => <AntDesign name="profile" size={18} color={Colors.Gray}></AntDesign>}
                    />
                    <DrawerItem
                        label="Your Friends"
                        onPress={() => navigation.navigate('ListFriend')}
                        icon={() => <AntDesign name="addusergroup" size={18} color={Colors.Gray}></AntDesign>}
                    />
                    <DrawerItem
                        label="Scan QR Code"
                        onPress={onPressScanQRCode}
                        icon={() => <AntDesign name="qrcode" size={18} color={Colors.Gray}></AntDesign>}
                    />
                    <DrawerItem
                        label="Sign Out"
                        onPress={() => {
                            auth().signOut();
                            fcmService.deleteToken();
                        }}
                        icon={() => <AntDesign name="logout" size={18} color={Colors.Gray}></AntDesign>}
                    />

                </View>

                <Text style={{ position: 'absolute', bottom: 50, fontWeight: 'bold', textAlign: 'center', width: '100%' }}>version 1.0.1</Text>
            </View>
        </DrawerContentScrollView>

    );
}

export default CustomDrawerContent;