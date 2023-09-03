import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAuth} from "../services/AuthContext";
import {useNavigation} from "@react-navigation/native";

const WelcomeScreen = () => {

    const {isAuthenticated} = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        console.log('Checking authentication', isAuthenticated);
        if (!isAuthenticated) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }
    }, [isAuthenticated]);


    return (
        <View style={styles.container}>

            <Text style={styles.text}>Bem-vindo!</Text>

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
