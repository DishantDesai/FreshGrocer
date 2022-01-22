import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { AppStack, AuthStack } from "./AppRoutes";

export const Router = () => {
  const { isLogin, accessToken } = useSelector(({ auth }) => auth);

  return (
    <NavigationContainer>
      {isLogin && accessToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
