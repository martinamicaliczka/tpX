import React, { Component } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ComentarPost from "../screens/ComentarPost";
import HomePage from "../screens/HomePage";


const Stack = createNativeStackNavigator();

export default class MiniTabNavigator extends Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen 
                    name="HomePage" 
                    component={HomePage} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="ComentarPost" 
                    component={ComentarPost} 
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        )}
    }