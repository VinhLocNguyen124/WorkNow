import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from '../screens/Styles/styles';

const MainButton = (props) => {
    console.log('render MainButton');
    const { onPress, title, waiting } = props;
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
        >
            {waiting ? <ActivityIndicator size={'small'} color={'white'}></ActivityIndicator> :
                <Text style={{ color: 'white', fontWeight: '500' }}>{title}</Text>}
        </TouchableOpacity>
    );
}

//Dùng khi cần so sánh sự thay đổi của một props cụ thể
const areEqual = (prevProps, nextProps) => {
    // Do onPress là một func props được truyền từ comp cha, mỗi khi comp cha rerender 
    // thì sẽ tạo lại một function mới nên sẽ khác với function cũ của prevProps 
    /**
     * Việc chặn ko cho MainButton rerender sẽ dẫn đến việc func props của MainButton ko nhận được func onPress mới từ comp cha
     * nên nó sẽ nắm giữ function cũ trong lần render đầu tiên với những giá trị state cũ -> lỗi 
     */
    return prevProps.title === nextProps.title && prevProps.onPress === nextProps.onPress;
}

MainButton.propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    waiting: PropTypes.bool,
};

MainButton.defaultProps = {
    onPress: null,
}

export default React.memo(MainButton, areEqual);


//Example 
// Person.propTypes = {
//     gender: PropTypes.oneOf([
//       'female', 'male'
//     ])
//   }

