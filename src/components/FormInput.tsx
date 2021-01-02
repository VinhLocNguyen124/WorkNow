import React from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from '../screens/Styles/styles';

const FormInput = (props) => {
    console.log('render FormInput')
    const { title, onChangeText, value, style } = props;
    return (
        <View style={style}>
            <Text style={styles.inputTitle}>{title}</Text>
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={onChangeText}
                value={value}
            ></TextInput>
        </View>
    );
}

const areEqual = (prevProps, nextProps) => {

    return prevProps.title === nextProps.title &&
        prevProps.onChangeText === nextProps.onChangeText &&
        prevProps.value === nextProps.value;
}

FormInput.propTypes = {
    onChangeText: PropTypes.func,
    title: PropTypes.string,
    value: PropTypes.string,
    style: PropTypes.object,
};

FormInput.defaultProps = {
    onChangeText: null,
}

// export default React.memo(FormInput, areEqual);
export default React.memo(FormInput, areEqual);
// export default FormInput;

