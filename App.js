import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Permission from "./src/screens/Permisison";
import Product from "./src/screens/Product";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import Welcome2 from "./src/screens/Welcome2";
import Icon from 'react-native-vector-icons/FontAwesome';


const Drawer = createDrawerNavigator();

const DrawerContent = (props) => {
    const {navigation} = props;

    const navigateToScreen = (route) => {
        navigation.navigate(route);
        navigation.closeDrawer();
    }

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItem label="Permission" onPress={() => navigateToScreen('Permission')}/>
            <DrawerItem label="Product" onPress={() => navigateToScreen('Product')}/>
        </DrawerContentScrollView>
    );
}

const BottomTabs = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.bottomTabs}>
            <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Home')}>
                <Icon name="home" size={24} color="black" />
                <Text style={styles.tabText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Welcome')}>
                <Icon name="user" size={24} color="black" />
                <Text style={styles.tabText}>Welcome</Text>
            </TouchableOpacity>
        </View>
    );
}


export default function App() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <NavigationContainer>
                <View style={{flex: 1}}>
                    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <DrawerContent {...props} />}>
                        <Drawer.Screen name="Permission" component={Permission}/>
                        <Drawer.Screen name="Product" component={Product}/>
                        <Drawer.Screen name="Home" component={WelcomeScreen}/>
                        <Drawer.Screen name="Welcome" component={Welcome2}/>
                    </Drawer.Navigator>
                    <BottomTabs/>
                </View>
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bottomTabs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#b7b5b5',
        padding: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    tabText: {
        color: 'white'
    },
});

