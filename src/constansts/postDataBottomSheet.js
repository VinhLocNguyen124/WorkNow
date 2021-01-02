import React from 'react';
import { Colors } from '../../src/constansts/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export const dataBottomSheet = [
    {
        icon: <FontAwesome name="photo" size={18} color={Colors.Gray}></FontAwesome>,
        label: "Add a photo"
    },
    {
        icon: <FontAwesome name="video-camera" size={18} color={Colors.Gray}></FontAwesome>,
        label: "Take a video"
    },
    {
        icon: <FontAwesome5 name="award" size={25} color={Colors.Gray}></FontAwesome5>,
        label: "Celebrate an occasion"
    },
    {
        icon: <FontAwesome name="photo" size={18} color={Colors.Gray}></FontAwesome>,
        label: "Add a photo"
    },
]