import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';
import { Colors } from '../constansts/color';

const Delayed = (props) => {
    const { wait, colorLoading, noneLoading } = props;
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        const timeHidden = setTimeout(() => {
            setHidden(false);
        }, wait)

        return () => {
            //thực thi một lần khi unmount
            clearTimeout(timeHidden);
        }
    }, []);

    return (hidden ? (noneLoading ? <View></View> : <ActivityIndicator size={'large'} color={colorLoading}></ActivityIndicator>) : props.children
    );
}

Delayed.propTypes = ({
    wait: PropTypes.number.isRequired,
    children: PropTypes.element.isRequired,
    colorLoading: PropTypes.string,
    noneLoading: PropTypes.bool,
});

Delayed.defaultProps = ({
    colorLoading: Colors.MainBlue,
    noneLoading: true
});


export default Delayed;