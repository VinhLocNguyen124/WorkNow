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


//Consts
import { Colors } from '../../../constansts/color';
import { Dimens } from '../../../constansts/dimension';
import PropTypes from 'prop-types';


const PositionFilter = (props) => {
    const { } = props;

    useEffect(() => {

        return () => {
            //thực thi một lần khi unmount

        }
    }, []);

    return (
        <View style={{ width: "100%", backgroundColor: 'white', }}>

            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <RoundedButton title="Intern" />
                <RoundedButton title="Fresher" />
            </View>

            <View style={{ flexDirection: 'row' }}>
                <RoundedButton title="Junior" />
                <RoundedButton title="Mid-Senior" />
                <RoundedButton title="Senior" />
            </View>

            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <RoundedButton title="Team-Leader" />
                <RoundedButton title="Tech-Leader" />
            </View>

            <View style={{ flexDirection: 'row', }}>
                <RoundedButton title="Project Manager" />
            </View>


        </View>

    );

}

PositionFilter.propTypes = ({

});

export default React.memo(PositionFilter);