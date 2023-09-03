import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#f2eded',
    },
    headerTitle: {
        textAlign: "center",
        alignItems: "center",
        fontSize: 24,
        bottom: 0,
        fontWeight: "bold"
    },
    inputContent: {
        marginTop: 30,
        marginHorizontal: 20,
    },
    nomeInput: {
        marginBottom: 16,
        width: 330,
        height: 50,
        borderRadius: 8,
        left: -5,
        backgroundColor: "#F6F6F6",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#E8E8E8",
    },
    saveButton: {
        marginTop: 50,
    }


});

module.exports = styles
