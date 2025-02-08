import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from "react";

import Home from "./pages/home";
import Login from "./pages/login.js";
import Profile from "./pages/profile.js";
import SignUp from "./pages/signUp.js";
import Welcome from "./pages/Welcome.js";


const Tab = createBottomTabNavigator();

function TabGroup(){
    return(
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home}/>
            {/* <Tab.Screen name="Login" component={Login}/> */}
            <Tab.Screen name="Profile" component={Profile}/>
            {/* <Tab.Screen name="SignUp" component={SignUp}/>
            <Tab.Screen name="Welcome" component={Welcome}/> */}
        </Tab.Navigator>
    )
}
export default function Navigation(){
    return(
        <TabGroup />
    )
}