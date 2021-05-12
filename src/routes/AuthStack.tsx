import React from 'react';

//screens
import LoadingScreen from './../screens/LoadingScreen/index';
import LoginScreen from './../screens/LoginScreen/index';
import RegisterScreen from './../screens/RegisterScreen/index';
import ForgotPasswordScreen from './../screens/ForgotPasswordScreen/index';

//navigation packages
import { createStackNavigator } from '@react-navigation/stack';

//Navigators
const Stack = createStackNavigator();

//Auth flow
export const createAuthFlow = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{
                headerShown: false
            }}></Stack.Screen>
            <Stack.Screen name="Loading" component={LoadingScreen} options={{
                headerShown: false
            }}></Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen} options={{
                headerShown: false
            }}></Stack.Screen>
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{
                headerShown: false
            }}></Stack.Screen>
        </Stack.Navigator>
    );
}