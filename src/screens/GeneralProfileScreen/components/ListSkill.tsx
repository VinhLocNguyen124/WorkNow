import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    FlatList,
} from 'react-native';

//Components
import ItemHeader from './ItemHeader';
import ItemListSkill from '../../ListSkillScreen/components/ItemListSkill'
import ExtendButton from './ExtendButton';

//Style
import { Colors } from '../../../constansts/color';
import { styles } from '../../Styles/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

//helpers
import { filterBestSkill, filterSubSkill } from '../../../helpers/ArrayHandling';

const iconHeader = <FontAwesome name="pencil" size={20} color={'black'}></FontAwesome>
const iconActive = <AntDesign name="star" size={25} color={'orange'}></AntDesign>

const ListSkill = (props) => {
    const { onPress, listSkill = [], username } = props;

    return (
        <View style={{
            flexDirection: 'column',
            backgroundColor: 'white',
            marginTop: 10,
            paddingHorizontal: 10,
            paddingTop: 10,
            alignItems: 'flex-start'
        }}>
            <ItemHeader title={username + "'s Skills"} ></ItemHeader>
            <View style={{ height: 20 }}></View>

            <Text style={{ fontSize: 18, fontWeight: 'bold', width: '100%', padding: 10, backgroundColor: Colors.LightSkyBlue }}>Best skills</Text>
            {listSkill.length > 0 ?
                filterBestSkill(listSkill).map(item => <ItemListSkill
                    key={item._id}
                    name={item.name}
                    important={item.important}
                ></ItemListSkill>)
                : null
            }


            <Text style={{ fontSize: 18, fontWeight: 'bold', width: '100%', padding: 10, backgroundColor: Colors.LightSkyBlue }}>Sub skills</Text>

            {listSkill.length > 0 ?
                filterSubSkill(listSkill).map(item => <ItemListSkill
                    key={item._id}
                    name={item.name}
                    important={item.important}
                ></ItemListSkill>)
                : null
            }
            <View style={{ height: 40 }}></View>
        </View>
    );
}

ListSkill.propTypes = ({
    onPress: PropTypes.func,
    listSkill: PropTypes.array,
    username: PropTypes.string
});

ListSkill.defaultProps = ({
    onPress: null,
});

export default React.memo(ListSkill);