import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { AppStack, AuthStack, AdminStack } from "./AppRoutes";

export const Router = () => {
  const { isLogin, accessToken, user } = useSelector(({ auth }) => auth);
  return (
    <NavigationContainer>
      {isLogin && accessToken ? (
        user.isAdmin ? (
          <AdminStack />
        ) : (
          <AppStack />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};
