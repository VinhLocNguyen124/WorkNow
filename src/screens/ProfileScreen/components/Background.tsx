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
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//Navigation
import { useNavigation } from '@react-navigation/native';

//helpers
import { setI18nConfig, translate } from '../../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';

//Components
import ExtendButton from './ExtendButton';
import ItemHeader from './ItemHeader';
import ItemBackground from './ItemBackground';

//Consts
import { Colors } from '../../../constansts/color';
import { Dimens } from '../../../constansts/dimension';

const iconHeader = <FontAwesome name="pencil" size={20} color={'black'}></FontAwesome>

const Background = (props) => {
    const { onPress } = props;

    return (
        <View style={{
            flexDirection: 'column',
            backgroundColor: 'white',
            marginTop: 10,
            paddingHorizontal: 10,
            paddingTop: 10,
            alignItems: 'flex-start'
        }}>

            <ItemHeader title="Experience" onPress={onPress} icon={iconHeader}></ItemHeader>
            <ItemBackground
                major="Mobile Application Developer"
                company="Ba Ria Vung Tau University"
                position="Freelance"
            ></ItemBackground>



            <ItemHeader title="Education" onPress={onPress} icon={iconHeader}></ItemHeader>
            <ItemBackground
                major="Mobile Application Developer"
                company="Ba Ria Vung Tau University"
                position="Freelance"
            ></ItemBackground>

            <ExtendButton title="See all" onPress={onPress}></ExtendButton>

        </View>
    );
}

Background.propTypes = ({
    onPress: PropTypes.func,
});

Background.defaultProps = ({
    onPress: null,
});

export default React.memo(Background);