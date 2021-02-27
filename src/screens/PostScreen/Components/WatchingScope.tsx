import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    Button,
    TextInput,
    Dimensions,
    Switch,
    StyleSheet,
} from 'react-native';

//Styles & Images & Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

//helpers
import { setI18nConfig, translate } from '../../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';

//Components
import { Radio } from 'native-base';

//Consts
import { Colors } from '../../../constansts/color';
import PropTypes from 'prop-types';
import { styles } from '../../Styles/styles';

const height = Dimensions.get('window').height;

const WatchingScope = (props) => {
    const { onPressOutside, onChangeAllowCmt, allowCmt, seeScope, onChangeSeeScope, } = props;

    useEffect(() => {

        return () => {
            //thực thi một lần khi unmount
        }
    }, []);

    return (
        <View style={tempStyles.ws_all_container}>
            <TouchableOpacity style={tempStyles.ws_outside_touch} onPress={onPressOutside}>

            </TouchableOpacity>

            <View style={tempStyles.ws_main_container}>
                <View style={tempStyles.ws_header}>
                    <View style={tempStyles.ws_horizontal_bar}></View>
                </View>

                <Text style={styles.largeTitle}>Who can see this post?</Text>
                <Text style={[styles.text, { marginBottom: 10 }]}>Your post will be visible on feed, on your profile and in search results</Text>


                <View style={tempStyles.ws_view1}>

                    <Ionicons name="md-earth-sharp" size={30} color={Colors.Gray}></Ionicons>

                    <View style={tempStyles.ws_view2}>
                        <Text style={styles.normalTitle}>Anyone</Text>
                        <Text style={styles.text}>Anyone on or off WorkNow</Text>
                    </View>

                    <Radio
                        color={Colors.Gray}
                        selectedColor={Colors.MainBlue}
                        onPress={() => onChangeSeeScope("anyone")}
                        selected={seeScope === "anyone" ? true : false} />
                </View>

                <View style={tempStyles.ws_view1}>

                    <Ionicons name="people" size={30} color={Colors.Gray}></Ionicons>

                    <View style={tempStyles.ws_view2}>
                        <Text style={styles.normalTitle}>Connections only</Text>
                        <Text style={styles.text}>Connections on WorkNow</Text>
                    </View>

                    <Radio
                        color={Colors.Gray}
                        selectedColor={Colors.MainBlue}
                        onPress={() => onChangeSeeScope("connection")}
                        selected={seeScope === "connection" ? true : false} />
                </View>

                <View style={tempStyles.ws_view3}>
                    <View style={tempStyles.ws_view4}>
                        <Text style={styles.normalTitle}>Allow comments on this post</Text>
                        <Text style={styles.text}>You can change this setting later</Text>
                    </View>
                    <Switch

                        trackColor={{ false: "#767577", true: "#81b0ff6E" }}
                        thumbColor={allowCmt ? Colors.MainBlue : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => onChangeAllowCmt(!allowCmt)}
                        value={allowCmt} />
                </View>

            </View>
        </View >
    );
}

export const tempStyles = StyleSheet.create({
    ws_all_container: {
        backgroundColor: 'rgba(0,0,0,0.5)', height: height
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
        alignItems: 'center'
    },
    ws_horizontal_bar: {
        width: 60,
        backgroundColor: Colors.Gray,
        height: 4,
        marginBottom: 10
    },
    ws_view1: {
        flexDirection: 'row', width: '100%', alignItems: 'center', padding: 5
    },
    ws_view2: {
        flex: 1, flexDirection: 'column', alignItems: 'flex-start', marginLeft: 10
    },
    ws_view3: {
        flexDirection: 'row', marginTop: 10, marginBottom: 30
    },
    ws_view4: {
        flexDirection: 'column', alignItems: 'flex-start', flex: 1
    },
});



WatchingScope.propTypes = ({
    onPressOutside: PropTypes.func,
    allowCmt: PropTypes.bool,
    onChangeAllowCmt: PropTypes.func,
    onChangeSeeScope: PropTypes.func,
    seeScope: PropTypes.string
});

WatchingScope.defaultProps = ({
    onPressOutside: null
});


export default React.memo(WatchingScope);