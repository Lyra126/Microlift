import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';

import businessHome from "./pages/businessHome.js";
import businessProfile from "./pages/businessProfile.js";

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

                    if (route.name === "businessHome") {
                        iconName = focused ? "briefcase" : "briefcase-outline";
                    } else if (route.name === "businessProfile") {
                        iconName = focused ? "person-circle" : "person-circle-outline";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#E7B5AC", 
                tabBarInactiveTintColor: "gray", 
            })}
        >
            <Tab.Screen name="businessHome" component={businessHome} />
            <Tab.Screen name="businessProfile" component={businessProfile} />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return <TabGroup />;
}
