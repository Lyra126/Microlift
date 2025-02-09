import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';
import { GlobalProvider } from "./pages/context/global";
import PromptLoginSignUp from "./pages/promptLoginSignUp.js";
import NavigationHome from "./NavigationHome.js";  // Assuming this is your component for the home navigation
import NavigationBusinessHome from "./NavigationBusinessHome.js";  // Assuming this is your component for business home navigation
import Login from "./pages/login.js";
import SignUp from "./pages/signUp.js";
import Welcome from "./pages/welcome.js";

const Stack = createStackNavigator();

// Authentication screens
const AuthStack = ({ handleLogin }) => (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} options={{ animation: 'fade'}} />
        <Stack.Screen name="PromptLoginSignUp" component={PromptLoginSignUp} options={{ animation: 'fade'}} />
        <Stack.Screen name="Login" options={{ animation: 'fade' }}>
            {props => <Login {...props} onLogin={handleLogin} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp" options={{ animation: 'fade' }}>
            {props => <SignUp {...props} onLogin={handleLogin} />}
        </Stack.Screen>
    </Stack.Navigator>
);

const AppStack = ({ email, isBusinessUser }) => {
    const navigation = useNavigation();

    useEffect(() => {
        if (email) {
            navigation.setParams({ email });
        }
    }, [email]);

    return (
        <Stack.Navigator initialRouteName="Navigation" screenOptions={{ headerShown: true }} >
            <Stack.Screen name="Navigation" options={{ animation: 'fade' }}>
                {props => isBusinessUser ? <NavigationBusinessHome {...props} email={email} /> : <NavigationHome {...props} email={email} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [isBusinessUser, setIsBusinessUser] = useState(false); // Track if the user is a business user

    const handleLogin = (userEmail, isBusiness) => {
        setIsLoggedIn(true);
        setEmail(userEmail);
        setIsBusinessUser(isBusiness); // Set the user as business or non-business
    };

    return (
        <GlobalProvider>
            <NavigationContainer>
                {isLoggedIn ? (
                    <AppStack email={email} isBusinessUser={isBusinessUser} />
                ) : (
                    <AuthStack handleLogin={handleLogin} />
                )}
            </NavigationContainer>
        </GlobalProvider>
    );
};

export default App;
