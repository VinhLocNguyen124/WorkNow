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

//Consts
import { Colors } from '../../../constansts/color';
import { Dimens } from '../../../constansts/dimension';
import PropTypes from 'prop-types';


const RoundedButton = (props) => {
    const { title, onPress } = props;

    return (

        <TouchableOpacity
            style={tempStyles.filter_btn}
            onPress={onPress}
        >
            <Text style={tempStyles.filter_txt}>{title}</Text>
        </TouchableOpacity>

    );

}

const tempStyles = StyleSheet.create({
    filter_btn: {
        borderWidth: 1, borderColor: Colors.Gray, flexDirection: 'row',
        paddingHorizontal: 15, height: 30, alignSelf: 'center', marginLeft: 10,
        alignItems: 'center', borderRadius: 15, paddingBottom: 3
    },
    filter_txt: {
        color: Colors.Gray, fontSize: 16, marginRight: 5
    }
});

RoundedButton.propTypes = ({
    title: PropTypes.string,
    onPress: PropTypes.func
});

export default React.memo(RoundedButton);