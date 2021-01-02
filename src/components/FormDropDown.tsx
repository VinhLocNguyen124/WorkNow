import React from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from '../screens/Styles/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../constansts/color';

const FormDropDown = (props) => {
    console.log('render FormDropDown')
    const { title, value, style, onPress, param } = props;
    return (
        <View style={style}>
            <Text style={styles.inputTitle}>{title}</Text>

            <TouchableOpacity style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 6,
                borderBottomWidth: 1,
                borderBottomColor: Colors.Gray
            }} onPress={() => onPress(param)}>
                <Text>{value}</Text>
                <FontAwesome name="sort-down" size={18} color={'black'}></FontAwesome>
            </TouchableOpacity>
        </View>
    );
}

FormDropDown.propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    value: PropTypes.string,
    style: PropTypes.object,
    param: PropTypes.string,
};

FormDropDown.defaultProps = {
    onPress: null,
}

// export default React.memo(FormDropDown, areEqual);
export default React.memo(FormDropDown);

