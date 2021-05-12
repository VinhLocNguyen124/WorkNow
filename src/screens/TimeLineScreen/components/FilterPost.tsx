import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
    Animated,
    Platform,
    FlatList,
    Button,
    ActivityIndicator,
} from 'react-native';

//Firebase
import auth from '@react-native-firebase/auth';

//Styles & Images & Icons
import { styles } from '../../Styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

//helpers
import { setI18nConfig, translate } from '../../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';

//redux & actions
import { useSelector, useDispatch } from 'react-redux';
import {
    filterPostTimeline
} from '../../../redux/actions/post';

//Components
import DateTimePicker from '@react-native-community/datetimepicker';
import FilterActionBar from './FilterActionBar';
import { Radio } from 'native-base';

//navigation
import { useNavigation } from '@react-navigation/native';

//Consts
import { Colors } from '../../../constansts/color';
import PropTypes from 'prop-types';

const FilterPost = (props) => {
    console.log("render filter post");
    //Props
    const { animatedValue, onPressCancel } = props;

    //States
    const globalUser = useSelector(state => state.globalUser.globalUser);
    const [dateFrom, setDateFrom] = useState(new Date("1/1/2021"));
    const [dateTo, setDateTo] = useState(new Date());
    const [mode, setMode] = useState('from');
    const [show, setShow] = useState(false);
    const [privacy, setPrivacy] = useState('all');

    //Others
    const dispatch = useDispatch();
    const navigation = useNavigation();

    //-----------------------Effects----------------------------------
    //-----------------------Functions--------------------------------

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || new Date(Date.now());
        switch (mode) {
            case "from":
                setShow(false);
                setDateFrom(currentDate);
                break;

            case "to":
                setShow(false);
                setDateTo(currentDate);
                break;

            default:
                setShow(false);
                break;
        }
    };

    const onSelectFromDate = () => {
        setShow(true);
        setMode('from');
    }
    const onSelectToDate = () => {
        setShow(true);
        setMode('to');
    }

    const onChangePrivacy = (value) => {
        setPrivacy(value);
    }

    const onPressSaveFilter = () => {
        dispatch(filterPostTimeline(globalUser.email, dateFrom, dateTo, privacy));
    }

    return (
        <Animated.View style={{
            height: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 280]
            }),
            justifyContent: 'center', backgroundColor: 'white', width: "100%", borderBottomColor: Colors.LightGray, borderBottomWidth: 1, marginTop: -5
        }}>
            {
                animatedValue === 1 ? <View style={{ width: '100%', height: 20, backgroundColor: 'blue' }}></View> : null
            }
            <Text style={{ fontWeight: 'bold', marginLeft: 15 }}>Period of time:</Text>
            <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: "space-between", padding: 10, paddingHorizontal: 20 }}>

                <TouchableOpacity
                    onPress={onSelectFromDate}
                    style={styles.button_date}>
                    <Text style={{ fontWeight: 'bold' }}>From: <Text style={{ fontWeight: '100' }}>{dateFrom.toString().substr(4, 12)}</Text></Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onSelectToDate}
                    style={styles.button_date}>
                    <Text style={{ fontWeight: 'bold' }}>To: <Text style={{ fontWeight: '100' }}>{dateTo.toString().substr(4, 12)}</Text></Text>
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={mode === 'from' ? dateFrom : dateTo}
                        is24Hour={true}
                        display="spinner"
                        onChange={onChange}
                    />
                )}
            </View>

            <Text style={{ fontWeight: 'bold', marginLeft: 15 }}>Post privacy:</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 5 }}>
                <Text>Connection mode  --</Text>
                <Radio
                    color={Colors.Gray}
                    selectedColor={Colors.MainBlue}
                    onPress={() => onChangePrivacy("connection")}
                    selected={privacy === "connection" ? true : false} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 0 }}>
                <Text>Anyone mode  --</Text>
                <Radio
                    color={Colors.Gray}
                    selectedColor={Colors.MainBlue}
                    onPress={() => onChangePrivacy("anyone")}
                    selected={privacy === "anyone" ? true : false} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 5 }}>
                <Text>All post  --</Text>
                <Radio
                    color={Colors.Gray}
                    selectedColor={Colors.MainBlue}
                    onPress={() => onChangePrivacy("all")}
                    selected={privacy === "all" ? true : false} />
            </View>

            <FilterActionBar
                onPressSave={onPressSaveFilter}
                onPressCancel={onPressCancel}
            ></FilterActionBar>
        </Animated.View>
    );
}

FilterPost.propTypes = ({
    onPressCancel: PropTypes.func
});

export default FilterPost;