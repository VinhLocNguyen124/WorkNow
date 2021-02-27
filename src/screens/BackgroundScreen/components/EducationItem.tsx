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


const EducationItem = (props) => {
    const { schoolname, major, schoolyaer, onPress } = props;

    return (
        <TouchableOpacity style={{
            flexDirection: 'row',
            backgroundColor: 'transparent',
            alignItems: 'center',
            // width: '100%',
            borderTopWidth: 1,
            paddingVertical: 5,
            borderTopColor: Colors.LightGray
        }}
            onPress={onPress}
        >
            <Image source={require('../../../assets/images/random_list2.png')} style={{ height: 50, width: 50, marginRight: 10 }}></Image>
            <View style={{ flexDirection: 'column', flex: 1 }}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ fontSize: 16, fontWeight: 'bold', }}>{schoolname}</Text>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ fontSize: 14, }}>{major}</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Academic year: <Text style={{ fontSize: 14, fontWeight: '100' }}> {schoolyaer}</Text></Text>
            </View>
        </TouchableOpacity>
    );
}

EducationItem.propTypes = ({
    schoolname: PropTypes.string,
    major: PropTypes.string,
    schoolyaer: PropTypes.string,
    onPress: PropTypes.func,
});

EducationItem.defaultProps = ({
    onPress: null
});

export default React.memo(EducationItem);