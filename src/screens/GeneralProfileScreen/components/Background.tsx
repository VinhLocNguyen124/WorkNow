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
    const { listCompany = [], listSchool = [] } = props;

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

            <ItemHeader title="Experience" ></ItemHeader>
            {listCompany.length > 0 ?
                listCompany.map((item) => <ExperienceItem
                    key={item._id}
                    major={item.major}
                    companyname={item.companyname}
                    position={item.position}
                    expyear={item.expyear}
                ></ExperienceItem>
                )
                :
                null
            }

            <View style={{ height: 20 }}></View>

            <ItemHeader title="Education"  ></ItemHeader>
            {listSchool.length > 0 ?
                listSchool.map((item) => <EducationItem
                    key={item._id}
                    schoolname={item.schoolname}
                    major={item.major}
                    schoolyaer={item.schoolyear}
                ></EducationItem>
                )
                :
                null
            }


            <View style={{ height: 20 }}></View>

        </View>
    );
}

Background.propTypes = ({
    listCompany: PropTypes.array,
    listSchool: PropTypes.array,
});

Background.defaultProps = ({

});

export default React.memo(Background);