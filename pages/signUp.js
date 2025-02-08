import React, { useRef, useEffect, useState } from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Modal, Alert, ImageBackground, TextInput, Pressable} from "react-native";
import { GestureHandlerRootView, Gesture, GestureDetector,} from "react-native-gesture-handler";
import globalStyles from './styles/globalStyles.js';
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import axios from 'axios';
import {IP_ADDRESS} from '@env'


const SignUp = ({ onLogin, ...props }) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    // false = lender
    const [type, setType] = useState(null);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [fontsLoaded] = useFonts({
        'Outfit-Regular': require('./fonts/Outfit/Outfit-Regular.ttf'),
        'Outfit-Bold': require('./fonts/Outfit/Outfit-Bold.ttf'),
        'Outfit-Black': require('./fonts/Outfit/Outfit-Black.ttf'),
        'Outfit-Medium': require('./fonts/Outfit/Outfit-Medium.ttf'),
        'Gabarito-Regular': require('./fonts/Gabarito/Gabarito-Regular.ttf'),
        'Gabarito-Bold': require('./fonts/Gabarito/Gabarito-Bold.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }


    const handleSubmit = () => {
        if (type === null || !name || !email || !password) {
            setErrorMessage("All fields are required.");
            return;
        }
        
        setErrorMessage(""); 
        console.log("creating user...");
        axios.get(`http://${IP_ADDRESS}:8080/users/get?email=${email}`)
            .then((response) => {
                const userData = response.data;
                if (userData) {
                    console.log("user exists");
                    // User exists, proceed with login
                    onLogin(email);
                } else {
                    console.log("user doesn't exist");
                    // User not found, create a new user
                    axios.post(`http://${IP_ADDRESS}:8080/users/createUser`, {
                        type: type,
                        email_address: email,
                        name: name,
                        password: password
                    })
                    .then((response) => {
                        console.log('User created successfully:', response.data);
                        // Proceed with login after creating the user
                        onLogin(email);
                    })
                    .catch((error) => {
                        console.error('Error creating user:', error);
                        setErrorMessage('Error creating user. Please try again.');
                    });
                }
            })
            .catch((error) => {
                console.log("user doesn't exist");
                    // User not found, create a new user
                    axios.post(`http://${IP_ADDRESS}:8080/users/createUser`, {
                        type: type,
                        name: name,
                        email: email,
                        password: password
                    })
                    .then((response) => {
                        console.log('User created successfully:', response.data);
                        // Proceed with login after creating the user
                        onLogin(email);
                    })
                    .catch((error) => {
                        console.error('Error creating user:', error);
                        setErrorMessage('Error creating user. Please try again.');
                    });
            });
    };

    return (
        <SafeAreaView  style={[globalStyles.AndroidSafeArea, styles.container]}>
            <TouchableOpacity style={styles.backButton} onPress={() => {navigation.navigate('PromptLoginSignUp')}}>
                <Text style={{fontSize: 37}}> ← </Text>
            </TouchableOpacity>
            <View style = {styles.loginInformation}>
                <Text style={styles.welcomeBack}>Begin Your Journey</Text>
                <Text style = {styles.welcomeText}>Just a few more steps to join our community</Text>
                <View style={styles.inputView}>
                    <View style={styles.inputSection}>
                        <Ionicons name="options" size={20} color="#000" />
                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginLeft: 10 }}>
                            <TouchableOpacity 
                                style={[styles.button, { flex: 1, marginRight: 5 }, type === false && { backgroundColor: '#007bff' }]}  
                                onPress={() => {setType(false);
                                    console.log("Selected Type: ", type);
                                }}
                            >
                                <Text style={[styles.buttonText, type === false && { color: '#fff' }]}>Lender</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.button, { flex: 1, marginRight: 5 }, type === true && { backgroundColor: '#007bff' }]} 
                                onPress={() => {setType(true);
                                    console.log("Selected Type: ", type);
                                }}
                            >
                                <Text style={[styles.buttonText, type === true && { color: '#fff' }]}>Borrower</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.inputSection}>
                        <Ionicons name="person" size={20} color="#000" />
                        <TextInput
                            style={styles.input}
                            placeholder='Name'
                            placeholderTextColor='#888888'
                            value={name}
                            onChangeText={setName}
                            autoCorrect={false}
                            autoCapitalize='none'
                        />
                    </View>
                    <View style={styles.inputSection}>
                        <FontAwesome name="envelope" size={20} color="#000" />
                        <TextInput
                            style={styles.input}
                            placeholder='Email'
                            placeholderTextColor='#888888'
                            value={email}
                            onChangeText={setEmail}
                            autoCorrect={false}
                            autoCapitalize='none'
                        />
                    </View>

                    <View style={styles.inputSection}>
                        <Fontisto name="locked" size={22} color="#000" />
                        <TextInput
                            style={styles.input}
                            placeholder='Password'
                            placeholderTextColor='#888888'
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            autoCorrect={false}
                            autoCapitalize='none'
                        />
                    </View>
                </View>
                

                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                <View style={styles.buttonView}>
                    <View style={styles.optionsText}>
                        <View style={{backgroundColor: 'lightgrey', height: 1, flex: 1, alignSelf: 'center'}} />
                        <Text style={{alignSelf:'center', paddingHorizontal:5, fontSize: 15, color: '#A9A9A9'}}>OR</Text>
                        <View style={{backgroundColor: 'lightgrey', height: 1, flex: 1, alignSelf: 'center'}} />
                    </View>
                </View>

                <View style={styles.mediaIcons}>
                    <View style={[styles.icons, {backgroundColor: '#fffff7'}]}>
                        <Image
                            source={{uri: 'https://img.icons8.com/?size=100&id=17949&format=png&color=000000'}}
                            style={{width: 40, height: 40}}
                        />
                    </View>
                </View>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already have an Account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={[styles.signup,{marginLeft: 3}]}> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8ec5e0',
        padding: 40,
    },
    backButton: {
        marginLeft: 20,
    },

    loginInformation: {
        backgroundColor: '#e8efdd',
        height: '100%',
        borderRadius: 30,
        paddingTop: 50,
        marginTop: 70,
        paddingHorizontal: 26
    },
    welcomeBack: {
        fontFamily: 'Gabarito-Bold',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    welcomeText: {
        color: 'grey',
        fontSize: 17,
        fontFamily: 'Outfit-Regular',

    },
    image : {
        height : 160,
        width : 170
    },
    inputView : {
        marginTop: 30,
        gap : 18,
        width : "100%",
        marginBottom: 30,

    },
    inputSection: {
        fontFamily: 'Outfit-Regular',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fffff7',
        borderRadius: 20,
        fontSize: 15,
        paddingHorizontal: 20,
    },
    input: {
        height : 50,
        width : "80%",
        paddingHorizontal : 20,
        backgroundColor: "#FFFFF7FF",
        borderRadius: 20,
        fontFamily: 'Outfit-Regular',
    },
    button : {
        backgroundColor : "#77aac5",
        height : 45,
        width : "100%",
        borderRadius : 20,
        alignItems : "center",
        justifyContent : "center",
    },
    buttonText : {
        color : "white"  ,
        fontSize: 18,
        flexDirection: 'row',
        fontWeight : "bold",
        fontFamily: 'Gabarito-Bold',
    },
    buttonView :{
        width :"100%",
    },
    optionsText : {
        textAlign : "center",
        color : "gray",
        fontSize : 13,
        marginVertical: 30,
        flexDirection: 'row'
    },
    mediaIcons : {
        flexDirection : "row",
        gap : 22,
        alignItems: "center",
        justifyContent : "center",
        marginBottom : 23,
    },
    icons : {
        width : 55,
        height: 55,
        borderRadius : 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerView : {
        flexDirection : "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    },
    footerText : {
        textAlign: "center",
        color : "gray",
        fontFamily: 'Outfit-Regular',
    },
    signup : {
        color : "#4f7a8c",
        textAlign: "center",
        fontWeight : "bold",

    }, 
    title: {
        fontSize: 15,
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    },

});

export default SignUp;