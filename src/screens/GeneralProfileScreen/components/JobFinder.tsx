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
import { styles } from '../../Styles/styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Navigation
import { useNavigation } from '@react-navigation/native';

//helpers
import { setI18nConfig, translate } from '../../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';

//Components

//Consts
import { Colors } from '../../../constansts/color';
import { Dimens } from '../../../constansts/dimension';


const JobFinder = () => {
    //States

    //Others
    const navigation = useNavigation();

    return (
        <View style={{ flexDirection: 'column', marginTop: 10, backgroundColor: 'white', padding: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{
                    backgroundColor: Colors.MainBlue,
                    borderRadius: 5,
                    padding: 10
                }} onPress={() => navigation.navigate('ListMatchedJob')}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Find a job</Text>
                </TouchableOpacity>

                <View style={{ height: 4, backgroundColor: Colors.Gray, flex: 1, marginHorizontal: 5 }}></View>
                <View style={{ height: 4, backgroundColor: Colors.Gray, flex: 1, marginHorizontal: 5 }}></View>
                <View style={{ height: 4, backgroundColor: Colors.Gray, flex: 1, marginHorizontal: 5 }}></View>
                <View style={{ height: 4, backgroundColor: Colors.Gray, flex: 1, marginHorizontal: 5 }}></View>
                <View style={{ height: 4, backgroundColor: Colors.Gray, flex: 1, marginHorizontal: 5 }}></View>
                <View style={{ height: 4, backgroundColor: Colors.Gray, flex: 1, marginHorizontal: 5 }}></View>
                <MaterialCommunityIcons name="console-network" size={35} color={'black'}></MaterialCommunityIcons>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <FontAwesome5 name="walking" size={30} color={'black'}></FontAwesome5>
                <View style={{ height: 4, backgroundColor: Colors.Gray, flex: 1, marginHorizontal: 5 }}></View>
                <View style={{ height: 4, backgroundColor: Colors.Gray, flex: 1, marginHorizontal: 5 }}></View>
                <View style={{ height: 4, backgroundColor: Colors.Gray, flex: 1, marginHorizontal: 5 }}></View>
                <View style={{ height: 4, backgroundColor: Colors.Gray, flex: 1, marginHorizontal: 5 }}></View>
                <View style={{ height: 4, backgroundColor: Colors.Gray, flex: 1, marginHorizontal: 5 }}></View>
                <TouchableOpacity style={{
                    backgroundColor: Colors.MainBlue,
                    borderRadius: 5,
                    padding: 10
                }} onPress={() => navigation.navigate('Requirement')}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Find a candidate</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

JobFinder.propTypes = ({
    onPress: PropTypes.func,
});

JobFinder.defaultProps = ({
    onPress: null,
});

export default React.memo(JobFinder);