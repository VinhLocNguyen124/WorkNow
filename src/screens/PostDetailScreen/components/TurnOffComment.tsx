import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    TouchableOpacity,
    TextInput,
    Text,
    ActivityIndicator,
} from 'react-native';

//Styles & Images & Icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//helpers
import { setI18nConfig, translate } from '../../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';

//Consts
import { Colors } from '../../../constansts/color';

import PropTypes from 'prop-types';


const TurnOffComment = (props) => {
    //Props
    const { } = props;

    return (
        <View style={{
            flexDirection: 'row', padding: 10,
            backgroundColor: Colors.Gray, alignItems: 'center',
            borderWidth: 1, borderColor: Colors.Gray, marginTop: 10
        }}>
            <Text style={{ textAlign: 'justify', color: 'white' }}>This post was turned off commenting function. You cannot comment on this post. 😔</Text>
        </View>
    );
}

TurnOffComment.propTypes = ({

});

export default React.memo(TurnOffComment);