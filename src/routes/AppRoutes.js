import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screen imports
import Landing from "../screens/LandingScreen";
import Login from "../screens/LoginScreen";
import Signup from "../screens/SignupScreen";
import Home from "../screens/User/HomeScreen";
import ProductList from "../screens/User/ProductListScreen";
import Cart from "../screens/User/CartScreen";
import ProductDetail from "../screens/User/ProductDetailScreen";
import AdminProductList from "../screens/Admin/AdminProductListScreen";
import ProductEditScreen from "../screens/Admin/ProductEditScreen";
import Checkout from "../screens/User/CheckoutScreen";
import Order from "../screens/User/OrderScreen";
import AddProducts from "../screens/Admin/AddProducts";

const Stack = createNativeStackNavigator();

export const AdminStack = () => {
  return (
    <Stack.Navigator initialRouteName="AdminProductList">
      <Stack.Screen
        name="AdminProductList"
        options={{ headerShown: false }}
        component={AdminProductList}
      />
      <Stack.Screen
        name="AddProducts"
        options={{ headerShown: false }}
        component={AddProducts}
      />
      <Stack.Screen
        name="ProductEdit"
        options={{ headerShown: false }}
        component={ProductEditScreen}
      />
    </Stack.Navigator>
  );
};
export const AppStack = () => {
  return (
    <Stack.Navigator>
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
        name="Checkout"
        options={{ headerShown: false }}
        component={Checkout}
      />
      <Stack.Screen
        name="Order"
        options={{ headerShown: false }}
        component={Order}
      />
      <Stack.Screen
        name="ProductDetail"
        options={{ headerShown: false }}
        component={ProductDetail}
      />
    </Stack.Navigator>
  );
};

export const AuthStack = () => {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
};
