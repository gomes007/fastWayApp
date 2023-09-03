import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import AuthService from '../services/authService';
import {useAuth} from '../services/AuthContext';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { isAuthenticated, setIsAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Welcome' }],
            });
        }
    }, [isAuthenticated]);

    const handleLogin = async () => {

        console.log("Email: ", email);
        console.log("Password: ", password);

        try {
            const response = await AuthService.login(email, password);

            console.log("API Response: ", response);

            if (response.token) {
                setIsAuthenticated(true);
                console.log('User authenticated');
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
