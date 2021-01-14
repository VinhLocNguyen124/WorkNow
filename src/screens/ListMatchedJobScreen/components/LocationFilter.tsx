import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Button,
    TextInput,
    StyleSheet,
} from 'react-native';

//Styles & Images & Icons

//helpers

//Components
import RoundedButton from './RoundedButton';
import FormDropDown from '../../../components/FormDropDown';

//navigation
import { useNavigation } from '@react-navigation/native';

//Consts
import { Colors } from '../../../constansts/color';
import { Dimens } from '../../../constansts/dimension';
import PropTypes from 'prop-types';


const LocationFilter = (props) => {
    //Props
    const { } = props;

    //States

    //Others
    const navigation = useNavigation();

    useEffect(() => {

        return () => {
            //thực thi một lần khi unmount

        }
    }, []);

    return (
        <View style={{ width: "100%", backgroundColor: 'white', }}>

            <FormDropDown
                title="Filter Location"
                //  value={province}
                style={{ marginTop: 20 }}
                param="province"
                onPress={(param) => navigation.navigate('ListChoice', { title: param })}
            ></FormDropDown>

        </View>

    );

}

LocationFilter.propTypes = ({

});

export default React.memo(LocationFilter);