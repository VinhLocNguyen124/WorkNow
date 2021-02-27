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

//Styles & Images & Icons
import { styles } from '../../Styles/styles';

//Consts
import { Colors } from '../../../constansts/color';



const ExtendButton = (props) => {
    const { title, onPress } = props;

    return (

        <TouchableOpacity style={{
            alignItems: 'center', width: '100%', paddingVertical: 10,
            borderTopWidth: 1,
            borderTopColor: Colors.LightGray,
            marginTop: 10
        }} onPress={onPress}>
            <Text style={styles.textLarge}>{title}</Text>
        </TouchableOpacity>

    );
}

ExtendButton.propTypes = ({
    onPress: PropTypes.func,
    title: PropTypes.string,
});

ExtendButton.defaultProps = ({
    onPress: null
});

export default React.memo(ExtendButton);