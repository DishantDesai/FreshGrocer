import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import Constants from "expo-constants";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";

import {
  onAuthStateChanged,
  signInWithCredential,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../firebase/config.js";
import { signInSuccess } from "../redux/actions/auth";
const LandingScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    "Lobster-Regular": require("../../assets/fonts/Lobster-Regular.ttf"),
  });
  const dispatch = useDispatch();
  const isGoogleLoginUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;
      for (let i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId === GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.user.id
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  const onGoogleSignIn = (googleUser) => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isGoogleLoginUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        const credential = GoogleAuthProvider.credential(googleUser.idToken);

        // Sign in with credential from the Google user.
        signInWithCredential(auth, credential)
          .then((result) => {
            const uid = result.user.uid;
            if (result._tokenResponse.isNewUser) {
              const data = {
                id: uid,
                email: result.user.email,
                fullName: result.user.displayName,
                profile_picture: result.user.photoURL,
                created_at: Date.now(),
              };
              addDoc(collection(db, "users"), data)
                .then(() => {
                  dispatch(
                    signInSuccess({
                      accessToken: result.user.stsTokenManager.accessToken,
                      ...data,
                    })
                  );
                })
                .catch((error) => {
                  ToastAndroid.showWithGravity(
                    error,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                  );
                });
            } else {
              const newFields = { last_logged_in: Date.now() };
              getDocs(collection(db, "users")).then((querySnapshot) => {
                querySnapshot.forEach((responseDoc) => {
                  // doc.data() is never undefined for query doc snapshots
                  if (responseDoc.data().id === uid) {
                    const userDoc = doc(db, "users", responseDoc.id);
                    updateDoc(userDoc, newFields).then(() => {
                      dispatch(
                        signInSuccess({
                          accessToken: result.user.stsTokenManager.accessToken,
                          id: uid,
                          email: result.user.email,
                          fullName: result.user.displayName,
                          profile_picture: result.user.photoURL,
                        })
                      );
                    });
                  }
                });
              });
            }
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            ToastAndroid.showWithGravity(
              errorCode + " - " + errorMessage,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          });
      } else {
        ToastAndroid.showWithGravity(
          "User already signed-in Firebase.",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
    });
  };
  const googleLogin = async () => {
    try {
      const result = await Google.logInAsync({
        //return an object with result token and user
        androidClientId: Constants.manifest.extra.ANDROID_KEY, //From app.json
        scopes: ["email", "profile"],
      });
      if (result.type === "success") {
        onGoogleSignIn(result);
      } else {
        //CANCEL
        console.log(result);
      }
    } catch ({ message }) {
      alert("login: Error:" + message);
    }
  };
  const isFacebookLoginUserEqual = (facebookUser, firebaseUser) => {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;
      for (let i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId === GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === facebookUser.userId
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  const onFacebookSignIn = (response) => {
    // User is signed-in Facebook.
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isFacebookLoginUserEqual(response, firebaseUser)) {
        // Build Firebase credential with the Facebook auth token.
        const credential = FacebookAuthProvider.credential(response.token);

        // Sign in with the credential from the Facebook user.
        signInWithCredential(auth, credential)
          .then((result) => {
            const uid = result.user.uid;
            if (result._tokenResponse.isNewUser) {
              const data = {
                id: uid,
                email: result.user.email,
                fullName: result.user.displayName,
                profile_picture: result.user.photoURL,
                created_at: Date.now(),
              };
              addDoc(collection(db, "users"), data)
                .then(() => {
                  dispatch(
                    signInSuccess({
                      accessToken: result.user.stsTokenManager.accessToken,
                      ...data,
                    })
                  );
                })
                .catch((error) => {
                  ToastAndroid.showWithGravity(
                    error,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                  );
                });
            } else {
              const newFields = { last_logged_in: Date.now() };
              getDocs(collection(db, "users")).then((querySnapshot) => {
                querySnapshot.forEach((responseDoc) => {
                  // doc.data() is never undefined for query doc snapshots
                  if (responseDoc.data().id === uid) {
                    const userDoc = doc(db, "users", responseDoc.id);
                    updateDoc(userDoc, newFields).then(() => {
                      dispatch(
                        signInSuccess({
                          accessToken: result.user.stsTokenManager.accessToken,
                          id: uid,
                          email: result.user.email,
                          fullName: result.user.displayName,
                          profile_picture: result.user.photoURL,
                        })
                      );
                    });
                  }
                });
              });
            }
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            ToastAndroid.showWithGravity(
              errorCode + " - " + errorMessage,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          });
      } else {
        // User is already signed-in Firebase with the correct user.
        ToastAndroid.showWithGravity(
          "User already signed-in Firebase.",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
    });
  };
  const facebookLogin = async () => {
    try {
      await Facebook.initializeAsync({
        appId: Constants.manifest.extra.facebook.appId,
      });
      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (result.type === "success") {
        onFacebookSignIn(result);
      } else {
        //CANCELc
        console.log(result);
      }
    } catch ({ message }) {
      alert("login: Error:" + message);
    }
  };
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
          <TouchableOpacity onPress={googleLogin} style={styles.buttonGoogle}>
            <Text style={styles.buttonText}>Sign In with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={facebookLogin}
            style={styles.buttonFacebook}
          >
            <Text style={styles.buttonText}>Sign In with Facebook</Text>
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
