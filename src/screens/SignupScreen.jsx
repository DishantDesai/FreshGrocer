import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
import CustomInput from "../components/Common/CustomInput";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { signUPValidationSchema } from "../ValidationSchemas/SignUp";
import { LogBox } from "react-native";
import { signInSuccess, hideAuthLoader } from "../redux/actions/auth";
LogBox.ignoreLogs(["Setting a timer"]);
const SignupScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    "Lobster-Regular": require("../../assets/fonts/Lobster-Regular.ttf"),
  });
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const onRegisterPress = ({
    email,
    fullName,
    password,
    address,
    phoneNumber,
  }) => {
    setLoader(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const uid = response.user.uid;
        const user = response.user;
        const data = {
          id: uid,
          email,
          fullName,
          address,
          phoneNumber,
          created_at: Date.now(),
        };
        addDoc(collection(db, "users"), data)
          .then(() => {
            dispatch(
              signInSuccess({
                accessToken: user.stsTokenManager.accessToken,
                ...user,
              })
            );
            ToastAndroid.showWithGravity(
              "User Registered Successfully",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          })
          .catch((error) => {
            ToastAndroid.showWithGravity(
              error.message,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
            setLoader(false);
          });
      })
      .catch((error) => {
        ToastAndroid.showWithGravity(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        setLoader(false);
      });
  };
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.logo}>Fresh Grocer</Text>
        <View style={styles.loginFormContainer}>
          <Text style={styles.text}>Sign Up!</Text>
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              phoneNumber: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={signUPValidationSchema}
            onSubmit={onRegisterPress}
          >
            {({ handleSubmit }) => (
              <View>
                <Field
                  component={CustomInput}
                  name="fullName"
                  placeholder="Full Name"
                />
                <Field
                  component={CustomInput}
                  name="email"
                  placeholder="Email"
                  keyboardType="email-address"
                />
                <Field
                  component={CustomInput}
                  name="phoneNumber"
                  placeholder="Phone No."
                  keyboardType="numeric"
                />
                <Field
                  component={CustomInput}
                  name="address"
                  placeholder="Address"
                />
                <Field
                  secureTextEntry
                  component={CustomInput}
                  name="password"
                  placeholder="Password"
                />
                <Field
                  secureTextEntry
                  component={CustomInput}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  {loader ? (
                    <ActivityIndicator size={30} color="white" />
                  ) : (
                    <Text style={styles.buttonText}>Sign Up</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </Formik>
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
