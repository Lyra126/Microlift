import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from "react";

import Home from "./pages/home.js";
import Profile from "./pages/profile.js";


const Tab = createBottomTabNavigator();

function TabGroup(){
    return(
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
    )
}
export default function Navigation(){
    return(
        <TabGroup />
    )
}