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
import { Colors } from '../../../constansts/color';


const ExperienceItem = (props) => {
    const { companyname, position, major, expyear, onPress } = props;

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
            <Image source={require('../../../assets/images/random_list1.png')} style={{ height: 50, width: 50, marginRight: 10 }}></Image>
            <View style={{ flexDirection: 'column', flex: 1 }}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ fontSize: 16, fontWeight: 'bold' }}>{major}</Text>
                <Text style={{ fontSize: 14, }}>{companyname}</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Job position: <Text style={{ fontSize: 14, fontWeight: '100' }}> {position}</Text></Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Years of experience: <Text style={{ fontSize: 14, fontWeight: '100' }}> {expyear}</Text></Text>
            </View>
        </TouchableOpacity>
    );
}

ExperienceItem.propTypes = ({
    companyname: PropTypes.string,
    position: PropTypes.string,
    major: PropTypes.string,
    expyear: PropTypes.string,
    onPress: PropTypes.func,
});

ExperienceItem.defaultProps = ({
    onPress: null
});

export default React.memo(ExperienceItem);