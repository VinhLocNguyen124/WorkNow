import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Button,
    TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

//Styles & Images & Icons
import { tempStyles } from './WatchingScope';

//helpers

//Components
import BottomSheetItem from './BottomSheetItem';

//Consts
import { Colors } from '../../../constansts/color';



const BottomSheetList = (props) => {
    const { data, onPress, onPressOutside } = props;

    useEffect(() => {

        return () => {
            //thực thi một lần khi unmount

        }
    }, []);

    const elmItem = data.map((item: { icon: any, label: string }, index: number) => {
        return (
            <BottomSheetItem
                key={index}
                icon={item.icon}
                label={item.label}
                onPress={() => onPress(item.label)}
            ></BottomSheetItem>
        );
    });

    return (
        <View style={tempStyles.ws_all_container}>
            <TouchableOpacity style={tempStyles.ws_outside_touch} onPress={onPressOutside}>

            </TouchableOpacity>

            <View style={tempStyles.ws_main_container}>
                <View style={tempStyles.ws_header}>
                    <View style={tempStyles.ws_horizontal_bar}></View>
                </View>

                {elmItem}

                <View style={{ ...tempStyles.ws_header, height: 20 }} />

            </View>
        </View>

    );

}

BottomSheetList.propTypes = ({
    onPressOutside: PropTypes.func,
    onPress: PropTypes.func,
    data: PropTypes.array
});

BottomSheetList.defaultProps = ({
    onPressOutside: null,
    onPress: null,
});


export default React.memo(BottomSheetList);