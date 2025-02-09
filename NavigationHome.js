import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';
import React from "react";
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from "./pages/home";
import Profile from "./pages/profile.js";

const Tab = createBottomTabNavigator();

function TabGroup() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#fff', 
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: 80,
                    elevation: 5,
                    paddingBottom: 5,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Profile") {
                        iconName = focused ? "person" : "person-outline";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#E7B5AC", 
                tabBarInactiveTintColor: "gray", 
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return <TabGroup />;
}
