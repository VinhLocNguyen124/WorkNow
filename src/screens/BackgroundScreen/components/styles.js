import { StyleSheet } from 'react-native';
import { Colors } from "../../../constansts/color";

export const styles = StyleSheet.create({
    background_view: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0,0.7)',
        justifyContent: "center",
        paddingVertical: 30
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    input: {
        height: 40,
        borderBottomColor: Colors.LightGray,
        borderBottomWidth: 1,
        width: '100%',
        marginTop: 20
    },
    saveButton: {
        backgroundColor: Colors.MainBlue,
        borderRadius: 10,
        padding: 10,
        elevation: 5,
        marginTop: 25,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginTop: 10,
        textAlign: "center",
        color: Colors.MainBlue,
        fontWeight: 'bold',
        fontSize: 25,
        paddingBottom: 10,
        width: '100%',
        borderBottomColor: Colors.LightGray,
        borderBottomWidth: 1,
    }
});