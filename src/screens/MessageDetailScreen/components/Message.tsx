import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Button,
    TextInput,
    StyleSheet
} from 'react-native';

//Styles & Images & Icons
import { styles } from '../../Styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

//helpers
import { setI18nConfig, translate } from '../../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment';

//Components
import TextHighLight from '../../../components/TextHighLight';

//Consts
import { Colors } from '../../../constansts/color';
import PropTypes from 'prop-types';


const Message = (props) => {

    const { username, message, date, } = props;

    return (
        <View style={{
            flexDirection: 'column',
            alignItems: username === "loc" ? 'flex-end' : 'flex-start',
            marginHorizontal: 10,
            marginVertical: 6,
        }}>

            <Text style={{
                color: username === "loc" ? 'white' : 'black',
                fontSize: 16,
                backgroundColor: username === "loc" ? Colors.MainBlue : '#f2f2f2',
                padding: 10,
                borderRadius: 10,
                maxWidth: '70%'
            }}>{message}</Text>


            <Text style={{ width: '95%', fontSize: 12, textAlign: username === "loc" ? 'right' : 'left' }} >{username} - <Text style={{ fontWeight: 'bold', color: Colors.DeepSkyBlue, fontSize: 12 }}>{moment(date).fromNow()}</Text></Text>


        </View>
    );
}

Message.propTypes = ({
    username: PropTypes.string,
    message: PropTypes.string,
    date: PropTypes.string,
    onPress: PropTypes.func,
});

Message.defaultProps = ({
    onPress: null,
});

const tempStyles = StyleSheet.create({

    ms_details_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 6,
    },

});



export default React.memo(Message);