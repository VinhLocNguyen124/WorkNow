import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../../../constansts/color';
import { styles } from '../../Styles/styles';
import { useNavigation } from '@react-navigation/native';

const JobItem = (props) => {
    const { item, } = props;
    const navigation = useNavigation();

    return (
        <View style={{ flexDirection: 'column', padding: 10, borderBottomWidth: 1, borderBottomColor: Colors.LightGray }}>

            <Text style={{ ...styles.text, color: Colors.MainBlue, fontWeight: 'bold', fontSize: 16, textAlign: 'justify' }}
                numberOfLines={1} ellipsizeMode="tail"
            >{item.jobname}</Text>

            <Text style={{ ...styles.text, fontSize: 13 }}>{item.companyname}</Text>
            <Text style={{ ...styles.text, fontSize: 13 }}>{item.location}, Vietnam</Text>
            <Text style={{ ...styles.text, fontSize: 13, fontWeight: 'bold' }}><Text style={{ color: Colors.DarkTurquoise }}>{Number(item.compatibility) * 100}%</Text> compatibility <Text style={{ color: '#03fc66', fontWeight: 'bold', fontSize: 20 }}>{Number(item.compatibility) > 0.6 ? "✓" : null}</Text></Text>

            <View style={{ height: 1, backgroundColor: Colors.LightGray, width: "20%", marginVertical: 5 }}></View>
            <Text style={{ ...styles.text }}>{item.date} - <Text style={{ fontSize: 15, color: Colors.DarkTurquoise }}>{item.active ? "Actively recruiting" : "Expired"}</Text></Text>
            <TouchableOpacity
                style={{ padding: 10, elevation: 5, backgroundColor: '#1dcf70', borderRadius: 5, marginTop: 10, width: '70%', alignSelf: 'flex-end' }}
                onPress={() => navigation.navigate('JobDetail', { jobId: item.id })}
            >
                <Text style={{ fontWeight: 'bold', color: 'white', alignSelf: 'center' }}>Job detail</Text>
            </TouchableOpacity>

            <Image source={{ uri: item.urljobavatar }} style={{ height: 80, width: 80, position: 'absolute', top: 35, right: 20 }}></Image>

        </View>
    );
}

JobItem.propTypes = ({
    item: PropTypes.shape({
        jobname: PropTypes.string,
        companyname: PropTypes.string,
        location: PropTypes.string,
        compatibility: PropTypes.string,
        date: PropTypes.string,
        active: PropTypes.bool,
        urljobavatar: PropTypes.string,
    })
});

export default React.memo(JobItem);