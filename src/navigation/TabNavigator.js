import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Profile from '../screens/Profile';
import Comments from '../screens/Comments';
import MiniTabNavigator from './MiniTabNavigator';

import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';

const Tab = createBottomTabNavigator();

export default class TabNavigator extends Component {
    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen 
                    name="MiniTabNavigator" 
                    component={MiniTabNavigator} 
                    options={
                        {tabBarIcon: () => <Entypo name="home" size={24} color="white" /> ,
                        headerShown: false,
                        tabBarLabel:"HomePage"
                    }}
                />
                <Tab.Screen 
                    name="Profile" 
                    component={Profile} 
                    options={
                        {tabBarIcon: () => <MaterialIcons name="person-outline" size={24} color="white" /> ,
                        headerShown: false
                    }}
                />
                <Tab.Screen 
                    name="Comments" 
                    component={Comments} 
                    options={
                        {tabBarIcon: () => <Feather name="message-circle" size={24} color="white" /> ,
                        headerShown: false
                    }}
                />
            </Tab.Navigator>
        )
    }
}