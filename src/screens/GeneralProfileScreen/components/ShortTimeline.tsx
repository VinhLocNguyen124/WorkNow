import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';

//Firebase
import auth from '@react-native-firebase/auth';
import { FirebaseErrorRespond } from '../../../helpers/FirebaseErrorRespond';

//Styles & Images & Icons
import BackGround from './../../../assets/images/svg/BackGround';
import { styles } from '../../Styles/styles';
import { Paths } from '../../../constansts/path';
import Entypo from 'react-native-vector-icons/Entypo';

//Navigation
import { useNavigation } from '@react-navigation/native';

//helpers
import { setI18nConfig, translate } from '../../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';

//Components
import ExtendButton from './ExtendButton';

//Consts
import { Colors } from '../../../constansts/color';
import { Dimens } from '../../../constansts/dimension';


const ShortTimeline = (props) => {
    const { startPostPress, seeAllPress, } = props;

    return (
        <View style={{
            flexDirection: 'column',
            backgroundColor: 'white',
            marginTop: 10,
            paddingHorizontal: 10,
            paddingTop: 10,
            alignItems: 'flex-start'
        }}>
            <Text style={{ fontSize: 18 }}>Posts on your timeline</Text>
            <TouchableOpacity style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginVertical: 10,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: Colors.Gray
            }} onPress={startPostPress}>
                <Text style={styles.textLarge}>Start a post</Text>
            </TouchableOpacity>

            <Text>Posts you created in the past are displayed here.</Text>

            <ExtendButton
                title="See all your posts"
                onPress={seeAllPress}
            ></ExtendButton>
        </View>
    );
}

ShortTimeline.propTypes = ({
    startPostPress: PropTypes.func,
    seeAllPress: PropTypes.func,
});

ShortTimeline.defaultProps = ({
    startPostPress: null,
    seeAllPress: null,
});

export default React.memo(ShortTimeline);