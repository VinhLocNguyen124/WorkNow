//Use Strict
import React from 'react';

//screens
import HomeScreen from './../screens/HomeScreen/index';
import MessageScreen from './../screens/MessageScreen/index';
import NotificationScreen from './../screens/NotificationScreen/index';
import PostScreen from './../screens/PostScreen/index';
import ProfileScreen from './../screens/ProfileScreen/index';

//navigation packages
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Navigators
const BottomTabs = createBottomTabNavigator();

//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

//redux
import { useSelector, useDispatch } from 'react-redux';


//transition configs
const config = {
    animation: 'timing',
    config: {
        stiffness: 250,
        damping: 100,
        mass: 10,
        overshootClamping: true,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.01,
    },
};

//Bottom Tabs
export const createBottomTabs = () => {
    const navigation = useNavigation();
    const messageBadge = useSelector(state => state.badge.messageBadge);
    const notificationBadge = useSelector(state => state.badge.notificationBadge);

    return (
        <BottomTabs.Navigator
            screenOptions={
                ({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        switch (route.name) {
                            case 'Home':
                                iconName = 'ios-home';
                                break;
                            case 'Message':
                                iconName = 'ios-chatbubbles';
                                break;
                            case 'Post':
                                iconName = 'ios-add-circle';
                                break;
                            case 'Notification':
                                iconName = 'ios-notifications';
                                break;
                            case 'Profile':
                                iconName = 'ios-person';
                                break;

                            default:
                                break;
                        }
                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })
            }
            tabBarOptions={{
                activeTintColor: 'black',
                inactiveTintColor: 'gray',
                showLabel: false,
            }}
        >
            <BottomTabs.Screen name="Home" component={HomeScreen}></BottomTabs.Screen>
            <BottomTabs.Screen name="Message" component={MessageScreen}
                options={{
                    tabBarBadge: messageBadge
                }}
            ></BottomTabs.Screen>
            <BottomTabs.Screen
                name="Post"
                component={PostScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name="ios-add-circle"
                            size={55}
                            color="#0099ff"
                            style={{
                                elevation: 10
                            }}
                        ></Ionicons>
                    )
                }}
                listeners={{
                    tabPress: e => {
                        //chặn mở tab post
                        e.preventDefault();
                        //mở màn hình PostScreen
                        navigation.navigate('postModal')
                    }
                }}
            ></BottomTabs.Screen>
            <BottomTabs.Screen name="Notification" component={NotificationScreen}
                options={{
                    tabBarBadge: notificationBadge
                }}
            ></BottomTabs.Screen>
            <BottomTabs.Screen name="Profile" component={ProfileScreen}></BottomTabs.Screen>
        </BottomTabs.Navigator>
    );
}
