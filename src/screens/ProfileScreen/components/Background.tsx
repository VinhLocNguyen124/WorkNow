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

//redux
import { useDispatch, useSelector } from 'react-redux';

//Components
import ExtendButton from './ExtendButton';
import ItemHeader from './ItemHeader';
import ItemBackground from './ItemBackground';
import EducationItem from '../../BackgroundScreen/components/EducationItem';
import ExperienceItem from '../../BackgroundScreen/components/ExperienceItem';

//consts
import { Colors } from '../../../constansts/color';
import { Dimens } from '../../../constansts/dimension';

const iconHeader = <FontAwesome name="pencil" size={20} color={'black'}></FontAwesome>
const Background = (props) => {
    //Props
    const { onPress } = props;

    //States
    const globalUser = useSelector(state => state.globalUser.globalUser);

    //Others

    //-------------------------------------------------------------------------------------
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
            {globalUser.companies.length === 0 ?
                null
                :
                <ExperienceItem
                    major={globalUser.companies[0].major}
                    companyname={globalUser.companies[0].companyname}
                    position={globalUser.companies[0].position}
                    expyear={globalUser.companies[0].expyear}
                ></ExperienceItem>
            }


            <ItemHeader title="Education" onPress={onPress} icon={iconHeader}></ItemHeader>
            {globalUser.schools.length === 0 ?
                null
                :
                <EducationItem
                    schoolname={globalUser.schools[0].schoolname}
                    major={globalUser.schools[0].major}
                    schoolyaer={globalUser.schools[0].schoolyear}
                ></EducationItem>
            }
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