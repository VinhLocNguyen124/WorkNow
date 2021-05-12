import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

//Firebase
import auth from '@react-native-firebase/auth';
import { FirebaseErrorRespond } from '../helpers/FirebaseErrorRespond';

//Styles & Images & Icons
import BackGround from './../assets/images/svg/BackGround';
import AntDesign from 'react-native-vector-icons/AntDesign';

//Navigation
import { useNavigation } from '@react-navigation/native';

//helpers
import { setI18nConfig, translate } from '../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';

//Components
import Header from '../components/Header';

//Consts
import { Colors } from '../constansts/color';

//redux
import { useSelector, useDispatch } from 'react-redux';


const SearchBar = (props) => {
    const { value, placeholder, onChangeSearchText, onFocus, onClose, showCloseButton } = props;


    return (
        <View style={{ height: 60, justifyContent: 'center', backgroundColor: 'white', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: Colors.LightGray }}>
            <View style={tempStyles.search_bar_container}>
                <AntDesign name="search1" size={25} color={'black'} />
                <TextInput
                    style={tempStyles.input_search_bar}
                    autoCapitalize="none"
                    placeholder={placeholder}
                    onChangeText={onChangeSearchText}
                    value={value}
                    onFocus={onFocus}
                    underlineColorAndroid={'rgba(0,0,0,0)'}
                ></TextInput>
                {
                    showCloseButton ?
                        <TouchableOpacity style={{ padding: 5 }} onPress={onClose}>
                            <AntDesign name="close" size={25} color={'black'} />
                        </TouchableOpacity> : null
                }

            </View>
        </View>
    );
}


const tempStyles = StyleSheet.create({
    search_bar_container: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 10,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    input_search_bar: {
        color: Colors.Gray,
        fontSize: 16,
        marginLeft: 5,
        flex: 1,
        textAlignVertical: 'center',
    },
});

SearchBar.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    showCloseButton: PropTypes.bool,
    onChangeSearchText: PropTypes.func,
    onFocus: PropTypes.func,
    onClose: PropTypes.func
};

SearchBar.defaultProps = {
    onChangeSearchText: null
}

export default React.memo(SearchBar);