import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Button,
    TextInput,
} from 'react-native';

//Styles & Images & Icons

//helpers
import { setI18nConfig, translate } from '../../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';

//Components

//Consts
import { Colors } from '../../../constansts/color';
import PropTypes from 'prop-types';


const BottomSheetItem = (props) => {

    const { icon, label, onPress } = props;
    console.log(`render ${label}`)

    return (
        <TouchableOpacity
            style={{ height: 40, backgroundColor: 'transparent', width: "100%", justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}
            onPress={() => onPress(label)}
        >
            <View style={{ marginHorizontal: 20 }}>
                {icon}
            </View>

            <Text style={{ color: Colors.Gray, fontWeight: 'bold' }}>{label}</Text>
        </TouchableOpacity>
    );
}

BottomSheetItem.propTypes = ({
    icon: PropTypes.any,
    label: PropTypes.string,
    onPress: PropTypes.func,
});

BottomSheetItem.defaultProps = ({
    onPress: null
});

const areEqual = (prevState, nextState) => {
    return prevState.label === nextState.label;
}



export default React.memo(BottomSheetItem, areEqual);