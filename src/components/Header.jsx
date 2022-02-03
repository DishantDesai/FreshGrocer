import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { THEME_COLOR } from "../utils/constants";
import {
  vegetablesAndFruits,
  dairyAndEggs,
  meatAndSeaFood,
  pantryFood,
  bakeryFood,
  frozenFood,
} from "../utils/data";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const Header = ({
  title,
  hideCart,
  hideBackArrow,
  addNavigate,
  hidePlusIcon,
}) => {
  const { items } = useSelector((state) => state.cart.itemsSelected);
  const navigation = useNavigation();

  const logout = () => {
    console.log("log out");
    try {
      signOut(auth);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      {!hideBackArrow && (
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}
          // style={{ position: "absolute", top: 10, zIndex: 10 }}
        >
          <Feather name="arrow-left" size={20} style={{ fontSize: 34 }} />
        </TouchableOpacity>
      )}
      {!hidePlusIcon && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddProducts");
          }}
          // style={{ position: "absolute", top: 10, zIndex: 10 }}
        >
          <AntDesign name="pluscircleo" size={24} color="black" />
        </TouchableOpacity>
      )}
      <Text style={styles.logo}>{title ? title : "Fresh Grocer"}</Text>
      <View>
        {!hideCart && (
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <Feather name="shopping-cart" size={28} color="black" />

            <View style={styles.cartCount}>
              <Text style={{ fontSize: 10, color: "white" }}>
                {items.length > 0 ? items.length : 0}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      <View>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
          <AntDesign name="user" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => logout()}>
          <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

Header.propTypes = {
  hideCart: PropTypes.bool,
};
Header.defaultProps = {
  hideCart: false,
};
const styles = StyleSheet.create({
  logo: {
    color: "#ff5b2d",
    fontSize: 34,
    fontFamily: "Lobster-Regular",
    textAlign: "center",
  },
  cartContainer: {
    position: "absolute",
    top: 10,
    right: 0,
  },
  cartCount: {
    width: 14,
    height: 14,
    position: "absolute",
    backgroundColor: THEME_COLOR,
    borderRadius: 50,
    top: -3,
    right: -5,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Header;
