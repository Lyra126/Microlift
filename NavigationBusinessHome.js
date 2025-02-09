import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from "react";

import businessHome from "./pages/businessHome.js";
import businessProfile from "./pages/businessProfile.js";


const Tab = createBottomTabNavigator();

function TabGroup(){
    return(
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="businessHome" component={businessHome}/>
            <Tab.Screen name="businessProfile" component={businessProfile}/>
        </Tab.Navigator>
    )
}
export default function Navigation(){
    return(
        <TabGroup />
    )
}