import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Colors } from '../constansts/color';
import { styles } from '../screens/Styles/styles';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';


const Header = (props) => {
    const { waitingHandle, screenName, textRightButton, onPress, noneBackButton } = props;
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            {noneBackButton ?
                <View style={{ width: 24 }}></View>
                :
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="md-arrow-back" size={24} color={Colors.Gray}></Ionicons>
                </TouchableOpacity>
            }
            <Text style={styles.headerTitle}>{screenName}</Text>
            <TouchableOpacity style={{ width: 35 }} onPress={onPress}>
                {waitingHandle ?
                    <ActivityIndicator color={Colors.MainBlue} />
                    :
                    <Text style={{
                        fontWeight: 'bold',
                        color: Colors.Gray
                    }}>{textRightButton}</Text>
                }
            </TouchableOpacity>
        </View>
    );
}


Header.propTypes = {
    onPress: PropTypes.func,
    waitingHandle: PropTypes.bool,
    screenName: PropTypes.string,
    textRightButton: PropTypes.string,
    noneBackButton: PropTypes.bool,
};

Header.defaultProps = {
    onPress: null,
    waitingHandle: false,
    noneBackButton: false,
}

export default React.memo(Header);