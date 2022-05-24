import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './screens/Inicio'
import Login from './screens/Login';

type AppStackParams = {
    Login: undefined;
    Geoloc: undefined;
}

const Stack = createNativeStackNavigator<AppStackParams>();

export default function MainStackNavigator() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' >
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false}} />
                <Stack.Screen name="Geoloc" component={Inicio} options={{ headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}