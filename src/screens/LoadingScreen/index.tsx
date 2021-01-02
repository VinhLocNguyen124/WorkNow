import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
} from 'react-native';
import { styles } from '../Styles/styles';

import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
            <ActivityIndicator size={'large'} color={'deepskyblue'}></ActivityIndicator>
        </View>
    );
}

export default LoadingScreen;