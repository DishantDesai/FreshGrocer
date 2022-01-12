import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSvyT1UGkFDBSlGcA7j2kwBp_bsuhjwkI",
  authDomain: "freshgrosher.firebaseapp.com",
  databaseURL: "https://freshgrosher.firebaseio.com",
  projectId: "freshgrosher",
  storageBucket: "freshgrosher.appspot.com",
  messagingSenderId: "585593738901",
  appId: "1:585593738901:android:4bf7a0a50496ad388cad9c",
};
let app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore();
