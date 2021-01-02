import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from '../screens/Styles/styles';

const TextHighLightButton = (props) => {
    console.log('render TextHighLightButton');
    const { onPress, normalText, highLightText, style } = props;
    return (
        <TouchableOpacity
            style={[{ alignSelf: 'center', marginTop: 32 }, style]}
            onPress={onPress}
        >
            <Text>
                {normalText} <Text style={styles.highLightText}>{highLightText}</Text>
            </Text>
        </TouchableOpacity>
    );
}

TextHighLightButton.propTypes = {
    onPress: PropTypes.func,
    normalText: PropTypes.string,
    highLightText: PropTypes.string,
    style: PropTypes.object,
};

TextHighLightButton.defaultProps = {
    onPress: null,
}

export default React.memo(TextHighLightButton);


