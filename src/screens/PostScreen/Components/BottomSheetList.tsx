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

//Styles & Images & Icons

//helpers

//Components
import BottomSheetItem from './BottomSheetItem';

//Consts
import { Colors } from '../../../constansts/color';


const BottomSheetList = (props) => {
    const { data, onPress, wait } = props;

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
                onPress={onPress}
            ></BottomSheetItem>
        );
    });

    return (
        <View
            style={{
                backgroundColor: 'white',
                height: 450,
                borderTopWidth: 1.5,
                borderLeftWidth: 1.5,
                borderRightWidth: 1.5,
                borderColor: Colors.LightGray,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
            }}
        >
            <View style={{
                height: 40,
                backgroundColor: 'transparent',
                width: "100%",
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View style={{ width: 60, backgroundColor: Colors.Gray, height: 4, marginBottom: 10 }}></View>
            </View>

            {elmItem}

        </View>
    );

}

export default React.memo(BottomSheetList);