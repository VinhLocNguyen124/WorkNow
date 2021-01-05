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


const BottomSheetContentFilter = (props) => {
    const { type, onPressOutside } = props;

    useEffect(() => {

        return () => {
            //thực thi một lần khi unmount

        }
    }, []);

    const renderContent = () => {
        switch (type) {
            case 'date':
                return <View style={{ width: "100%", backgroundColor: 'white', height: 100 }}>

                    <Text style={{ marginBottom: 20 }}>{type}</Text>

                </View>
                break;
            case 'position':
                return (
                    <View style={{ width: "100%", backgroundColor: 'white', }}>

                        <Text>{type}</Text>

                    </View>
                );
                break;
            case 'company':
                return (
                    <View style={{ width: "100%", backgroundColor: 'white', }}>

                        <Text>{type}</Text>

                    </View>
                );
                break;
            case 'jobname':
                return (
                    <View style={{ width: "100%", backgroundColor: 'white', }}>

                        <Text>{type}</Text>

                    </View>
                );
                break;
            case 'skills':
                return (
                    <View style={{ width: "100%", backgroundColor: 'white', }}>

                        <Text>{type}</Text>

                    </View>
                );
                break;


            default:
                return null
                break;
        }
    }


    return (
        <View style={tempStyles.ws_all_container}>
            <TouchableOpacity style={tempStyles.ws_outside_touch} onPress={onPressOutside}>

            </TouchableOpacity>

            <View style={tempStyles.ws_main_container}>
                <View style={tempStyles.ws_header}>
                    <View style={tempStyles.ws_horizontal_bar}></View>
                </View>

                {

                    type === 'position' ?
                        <View style={{ width: "100%", backgroundColor: 'white', }}>

                            <TouchableOpacity
                                style={tempStyles.filter_btn}

                            >
                                <Text style={tempStyles.filter_txt}>Position</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={tempStyles.filter_btn}

                            >
                                <Text style={tempStyles.filter_txt}>Position</Text>
                            </TouchableOpacity>

                        </View>
                        :
                        type === 'company' ?
                            <View style={{ width: "100%", backgroundColor: 'white', }}>

                                <Text>{type}</Text>

                            </View>
                            :
                            type === 'jobname' ?
                                <View style={{ width: "100%", backgroundColor: 'white', }}>

                                    <Text>{type}</Text>

                                </View>
                                :
                                <View style={{ width: "100%", backgroundColor: 'white', }}>

                                    <Text>{type}</Text>

                                </View>
                }

            </View>
        </View>
    );

}

const tempStyles = StyleSheet.create({
    ws_all_container: {
        backgroundColor: 'rgba(0,0,0,0.5)', height: Dimens.heightScreen
    },
    ws_outside_touch: {
        flex: 1, backgroundColor: 'transparent',
    },
    ws_main_container: {
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderTopWidth: 1.5,
        borderLeftWidth: 1.5,
        borderRightWidth: 1.5,
        borderColor: Colors.LightGray,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    ws_header: {
        height: 40,
        backgroundColor: 'transparent',
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: Colors.LightGray,
        borderBottomWidth: 2
    },
    ws_horizontal_bar: {
        width: 60,
        backgroundColor: Colors.Gray,
        height: 4,
        marginBottom: 10
    },
    filter_btn: {
        borderWidth: 1, borderColor: Colors.Gray, flexDirection: 'row',
        paddingHorizontal: 15, height: 30, alignSelf: 'center', marginLeft: 10,
        alignItems: 'center', borderRadius: 15, paddingBottom: 3
    },
    filter_txt: {
        color: Colors.Gray, fontSize: 16, marginRight: 5
    }
});

BottomSheetContentFilter.propTypes = ({
    onPressOutside: PropTypes.func,
    type: PropTypes.string,
});

export default React.memo(BottomSheetContentFilter);