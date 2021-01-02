import PropTypes from 'prop-types';
import React from 'react';
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import ItemHeader from './ItemHeader';
import ExtendButton from './ExtendButton';
import { Colors } from '../../../constansts/color';
import { styles } from '../../Styles/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const iconHeader = <FontAwesome name="pencil" size={20} color={'black'}></FontAwesome>
const iconActive = <AntDesign name="star" size={25} color={'orange'}></AntDesign>

const ListSkill = (props) => {
    const { onPress, listSkill } = props;

    const returnListSkill = () => {

        const listViewSkill = [];

        const importantListSkill = listSkill.filter(skill => skill.important === true);

        importantListSkill.map((item, index) => {
            listViewSkill.push(<Text key={index} style={{
                borderTopColor: Colors.LightGray,
                borderTopWidth: 1,
                paddingVertical: 12,
                width: '100%'
            }}>{item.name}</Text>)
        });

        return listViewSkill;
    }

    return (
        <View style={{
            flexDirection: 'column',
            backgroundColor: 'white',
            marginTop: 10,
            paddingHorizontal: 10,
            paddingTop: 10,
            alignItems: 'flex-start'
        }}>
            <ItemHeader title="Skills" icon={iconHeader} onPress={onPress}></ItemHeader>
            <TouchableOpacity style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginVertical: 10,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: Colors.Gray
            }} onPress={onPress}>
                <Text style={styles.textLarge}>Add a new skill</Text>
            </TouchableOpacity>

            <ItemHeader title="Best skills" icon={iconActive}></ItemHeader>

            {returnListSkill()}

            <ExtendButton
                title="See all"
                onPress={onPress}
            ></ExtendButton>

        </View>
    );
}

ListSkill.propTypes = ({
    onPress: PropTypes.func,
    listSkill: PropTypes.array,
});

ListSkill.defaultProps = ({
    onPress: null,
});

export default React.memo(ListSkill);