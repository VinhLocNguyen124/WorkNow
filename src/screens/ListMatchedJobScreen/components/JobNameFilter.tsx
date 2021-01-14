import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Button,
    FlatList,
    TextInput,
    StyleSheet,
} from 'react-native';

//Styles & Images & Icons

//helpers

//redux
import { useDispatch, useSelector } from 'react-redux';
import { getListCompanyFilter, onSearchCompanyFilter } from '../../../redux/actions/listMatchedJob';

//Components
import RoundedButton from './RoundedButton';


//Consts
import { Colors } from '../../../constansts/color';
import { Dimens } from '../../../constansts/dimension';
import PropTypes from 'prop-types';



const JobNameFilter = (props) => {
    //Props
    const { } = props;

    //States


    //Others
    const dispatch = useDispatch();

    //----------------------------Effects-------------------------------

    useEffect(() => {


        return () => {
            //thực thi một lần khi unmount

        }
    }, []);

    //----------------------------Functions-------------------------------

    const onChangeText = (text) => {
    }

    const _renderItem = useCallback(
        ({ item }) => (
            <Text style={{ marginVertical: 5 }}>{item.name}</Text>
        )
        ,
        []
    );

    const keyExtractor = useCallback(
        item => item.id.toString(),
        []
    );

    return (
        <View style={{ width: "100%", backgroundColor: 'white', }}>
            <TextInput
                style={{
                    height: 40,
                    marginVertical: 10, borderWidth: 1, borderColor: Colors.Gray,
                    borderRadius: 15,
                    paddingHorizontal: 10,
                }}
                placeholder="Search for a job name"
                autoCapitalize="none"
                onChangeText={onChangeText}
            ></TextInput>
        </View>

    );

}

const tempStyles = StyleSheet.create({

});

JobNameFilter.propTypes = ({

});

export default React.memo(JobNameFilter);