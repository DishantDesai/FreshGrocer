import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

//Screen imports
import Landing from "./src/screens/LandingScreen";
import Login from "./src/screens/LoginScreen";
import Signup from "./src/screens/SignupScreen";
import Home from "./src/screens/User/HomeScreen";
import ProductList from "./src/screens/User/ProductListScreen";
import Cart from "./src/screens/User/CartScreen";
import ProductDetail from "./src/screens/User/ProductDetailScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            options={{ headerShown: false }}
            component={Landing}
          />
          <Stack.Screen
            name="Signup"
            options={{ headerShown: false }}
            component={Signup}
          />
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={Login}
          />
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={Home}
          />
          <Stack.Screen
            name="ProductList"
            options={{ headerShown: false }}
            component={ProductList}
          />
          <Stack.Screen
            name="Cart"
            options={{ headerShown: false }}
            component={Cart}
          />
          <Stack.Screen
            name="ProductDetail"
            options={{ headerShown: false }}
            component={ProductDetail}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
