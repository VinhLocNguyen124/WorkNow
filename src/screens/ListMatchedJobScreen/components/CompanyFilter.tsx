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



const CompanyFilter = (props) => {
    //Props
    const { } = props;

    //States
    const listCompanyFilter = useSelector(state => state.listMatchedJob.listCompanyFilter);

    //Others
    const dispatch = useDispatch();

    //----------------------------Effects-------------------------------

    useEffect(() => {
        dispatch(getListCompanyFilter());

        return () => {
            //thực thi một lần khi unmount

        }
    }, []);

    //----------------------------Functions-------------------------------

    const onChangeSearchText = (text) => {
        dispatch(onSearchCompanyFilter(text));
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
                placeholder="Looking for a company"
                autoCapitalize="none"
                onChangeText={onChangeSearchText}
            ></TextInput>


            <FlatList
                style={{ height: 200, marginHorizontal: 10 }}
                data={listCompanyFilter}
                renderItem={_renderItem}
                keyExtractor={keyExtractor}
            ></FlatList>



        </View>

    );

}

const tempStyles = StyleSheet.create({

});

CompanyFilter.propTypes = ({

});

export default React.memo(CompanyFilter);