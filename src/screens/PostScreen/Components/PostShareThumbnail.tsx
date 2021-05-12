import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    TouchableNativeFeedback,
    Button,
    TextInput,
} from 'react-native';

import auth from '@react-native-firebase/auth';

//Styles & Images & Icons
import { styles } from '../../Styles/styles';
import { tempStyles } from '../../HomeScreen/Styles/index';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

//helpers
import { setI18nConfig, translate } from '../../../helpers/setI18nConfig';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment';
import { returnAvatarUser } from '../../../helpers/UIHandling';

//Components
import TextHighLight from '../../../components/TextHighLight';

//Consts
import { Colors } from '../../../constansts/color';
import { Dimens } from '../../../constansts/dimension';
import PropTypes from 'prop-types';

//Navigation
import { useNavigation } from '@react-navigation/native';


const PostShareThumbnail = (props) => {
    const { email, displayName } = auth().currentUser;
    const { idpostshare, imgurl, textcontent, date, seescope, urlavatar, username, headline, emailuser, recommend, margin, padding, onLongPress } = props;

    const navigation = useNavigation();

    return (
        <TouchableNativeFeedback onLongPress={onLongPress}>
            <View style={{ backgroundColor: 'white', borderWidth: 2, borderColor: Colors.LightGray, borderRadius: 10, paddingBottom: 5, margin: margin, padding: padding }}>

                <View style={tempStyles.post_details_container}>
                    <Image source={{ uri: returnAvatarUser(urlavatar) }} style={styles.avatar} />

                    <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <TextHighLight
                            mainText={username}
                            subText={email === emailuser ? '' : recommend ? '- 3rd+' : '- In your network'}
                            fontSizeMT={16}
                            fontSizeST={12}
                            colorST={Colors.Gray}
                            onPress={() => {
                                email === emailuser ?
                                    navigation.navigate("Profile")
                                    :
                                    navigation.navigate("GeneralProfile", { _email: emailuser })
                            }}
                        />
                        {headline ? <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>{headline}</Text> : null}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Text style={styles.text}>{moment(date).fromNow()} - </Text>
                            <Ionicons name={seescope === "anyone" ? "earth" : "people"} size={14} color={Colors.Gray}></Ionicons>
                        </View>

                    </View>
                </View>

                <Text style={tempStyles.text_content}> {textcontent}</Text>

                {
                    imgurl ?
                        <Image source={{ uri: imgurl }} style={{
                            width: "100%",
                            height: Dimens.retangleImageFitScreen.height,
                            borderRadius: 7,
                        }} />
                        : null
                }
            </View>
        </TouchableNativeFeedback>
    );
}

PostShareThumbnail.propTypes = ({
    idpostshare: PropTypes.string,
    imgurl: PropTypes.string,
    textcontent: PropTypes.string,
    date: PropTypes.string,
    seescope: PropTypes.string,
    urlavatar: PropTypes.string,
    username: PropTypes.string,
    headline: PropTypes.string,
    emailuser: PropTypes.string,
    recommend: PropTypes.bool,
    margin: PropTypes.number,
    padding: PropTypes.number,
    onLongPress: PropTypes.func,
});

PostShareThumbnail.defaultProps = ({

});

const areEqual = (prevState, nextState) => {
    return prevState.label === nextState.label;
}



export default React.memo(PostShareThumbnail);