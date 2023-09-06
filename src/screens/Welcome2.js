import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AuthService from "../services/authService";

const Welcome2 = ({ navigation }) => {


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Ola</Text>

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 32,
    },
});

export default Welcome2;
