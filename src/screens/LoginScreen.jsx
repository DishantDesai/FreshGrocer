import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { Formik, Field } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, onSnapshot, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { signInValidationSchema } from "../ValidationSchemas/Signin";
import CustomInput from "../components/Common/CustomInput";
import {
  signInSuccess,
  showAuthLoader,
  hideAuthLoader,
} from "../redux/actions/auth";
const Home = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    "Lobster-Regular": require("../../assets/fonts/Lobster-Regular.ttf"),
  });
  const { loader } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const onLoginPress = ({ email, password }) => {
    dispatch(showAuthLoader());
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        if (email.toLowerCase() === "admin@freshgrocer.com") {
          const docRef = doc(db, "users", "1tYQUhtMB9FDdake2t7D");
          const docSnap = await getDoc(docRef);
          //Redirect based on fetched user if it is Admin or normal user
          if (docSnap.exists()) {
            const userSnap = docSnap.data();
            dispatch(
              signInSuccess({
                accessToken: user.stsTokenManager.accessToken,
                ...user,
                ...userSnap,
              })
            );
          }
        } else {
          dispatch(
            signInSuccess({
              accessToken: user.stsTokenManager.accessToken,
              ...user,
            })
          );
        }
        ToastAndroid.showWithGravity(
          "Login Successfully",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      })
      .catch((error) => {
        dispatch(hideAuthLoader());
        ToastAndroid.showWithGravity(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      });
  };
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.logo}>Fresh Grocer</Text>
        <View style={styles.loginFormContainer}>
          <Text style={styles.text}>Welcome!</Text>
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              phoneNumber: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={signInValidationSchema}
            onSubmit={onLoginPress}
          >
            {({ handleSubmit }) => (
              <View>
                <Field
                  component={CustomInput}
                  name="email"
                  placeholder="Email"
                  keyboardType="email-address"
                />
                <Field
                  secureTextEntry
                  component={CustomInput}
                  name="password"
                  placeholder="Password"
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  {loader ? (
                    <ActivityIndicator size={30} color="white" />
                  ) : (
                    <Text style={styles.buttonText}>Login</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <Text
            style={{ color: "#a3a4a5", alignSelf: "center", marginTop: "10%" }}
          >
            Don't have an account?
            <Text
              style={{ color: "#ff5b2d" }}
              onPress={() => navigation.navigate("Landing")}
            >
              &nbsp;{"Sign Up"}
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

export default Home;
