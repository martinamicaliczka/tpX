import React, { Component } from "react";

import Register from "../screens/Register";
import Login from "../screens/Login";

import TabNavigator from "./TabNavigator";
const Stack = createNativeStackNavigator();

export default class StackNavigator extends Component {
    render() {
        return (
            <Stack.Navigator>
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
