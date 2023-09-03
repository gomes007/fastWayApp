import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SidebarMenu from "./src/components/sidebarMenu";
import {AuthProvider} from "./src/services/AuthContext";


export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <SidebarMenu />
            </NavigationContainer>
        </AuthProvider>
    );
}



