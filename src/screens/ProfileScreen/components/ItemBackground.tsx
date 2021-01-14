import PropTypes from 'prop-types';
import React from 'react';
import {
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
//Styles & Images & Icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../../constansts/color';


const ItemBackground = (props) => {
    const { position, major, company, onPress } = props;

    return (
        <TouchableOpacity style={{
            flexDirection: 'row',
            backgroundColor: 'transparent',
            alignItems: 'center',
            width: '100%',
            borderTopWidth: 1,
            paddingVertical: 5,
            borderTopColor: Colors.LightGray
        }}
            onPress={onPress}
        >
            <Image source={require('../../../assets/images/random_list.png')} style={{ height: 50, width: 50, marginRight: 10 }}></Image>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{major}</Text>
                <Text style={{ fontSize: 14, }}>{company}</Text>
                <Text style={{ fontSize: 14, }}>{position}</Text>
            </View>
        </TouchableOpacity>
    );
}

ItemBackground.propTypes = ({
    major: PropTypes.string,
    company: PropTypes.string,
    position: PropTypes.string,
    onPress: PropTypes.func,
});

ItemBackground.defaultProps = ({
    onPress: null
});

export default React.memo(ItemBackground);