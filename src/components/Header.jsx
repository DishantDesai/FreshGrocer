import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { getAuth, signOut } from "firebase/auth";
import { THEME_COLOR } from "../utils/constants";
import { signOutSuccess } from "../redux/actions/auth";
import { useSelector } from "react-redux";
import { auth } from "../firebase/config";

const Header = ({
  title,
  hideCart,
  hideBackArrow,
  addNavigate,
  hidePlusIcon = true,
  isAdmin = false,
}) => {
  const { items } = useSelector((state) => state.cart.itemsSelected);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(signOutSuccess());
      })
      .catch((error) => {
        ToastAndroid.showWithGravity(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      });
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
        <TouchableOpacity onPress={logout}>
          <AntDesign name="poweroff" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

Header.propTypes = {
  hideCart: PropTypes.bool,
  hideBackArrow: PropTypes.bool,
};
Header.defaultProps = {
  hideCart: false,
  hideBackArrow: false,
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
    flexDirection: "row",
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
