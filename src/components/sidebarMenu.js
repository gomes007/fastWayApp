import React, {useState} from 'react';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import WelcomeScreen from '../screens/WelcomeScreen';
import Welcome2 from "../screens/Welcome2";
import Permission from "../screens/Permisison";
import SignIn from '../screens/Login/index';
import {useAuth} from "../services/AuthContext";
import AuthService from "../services/authService";
import {createStackNavigator} from '@react-navigation/stack';
import {Text, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


const PermissionStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Permission" component={Permission} />
        </Stack.Navigator>
    );
};

const CustomDrawerContent = (props) => {

    const [isRegistryOpen, setIsRegistryOpen] = useState(false);
    const {setIsAuthenticated} = useAuth();


    const handleLogout = async () => {
        try {
            await AuthService.logout();
            setIsAuthenticated(false);
        } catch (error) {
            console.log('Erro ao deslogar:', error);
        }
    };

    const toggleRegistry = () => {
        setIsRegistryOpen(!isRegistryOpen);
    }


    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <TouchableOpacity onPress={toggleRegistry}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text>Registry</Text>
                    <Icon style={{marginLeft: 5}} name={isRegistryOpen ? "angle-up" : "angle-down"} size={20}/>
                </View>
            </TouchableOpacity>
            {isRegistryOpen && (
                <View style={{marginLeft: 20}}>
                    <DrawerItem label="Permission" onPress={() => props.navigation.navigate('PermissionStack', { screen: 'Permission' })}/>
                </View>
            )}
            <DrawerItem label="Logout" onPress={handleLogout}/>
        </DrawerContentScrollView>
    );
};


const SidebarMenu = () => {
    const {isAuthenticated} = useAuth();

    const navigationKey = isAuthenticated ? 'authenticated' : 'unauthenticated';

    if (isAuthenticated) {
        return (
            <Drawer.Navigator key={navigationKey} drawerContent={props => <CustomDrawerContent {...props} />}
                              initialRouteName="Welcome">
                <Drawer.Screen name="Welcome" component={WelcomeScreen}/>
                <Drawer.Screen name="Welcome2" component={Welcome2}/>
                <Drawer.Screen name="PermissionStack" component={PermissionStack} options={{drawerLabel: () => null, title: null, drawerIcon: () => null}}/>
            </Drawer.Navigator>
        );
    } else {
        return (
            <Stack.Navigator key={navigationKey}>
                <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
            </Stack.Navigator>
        );
    }
};


export default SidebarMenu;
