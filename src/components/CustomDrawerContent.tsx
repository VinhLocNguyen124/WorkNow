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


const CustomDrawerContent = (props) => {
    const { navigation } = props;
    return (
        <DrawerContentScrollView>

            <View style={{ height: Dimens.heightScreen }}>
                <BackGround path={Paths.Drawer} style={{ marginTop: -10 }} />
                <BackGround
                    path={Paths.DrawerUnder}
                    style={{ position: 'absolute', bottom: -80, left: 0, right: 0 }}
                    fill="#0099ff42" />

                <View style={{ position: 'absolute', top: 80, left: 0, right: 0, }} >
                    <View style={{ ...styles.logoContainer, marginBottom: 20 }}>
                        <Image style={styles.tinyLogo}
                            source={require('./../assets/images/logo.png')} />
                    </View>
                    <DrawerItem
                        label="Home page"
                        onPress={() => navigation.navigate('Home')}
                        icon={() => <AntDesign name="home" size={18} color={Colors.Gray}></AntDesign>}
                    />
                    <DrawerItem
                        label="Your profile"
                        onPress={() => navigation.navigate('Profile')}
                        icon={() => <AntDesign name="profile" size={18} color={Colors.Gray}></AntDesign>}
                    />
                    <DrawerItem
                        label="Scan QR Code"
                        onPress={() => console.log("hello")}
                        icon={() => <AntDesign name="qrcode" size={18} color={Colors.Gray}></AntDesign>}
                    />
                    <DrawerItem
                        label="Sign Out"
                        onPress={() => auth().signOut()}
                        icon={() => <AntDesign name="logout" size={18} color={Colors.Gray}></AntDesign>}
                    />

                </View>

                <Text style={{ position: 'absolute', bottom: 50, fontWeight: 'bold', textAlign: 'center', width: '100%' }}>version 1.0.1</Text>
            </View>
        </DrawerContentScrollView>

    );
}

export default CustomDrawerContent;