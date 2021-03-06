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
import ItemHeader from './ItemHeader';
import ItemBackground from './ItemBackground';

//Consts
import { Colors } from '../../../constansts/color';
import { Dimens } from '../../../constansts/dimension';

//redux
import { useSelector } from 'react-redux';


const Contact = (props) => {
    const { } = props;
    const globalUser = useSelector(state => state.globalUser.globalUser);

    return (
        <View style={{
            flexDirection: 'column',
            backgroundColor: 'white',
            marginTop: 10,
            paddingHorizontal: 10,
            paddingTop: 10,
            paddingBottom: 20,
            alignItems: 'flex-start'
        }}>

            <ItemHeader title="Contact"></ItemHeader>

            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', paddingLeft: 10 }}>
                <Entypo name="email" size={18} color={'black'}></Entypo>
                <View style={{ flex: 1, flexDirection: 'column', borderBottomColor: Colors.LightGray, borderBottomWidth: 1, padding: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>Your email</Text>
                    <Text >{globalUser.email}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', paddingLeft: 10 }}>
                <Entypo name="phone" size={18} color={'black'}></Entypo>
                <View style={{ flex: 1, flexDirection: 'column', borderBottomColor: Colors.LightGray, borderBottomWidth: 1, padding: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>Your phone</Text>
                    <Text >{globalUser.phone}</Text>
                </View>
            </TouchableOpacity>

        </View>
    );
}

Contact.propTypes = ({

});

Contact.defaultProps = ({

});

export default React.memo(Contact);