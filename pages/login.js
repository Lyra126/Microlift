import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to MicroLift</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username or Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.signUpText}>
        Create An Account <Text style={styles.signUpLink}>Sign Up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    color: "#e63946",
    marginBottom: 20,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#ff3b5c",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  orText: {
    marginVertical: 15,
    color: "#999",
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  iconImage: {
    width: 50,
    height: 50,
  },
  signUpText: {
    marginTop: 20,
    color: "#333",
  },
  signUpLink: {
    color: "black",
    fontWeight: "bold",
  },
});

export default Login;
