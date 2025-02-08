import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';
import { GlobalProvider } from "./pages/context/global";
import PromptLoginSignUp from "./pages/promptLoginSignUp.js";
import Navigation from "./Navigation";
import Home from "./pages/home";
import Login from "./pages/login.js";
import Profile from "./pages/profile.js";
import SignUp from "./pages/signUp.js";
import Welcome from "./pages/welcome.js";

const Stack = createStackNavigator();

// authentification screens
const AuthStack = ({ handleLogin }) => (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} options={{ animation: 'fade'}}/>
        <Stack.Screen name="PromptLoginSignUp" component={PromptLoginSignUp} options={{ animation: 'fade'}}/>
        <Stack.Screen name="Login" options={{ animation: 'fade'}}>
            {props => <Login {...props} onLogin={handleLogin} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp" options={{ animation: 'fade'}}>
            {props => <SignUp {...props} onLogin={handleLogin} />}
        </Stack.Screen>
    </Stack.Navigator>
);

const AppStack = ({email}) => {
    const navigation = useNavigation();
    useEffect(() => {
        if (email) {
            navigation.setParams({ email });
        }
    }, [email]);

    return (
        <Stack.Navigator initialRouteName="Navigation" screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Navigation" component={Navigation}options={{ animation: 'fade'}} />
            <Stack.Screen name="Home" component={Home} initialParams={{ email: email }} options={{ animation: 'fade'}}/>
        </Stack.Navigator>
    );
};


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");

    const handleLogin = (userEmail) => {
        setIsLoggedIn(true);
        setEmail(userEmail);
    };

    return (
        <GlobalProvider>
            <NavigationContainer>
                {isLoggedIn ? ( <AppStack email={email} /> ) : (<AuthStack handleLogin={(userEmail) => {  handleLogin(userEmail); }} />)}
            </NavigationContainer>
        </GlobalProvider>
    );
};

export default App;


// import React from 'react';
// import { View, Text } from 'react-native';
// import Home from "./pages/home";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// const Stack = createStackNavigator();



// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={Home} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;