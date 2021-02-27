import PropTypes from 'prop-types';
import React from 'react';
import {
    Text,
    TouchableOpacity, View
} from 'react-native';
//Styles & Images & Icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const ItemHeader = (props) => {
    const { title, onPress, icon } = props;

    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: 'transparent',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: 5
        }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>

            <TouchableOpacity style={{ padding: 5, }} onPress={onPress}>
                {icon}
            </TouchableOpacity>
        </View>
    );
}

ItemHeader.propTypes = ({
    title: PropTypes.string,
    onPress: PropTypes.func,
    icon: PropTypes.object,
});

ItemHeader.defaultProps = ({
    onPress: null
});

export default React.memo(ItemHeader);