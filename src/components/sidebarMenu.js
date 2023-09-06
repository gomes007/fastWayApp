import React, {useState} from 'react';
import {createDrawerNavigator, DrawerContentScrollView,
    DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import WelcomeScreen from '../screens/WelcomeScreen';
import Welcome2 from "../screens/Welcome2";
import Permission from "../screens/Permisison";
import Product from "../screens/Product";
import SignIn from '../screens/Login/index';
import {useAuth} from "../services/AuthContext";
import AuthService from "../services/authService";
import {createStackNavigator} from '@react-navigation/stack';
import {Text, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {ProductProvider} from "../screens/Product/ProductContext";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();


const PermissionStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Permission" component={Permission} />
        </Stack.Navigator>
    );
};

const ProductWithProvider = () => {
    return (
        <ProductProvider>
            <Product />
        </ProductProvider>
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
                    <DrawerItem label="Product" onPress={() => props.navigation.navigate('Product')} />
                </View>
            )}
            <DrawerItem label="Logout" onPress={handleLogout}/>
        </DrawerContentScrollView>

    );
};


const MainTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={({ navigation }) => ({
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={24} />
                    ),

                })}
            />
            <Tab.Screen
                name="Welcome2"
                component={Welcome2}
                options={({ navigation }) => ({
                    tabBarIcon: ({ color }) => (
                        <Icon name="user" color={color} size={24} />
                    ),

                })}
            />
        </Tab.Navigator>
    );
};


const SidebarMenu = () => {
    const { isAuthenticated } = useAuth();
    const navigationKey = isAuthenticated ? 'authenticated' : 'unauthenticated';

    if (isAuthenticated) {
        return (
            <Drawer.Navigator
                drawerContent={props => <CustomDrawerContent {...props} />}
            >
                <Drawer.Screen name="MainTabs" component={MainTabs} />
                <Drawer.Screen name="PermissionStack" component={PermissionStack} />
                <Drawer.Screen name="Product" component={ProductWithProvider} />
            </Drawer.Navigator>
        );
    } else {
        return (
            <Stack.Navigator>
                <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }
};


export default SidebarMenu;
