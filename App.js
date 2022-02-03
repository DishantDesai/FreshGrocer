import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Router } from "./src/routes/routes";
import { store, persistor } from "./src/redux/store";
import { StripeProvider } from "@stripe/stripe-react-native";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
        <StripeProvider publishableKey="pk_test_51KOkp5JBBvEMWQdY03M3wbkVQcOlm4f8r04vrJDkzwhgLefyT0NqmQW6g8KERpV7NkZBG865yQTkAyM3qsC0OmnA00dVWjiNj4">
            <Router />
          </StripeProvider>
       
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
