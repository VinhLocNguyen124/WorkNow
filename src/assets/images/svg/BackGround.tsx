import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const BackGround = (props) => {
    const { path, style, fill } = props;
    return (
        <View
            style={[{ backgroundColor: 'transparent' }, style]}
        >
            <Svg height={height / 2} width="100%">
                <Path
                    fill={fill}
                    fill-opacity="1"
                    d={path}></Path>
            </Svg>
        </View>
    );
}

BackGround.propTypes = {
    path: PropTypes.string,
    style: PropTypes.object,
    fill: PropTypes.string,
};

BackGround.defaultProps = {
    fill: "#0099ffB3",
}

export default React.memo(BackGround);