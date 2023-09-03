import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import AuthService from "../services/authService";

const WelcomeScreen = () => {

    const navigation = useNavigation();

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
            <Text style={styles.text}>Bem-vindo!</Text>
            <Button title="Deslogar" onPress={handleLogout} />
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

export default WelcomeScreen;
