import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
    Animated,
    Platform,
    FlatList,
    Button,
    ActivityIndicator,
} from 'react-native';

//Firebase
import auth from '@react-native-firebase/auth';

//Styles & Images & Icons
import { styles } from '../../Styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

//helpers
import { setI18nConfig, translate } from '../../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';

//redux & actions
import { useSelector, useDispatch } from 'react-redux';
import {

} from '../../../redux/actions/post';

//navigation
import { useNavigation } from '@react-navigation/native';

//Consts
import { Colors } from '../../../constansts/color';
import PropTypes from 'prop-types';

const FilterActionBar = (props) => {
    //Props
    const { onPressCancel, onPressSave } = props;

    //States
    const laodingFilterTimeline = useSelector(state => state.post.loadingFilterTimeline);

    //Others
    const dispatch = useDispatch();
    const navigation = useNavigation();

    //-----------------------Effects----------------------------------
    //-----------------------Functions--------------------------------

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 15, marginTop: 10 }}>
            <TouchableOpacity
                onPress={onPressCancel}
                style={{
                    backgroundColor: Colors.Gray, borderRadius: 5, paddingVertical: 5,
                    paddingHorizontal: 15
                }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onPressSave}
                style={{
                    backgroundColor: Colors.DeepSkyBlue, borderRadius: 5, paddingVertical: 5,
                    paddingHorizontal: 15, marginLeft: 10
                }}>
                {
                    laodingFilterTimeline ?
                        <ActivityIndicator size="small" color={'white'}></ActivityIndicator>
                        :
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Save</Text>
                }

            </TouchableOpacity>
        </View>
    );
}

FilterActionBar.propTypes = ({
    onPressCancel: PropTypes.func,
    onPressSave: PropTypes.func
});

export default FilterActionBar;