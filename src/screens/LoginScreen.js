import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import AuthService from '../services/authService';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {

        console.log("Email: ", email);
        console.log("Password: ", password);

        try {
            const response = await AuthService.login(email, password);

            console.log("API Response: ", response);

            if (response.token) {
                navigation.navigate('Welcome');
            } else {
                setErrorMessage('Erro ao efetuar login. Por favor, tente novamente.');
            }
        } catch (err) {

            console.log("Error: ", err);

            setErrorMessage('Erro ao efetuar login. Por favor, tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Insira o email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            <Button title="Entrar" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    headerText: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    errorText: {
        color: 'red',
        marginBottom: 16,
    },
});

export default LoginScreen;
