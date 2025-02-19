import React, { useRef, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, SafeAreaView, ImageBackground,TextInput, Pressable, Alert} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from "@react-navigation/native";
import { useGlobal } from "./context/global";
import globalStyles from "./styles/globalStyles";
import Fontisto from "react-native-vector-icons/Fontisto";
import axios from 'axios'; 
import Navigation from "../NavigationHome"
import Config from 'react-native-config';
import Ionicons from "react-native-vector-icons/Ionicons";
import {useFonts} from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import {IP_ADDRESS} from '@env'
import { checkBorrowerExists } from "../server/controllers/controller";

const Login = ({ onLogin, ...props }) => {
    const [fontsLoaded] = useFonts({
        'Outfit-Regular': require('./fonts/Outfit/Outfit-Regular.ttf'),
        'Outfit-Bold': require('./fonts/Outfit/Outfit-Bold.ttf'),
        'Outfit-Black': require('./fonts/Outfit/Outfit-Black.ttf'),
        'Outfit-Medium': require('./fonts/Outfit/Outfit-Medium.ttf'),
        'Gabarito-Regular': require('./fonts/Gabarito/Gabarito-Regular.ttf'),
        'Gabarito-Bold': require('./fonts/Gabarito/Gabarito-Bold.ttf'),
    });
    const navigation = useNavigation();
    const [email,setEmail]=  useState("");
    const [password,setPassword]=  useState("");
    const [error, setError] = useState("");
    const { setGlobalState } = useGlobal();
     const [type, setType] = useState(null);


    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }



    const handleSignIn =  () => {
        setError("");  // Reset any previous error
      
      if (type === false){
        axios
          .get(`http://${IP_ADDRESS}:8080/appdata/getLenderByEmail?email=${email}`)
          .then((response) => {
              const userData = response.data;
              console.log(userData);
              console.log(userData.email);
              if (userData && userData.password === password) {
                  // Login successful, navigate to the home page or trigger onLogin
                  setGlobalState({ // stores email/type in global state
                    email: userData.email,
                    type: userData.type, 
                  });
                  onLogin(email, false); // Handle login state change here
              } else {
                  // If user is not found or any other issue
                  setError("Incorrect email or password. Please try again.");
              }
          })
          .catch((error) => {
              // Error handling for any network issues or 404
              if (error.response) {
                  if (error.response.status === 404) {
                      // Handle user not found
                      setError("User not found. Please check your email and password.");
                  } else {
                      // Handle other types of errors
                      setError(`Error: ${error.response.data.message || "An issue occurred. Please try again later."}`);
                  }
              } else {
                  // Handle network or unexpected errors
                  console.error("Error signing in:", error);
                  setError("There was an issue signing in. Please try again later.");
              }
          });
        } else{
          axios

          .get(`http://${IP_ADDRESS}:8080/appdata/getBorrowerByEmail?email=${email}`)
          .then((response) => {
              const userData = response.data;
              console.log(userData.email);
              if (userData && userData.password === password) {
                  // Login successful, navigate to the home page or trigger onLogin
                  setGlobalState({ // stores email/type in global state
                    email: userData.email,
                    type: userData.type, 
                  });
                  onLogin(email, true); // Handle login state change here
              } else {
                  // If user is not found or any other issue
                  setError("Incorrect email or password. Please try again.");
              }
          })
          .catch((error) => {
              // Error handling for any network issues or 404
              if (error.response) {
                  if (error.response.status === 404) {
                      // Handle user not found
                      setError("User not found. Please check your email and password.");
                  } else {
                      // Handle other types of errors
                      setError(`Error: ${error.response.data.message || "An issue occurred. Please try again later."}`);
                  }
              } else {
                  // Handle network or unexpected errors
                  console.error("Error signing in:", error);
                  setError("There was an issue signing in. Please try again later.");
              }
          });
        }
    };
  

    return (
        <SafeAreaView  style={[globalStyles.AndroidSafeArea, styles.container]}>
            <TouchableOpacity style={styles.backButton} onPress={() => {navigation.navigate('PromptLoginSignUp')}}>
                <Ionicons name="arrow-back-circle-outline" size={50} color="black" style={{marginTop: 15}} />
            </TouchableOpacity>
            <View style = {styles.loginInformation}>
              
            <Text style={styles.welcomeBack}>Welcome Back!</Text>
                
                <View style={styles.inputView}>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginLeft: 10 }}>
                    <TouchableOpacity 
                        style={[
                            styles.button, 
                            { flex: 1, marginRight: 5 , marginTop: 0}, 
                            type === false && { backgroundColor: 'gray' }
                        ]}  
                        onPress={() => {
                            setType(false);
                            console.log("Selected Type: ", type);
                        }}
                        >
                        <Text style={[styles.buttonText, type === false && { color: '#fff' }]}>Lender</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={[
                                styles.button, 
                                { flex: 1, marginRight: 5, marginTop: 0}, 
                                type === true && { backgroundColor: 'gray' }
                            ]} 
                            onPress={() => {setType(true);
                                console.log("Selected Type: ", type);
                            }}
                        >
                            <Text style={[styles.buttonText, type === true && { color: '#fff' }]}>Borrower</Text>
                        </TouchableOpacity>
                </View>
                 <View style={{height: 30}}/>
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
                {error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : null}
             <View style={styles.forgotPasswordView}>
                    {/* change this to direct user to a forgot password page*/}
                    <Pressable onPress={() => Alert.alert("Forget Password!")}>
                        <Text style={styles.forgetText}>Forgot your password?</Text>
                    </Pressable>
             </View>

            <View style={styles.buttonView}>
                {/* change this to direct user to home page*/}
                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <View style={styles.optionsText}>
                    <View style={{backgroundColor: 'grey', height: 1, flex: 1, alignSelf: 'center'}} />
                    <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 15, color: 'gray'}}>OR</Text>
                    <View style={{backgroundColor: 'grey', height: 1, flex: 1, alignSelf: 'center'}} />
                </View>
            </View>

            <View style={styles.mediaIcons}>
                <View style={[styles.icons, {backgroundColor: '#fffff7'}]}>
                    <Image
                        source={{uri: 'https://img.icons8.com/?size=100&id=17949&format=png&color=000000'}}
                        style={{width: 40, height: 40}}
                    />
                </View>
                <View style={[styles.icons, {backgroundColor: '#fffff7'}]}>
                    <AntDesign name="apple1" size={35} color="black" />
                </View>
            </View>
            <View style={styles.footerView}>
                <Text style={styles.footerText}>Don't Have Account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={[styles.signup,{marginLeft: 3}]}> Sign Up</Text>
                </TouchableOpacity>
            </View>
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E7B5AC',
        padding: 40,
    },
    backButton: {
        marginLeft: 20,
    },
    loginInformation: {
       backgroundColor: 'white',
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
        textAlign: 'center',
        marginTop: -10,
    },
    image : {
        height : 160,
        width : 170
    },
    inputView : {
        marginTop: 20,
        gap : 18,
        width : "100%",
        marginBottom: 7
    },
    inputSection: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: "gray",
        borderRadius: 20,
        borderWidth: 2,
        paddingHorizontal: 20,
    },
    input: {
        height : 50,
        width : "80%",
        paddingHorizontal : 20,
        fontSize: 15,
        backgroundColor: "white",
        fontFamily: 'Outfit-Regular',
    },
    forgotPasswordView : {
        marginTop: 10,
        marginBottom : 40,
        marginLeft: 10
    },
    forgetText : {
        fontSize : 14.5,
        color : "gray",
        fontFamily: 'Outfit-Regular',
    },
    button : {
        backgroundColor : "#E7B5AC",
        height : 45,
        width : "100%",
        borderRadius : 20,
        alignItems : "center",
        justifyContent : "center",
    },
    buttonText : {
        color : "white"  ,
        fontSize: 18,
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
        fontFamily: 'Outfit-Regular',
        textAlign: "center",
        color : "gray",
    },
    signup : {
        color : "#E7B5AC",
        textAlign: "center",
        fontWeight : "bold",
        fontFamily: 'Outfit-Bold',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default Login;