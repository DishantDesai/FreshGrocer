import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

const LandingScreen = ({ navigation }) => {
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.buttonText}>Sign Up with Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGoogle}>
            <Text style={styles.buttonText}>Sign In with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonFacebook}>
            <Text style={styles.buttonText}>Sign In with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AdminProductList", {})}
            style={styles.buttonAdmin}
          >
            <Text style={styles.buttonText}>Sign In as Admin</Text>
          </TouchableOpacity>
          <Text
            style={{ color: "#a3a4a5", alignSelf: "center", marginTop: "10%" }}
          >
            Have an account?
            <Text
              style={{ color: "#ff5b2d" }}
              onPress={() => navigation.navigate("Login")}
            >
              &nbsp; Sign In
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
    fontSize: 35,
    fontFamily: "Lobster-Regular",
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 40,
  },
  loginFormContainer: {
    top: "10%",
    paddingHorizontal: "5%",
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
    marginTop: 10,
  },

  buttonGoogle: {
    backgroundColor: "#4285F4",
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
    marginTop: 10,
  },

  buttonFacebook: {
    backgroundColor: "#475993",
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
    marginTop: 10,
  },
  buttonAdmin: {
    backgroundColor: "#175394",
    borderRadius: 15,
    shadowColor: "rgba(0,0,0, .4)", //IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
    height: 45,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default LandingScreen;
