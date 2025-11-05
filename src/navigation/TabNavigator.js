import React, { Component } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Profile from '../screens/Profile';
import Comments from '../screens/Comments';
import MiniTabNavigator from './MiniTabNavigator';
import Postear from "../components/Postear";

import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';

const Tab = createBottomTabNavigator();

export default class TabNavigator extends Component {
    render() {
        return (
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: 'rgb(1 184 255)',   
                    tabBarInactiveTintColor: 'rgb(255 255 255)', 
                    tabBarStyle: { backgroundColor: 'rgb(29 28 28)' }, 
                }}
            >
                <Tab.Screen 
                    name="MiniTabNavigator" 
                    component={MiniTabNavigator} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Entypo name="home" size={size} color={color} /> 
                        ),
                        headerShown: false,
                        tabBarLabel:"HomePage"
                    }}
                />
                <Tab.Screen 
                    name="Postear" 
                    component={Postear} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Entypo name="new-message" size={size} color={color} /> 
                        ),
                        headerShown: false,
                    }}
                />
                <Tab.Screen 
                    name="Profile" 
                    component={Profile} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="person-outline" size={size} color={color} /> 
                        ),
                        headerShown: false
                    }}
                />
                <Tab.Screen 
                    name="Comments" 
                    component={Comments} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Feather name="message-circle" size={size} color={color} /> 
                        ),
                        headerShown: false
                    }}
                />
            </Tab.Navigator>
        )
    }
}