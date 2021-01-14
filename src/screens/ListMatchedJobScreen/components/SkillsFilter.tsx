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
import AntDesign from 'react-native-vector-icons/AntDesign';

//helpers

//redux
import { useDispatch, useSelector } from 'react-redux';

//Components
import RoundedButton from './RoundedButton';
import ItemHeader from '../../ProfileScreen/components/ItemHeader';
import AddSkillModal from '../../ListSkillScreen/components/AddSkillModal';
import ItemListSkill from '../../ListSkillScreen/components/ItemListSkill';


//Consts
import { Colors } from '../../../constansts/color';
import { Dimens } from '../../../constansts/dimension';
import PropTypes from 'prop-types';


const iconHeader = <AntDesign name="plussquareo" size={25} color={Colors.MainBlue}></AntDesign>

const SkillsFilter = (props) => {
    //Props
    const { } = props;

    //States
    const [modalAddVisible, setModalAddVisible] = useState(false);
    const listSkill = useSelector(state => state.listSkill.listSkill);

    //Others
    const dispatch = useDispatch();

    //----------------------------Effects-------------------------------

    useEffect(() => {

        return () => {
            //thực thi một lần khi unmount

        }
    }, []);

    //----------------------------Functions-------------------------------

    const onPressItemListSkill = (item) => {

    }

    const _renderItem = useCallback(
        ({ item }) => (
            <ItemListSkill
                key={item.id}
                name={item.name}
                important={item.important}
                onPress={() => { onPressItemListSkill(item) }}
            ></ItemListSkill>
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
            <ItemHeader
                title="Filter skills"
                icon={iconHeader}
                onPress={() => setModalAddVisible(true)}
            ></ItemHeader>

            {listSkill ?
                <FlatList
                    data={listSkill}
                    renderItem={_renderItem}
                    keyExtractor={keyExtractor}
                ></FlatList>
                : <View></View>
            }

            <AddSkillModal
                visible={modalAddVisible}
                onPressClose={() => setModalAddVisible(false)}
            ></AddSkillModal>
        </View>

    );

}

const tempStyles = StyleSheet.create({

});

SkillsFilter.propTypes = ({

});

export default React.memo(SkillsFilter);