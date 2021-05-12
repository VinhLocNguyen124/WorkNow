import * as ActionTypes from './actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveAccount = (
    email: string,
    password: string,
    checkSaveAccount: string) => async (dispatch, getState) => {
        if (checkSaveAccount === "1") {
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('password', password);
            await AsyncStorage.setItem('checkSaveAccount', checkSaveAccount);
        } else {
            await AsyncStorage.setItem('email', "");
            await AsyncStorage.setItem('password', "");
            await AsyncStorage.setItem('checkSaveAccount', "0");
        }
    };


