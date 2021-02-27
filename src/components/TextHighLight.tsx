import React from 'react';
import {
    Text,
} from 'react-native';
import PropTypes from 'prop-types';

const TextHighLight = (props) => {
    const { mainText, subText, colorMT, colorST, fontWeightMT, fontWeightST, fontSizeMT, fontSizeST, onPress } = props;
    return (
        <Text
            onPress={onPress}
            style={{
                fontWeight: fontWeightST,
                color: colorST,
                fontSize: fontSizeST
            }}
        ><Text style={{
            fontWeight: fontWeightMT,
            color: colorMT,
            fontSize: fontSizeMT
        }}>{mainText}</Text> {subText}</Text>
    );
}

TextHighLight.propTypes = ({
    mainText: PropTypes.string,
    subText: PropTypes.string,
    colorMT: PropTypes.string,
    colorST: PropTypes.string,
    fontWeightMT: PropTypes.string,
    fontWeightST: PropTypes.string,
    fontSizeMT: PropTypes.number,
    fontSizeST: PropTypes.number,
    onPress: PropTypes.func,
});

TextHighLight.defaultProps = ({
    mainText: '',
    subText: '',
    colorMT: 'black',
    colorST: 'black',
    fontWeightMT: 'bold',
    fontWeightST: '100',
    fontSizeMT: 14,
    fontSizeST: 14,
});



export default React.memo(TextHighLight);