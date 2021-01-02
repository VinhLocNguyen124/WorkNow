import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';

//Firebase
import auth from '@react-native-firebase/auth';
import { FirebaseErrorRespond } from '../../../helpers/FirebaseErrorRespond';

//Styles & Images & Icons
import BackGround from './../../../assets/images/svg/BackGround';
import { styles } from '../../Styles/styles';
import { Paths } from '../../../constansts/path';
import Entypo from 'react-native-vector-icons/Entypo';

//Navigation
import { useNavigation } from '@react-navigation/native';

//helpers
import { setI18nConfig, translate } from '../../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';

//Components


//Consts
import { Colors } from '../../../constansts/color';
import { Dimens } from '../../../constansts/dimension';


const HorizontalBarChart = (props) => {
    const { point } = props;

    const returnColor = (index: number) => {
        const colors: Array<string> = ['#cc00ff', '#ff00ff', '#ff33cc', '#ff3399', '#ff0066', '#ff5050', '#ff0000'];
        let newArrColor: Array<string> = [];

        for (let i = 0; i < colors.length; i++) {
            if (((i + 1) * 10) <= point) {
                newArrColor.push(colors[i]);
            } else {
                newArrColor.push('rgba(128, 128, 128, 0.5)');
            }
        }

        return newArrColor[index];
    }

    return (
        <View style={{
            flexDirection: 'column',
            backgroundColor: 'white',
            marginTop: 10,
            paddingHorizontal: 10,
            paddingVertical: 20,
        }}>
            <Text>Profile Strength: <Text style={styles.normalTitle}>Intermediate</Text></Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 19,
                marginTop: 15,
            }}>
                <View style={{ flex: 1, height: 8, backgroundColor: returnColor(0), marginLeft: 2 }}></View>
                <View style={{ flex: 1, height: 8, backgroundColor: returnColor(1), marginHorizontal: 2 }}></View>
                <View style={{ flex: 1, height: 8, backgroundColor: returnColor(2) }}></View>
                <View style={{ flex: 1, height: 8, backgroundColor: returnColor(3), marginHorizontal: 2 }}></View>
                <View style={{ flex: 1, height: 8, backgroundColor: returnColor(4) }}></View>
                <View style={{ flex: 1, height: 8, backgroundColor: returnColor(5), marginHorizontal: 2 }}></View>
                <View style={{ flex: 1, height: 8, backgroundColor: returnColor(6), marginRight: 2 }}></View>
                <View style={{
                    position: 'absolute', top: 0, left: 0,
                    backgroundColor: 'white', borderRadius: 10,
                    borderWidth: 2, borderColor: '#cc00ff', padding: 2
                }}>
                    <Entypo name="check" size={10} color={'#cc00ff'}></Entypo>
                </View>
                <View style={{
                    position: 'absolute', top: 0, left: '55%',
                    backgroundColor: 'white', borderRadius: 10,
                    borderWidth: 2, borderColor: point >= 40 ? '#ff3399' : 'rgba(128, 128, 128, 0.5)', padding: 2
                }}>
                    <Entypo name={point >= 40 ? "check" : "star-outlined"} size={10} color={point >= 40 ? '#ff3399' : 'rgba(128, 128, 128, 0.5)'}></Entypo>
                </View>
                <View style={{
                    position: 'absolute', top: 0, right: 0,
                    backgroundColor: 'white', borderRadius: 10,
                    borderWidth: 2, borderColor: point === 70 ? '#ff0000' : 'rgba(128, 128, 128, 0.5)', padding: 2
                }}>
                    <Entypo name={point === 70 ? "check" : "star-outlined"} size={10} color={point === 70 ? '#ff0000' : 'rgba(128, 128, 128, 0.5)'}></Entypo>
                </View>
            </View>
        </View>
    );
}

HorizontalBarChart.propTypes = ({
    point: PropTypes.number,
});

HorizontalBarChart.defaultProps = ({

});

export default React.memo(HorizontalBarChart);