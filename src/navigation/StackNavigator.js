import React, { Component } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from "../screens/Register";
import Login from "../screens/Login";
import Profile from "../screens/Profile";
import TabNavigator from "./TabNavigator";
const Stack = createNativeStackNavigator();

export default class StackNavigator extends Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="Profile">
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                <Stack.Screen 
                    name="Register"
                    component={Register}
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="Login"
                    component={Login} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="TabNavigator" 
                    component={TabNavigator} 
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        )
    }
}
