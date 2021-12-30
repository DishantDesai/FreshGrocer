import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
const SignupScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    "Lobster-Regular": require("../../assets/fonts/Lobster-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.logo}>Fresh Grocer</Text>
        <View style={styles.loginFormContainer}>
          <Text style={styles.text}>Sign Up!</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            keyboardType="default"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone No."
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            keyboardType="default"
          />
          <TextInput style={styles.input} placeholder="Password" />
          <TextInput style={styles.input} placeholder="Confirm Password" />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <Text
            style={{ color: "#a3a4a5", alignSelf: "center", marginTop: "10%" }}
          >
            Have an account?
            <Text
              style={{ color: "#ff5b2d" }}
              onPress={() => navigation.navigate("Login")}
            >
              &nbsp;Sign In
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  logo: {
    color: "#ff5b2d",
    fontSize: 28,
    fontFamily: "Lobster-Regular",
    alignSelf: "center",
  },
  loginFormContainer: {
    top: "10%",
    paddingHorizontal: "5%",
  },
  text: {
    color: "#8d8e8f",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#ecedf1",
    height: 45,
    marginBottom: 20,
    borderRadius: 15,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#ff5b2d",
    borderRadius: 15,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
    height: 45,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
  forgotPassword: {
    color: "#ff5b2d",
    alignSelf: "center",
    marginTop: "20%",
  },
});

export default SignupScreen;