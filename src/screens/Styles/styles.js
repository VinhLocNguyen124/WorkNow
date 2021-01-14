import { StyleSheet } from 'react-native';
import { Colors } from '../../constansts/color';

const logoDimens = {
    height: 100,
    width: 100,
    heightTiny: 50,
    widthTiny: 50,
    heightLarge: 200,
    widthLarge: 200,
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    greeting: {
        marginTop: 32,
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: 'black'
    },
    errorMessage: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },
    form_container: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'transparent'
    },
    form: {
        marginHorizontal: 30,
    },
    inputTitle: {
        color: Colors.Gray,
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: Colors.Gray,
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#161F3D'
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: Colors.DeepSkyBlue,
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center'
    },
    highLightText: {
        color: Colors.DeepSkyBlue,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    tinyLogo: {
        height: logoDimens.heightTiny,
        width: logoDimens.widthTiny,
        alignSelf: 'center'
    },
    normalLogo: {
        height: logoDimens.height,
        width: logoDimens.width,
        alignSelf: 'center'
    },
    largeLogo: {
        height: logoDimens.heightLarge,
        width: logoDimens.widthLarge,
        alignSelf: 'center'
    },
    logoContainer: {
        padding: 15,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: logoDimens.heightLarge,
        elevation: 20,
        borderWidth: 2,
        borderColor: Colors.DarkTurquoise
    },
    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#D8D9DB',
        elevation: 1,
        backgroundColor: 'white'
    },
    inputContainer: {
        margin: 32,
        flexDirection: 'row'
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16
    },
    avatarSmall: {
        width: 35,
        height: 35,
        borderRadius: 20,
        marginRight: 15
    },
    photo: {
        alignItems: 'flex-end',
        marginHorizontal: 32
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    largeTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    normalTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    text: {
        color: Colors.Gray,
        fontSize: 12,
    },
    textLarge: {
        color: Colors.Gray,
        fontSize: 18,
    },
    textNormal: {
        color: Colors.Gray,
        fontSize: 16,
    },


});