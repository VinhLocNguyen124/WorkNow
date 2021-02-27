import PropTypes from 'prop-types';
import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,

} from 'react-native';

import { Colors } from '../../../constansts/color';
import AntDesign from 'react-native-vector-icons/AntDesign';

const iconActive = <AntDesign name="star" size={18} color={'orange'}></AntDesign>
const iconInactive = <AntDesign name="staro" size={18} color={Colors.Gray}></AntDesign>


const ItemListSkill = (props) => {
    const { onPress, name, important } = props;


    return (
        <TouchableOpacity style={{
            flexDirection: 'row', justifyContent: 'space-between', width: '100%', borderBottomColor: Colors.LightGray,
            borderBottomWidth: 1, alignItems: 'center'
        }} onPress={onPress}>

            <Text style={{
                paddingVertical: 12,
            }}
            >{name}</Text>
            {important ? iconActive : iconInactive}

        </TouchableOpacity>
    );
}

ItemListSkill.propTypes = ({
    onPress: PropTypes.func,
    name: PropTypes.string,
    important: PropTypes.bool,
});

ItemListSkill.defaultProps = ({
    onPress: null,
});

export default React.memo(ItemListSkill);