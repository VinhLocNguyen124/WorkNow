import { StyleSheet } from 'react-native';
import { Colors } from '../../../constansts/color';
import { Dimens } from '../../../constansts/dimension';

//Dimensions
const standartMargin = 10;

export const tempStyles = StyleSheet.create({
    pi_container: {

    },
    relation_bar_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.LightGray,
        marginHorizontal: standartMargin,
    },
    post_details_container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: standartMargin,
        marginTop: 10,
    },
    reacttion_bar_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: standartMargin,
        marginVertical: 5,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.LightGray,
        paddingBottom: 5
    },
    function_bar_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: standartMargin + 5,
        marginBottom: 10,
    },
    function_text: {
        fontSize: 15,
        color: Colors.Gray,
        fontWeight: 'bold'
    },
    text_content: {
        margin: standartMargin,
        textAlign: 'left',
    },
    pi_all_container: {
        backgroundColor: 'rgba(0,0,0,0.5)', height: Dimens.heightScreen
    },
    pi_outside_touch: {
        flex: 1, backgroundColor: 'transparent',
    },
    pi_main_container: {
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderTopWidth: 1.5,
        borderLeftWidth: 1.5,
        borderRightWidth: 1.5,
        borderColor: Colors.LightGray,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    pi_header: {
        height: 40,
        backgroundColor: 'transparent',
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.LightGray
    },
    pi_horizontal_bar: {
        width: 60,
        backgroundColor: Colors.Gray,
        height: 4,
        marginBottom: 10
    },
});