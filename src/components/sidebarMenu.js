import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import WelcomeScreen from '../screens/WelcomeScreen';
import Welcome2 from "../screens/Welcome2";
import LoginScreen from '../screens/LoginScreen';
import { useAuth } from "../services/AuthContext";
import AuthService from "../services/authService";
import { createStackNavigator } from '@react-navigation/stack';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const CustomDrawerContent = (props) => {
    const { setIsAuthenticated } = useAuth();

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            setIsAuthenticated(false);
        } catch (error) {
            console.log('Erro ao deslogar:', error);
        }
    };

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={handleLogout} />
        </DrawerContentScrollView>
    );
};

const SidebarMenu = () => {
    const { isAuthenticated } = useAuth();

    const navigationKey = isAuthenticated ? 'authenticated' : 'unauthenticated';

    if (isAuthenticated) {
        return (
            <Drawer.Navigator key={navigationKey} drawerContent={props => <CustomDrawerContent {...props} />}
                              initialRouteName="Welcome">
                <Drawer.Screen name="Welcome" component={WelcomeScreen} />
                <Drawer.Screen name="Welcome2" component={Welcome2} />
            </Drawer.Navigator>
        );
    } else {
        return (
            <Stack.Navigator key={navigationKey}>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }
};


export default SidebarMenu;
