import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AuthService from "../services/authService";

const Welcome2 = ({ navigation }) => {

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            navigation.navigate('Login');
        } catch (error) {
            console.log('Erro ao deslogar:', error);
        }
    };


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
