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
import Welcome from "./pages/Welcome.js";

const Stack = createStackNavigator();

// authentification screens
const AuthStack = ({ handleLogin }) => (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="PromptLoginSignUp" component={PromptLoginSignUp} />
        <Stack.Screen name="Login">
            {props => <Login {...props} onLogin={handleLogin} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp">
            {props => <SignUp {...props} onLogin={handleLogin} />}
        </Stack.Screen>
    </Stack.Navigator>
);

// after user logs in screens
// after user logs in screens
const AppStack = ({email}) => {
    const navigation = useNavigation();
    useEffect(() => {
        if (email) {
            navigation.setParams({ email });
        }
    }, [email]);

    return (
        <Stack.Navigator initialRouteName="Navigation" screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Navigation" component={Navigation} />
            <Stack.Screen name="Home" component={Home} initialParams={{ email: email }} />
        </Stack.Navigator>
    );
};



// In your App.js file
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

