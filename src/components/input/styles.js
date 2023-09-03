import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F6F6F6',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 8
    },
    textInput: {
        flex: 1
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333'
    },

});
module.exports = styles;
