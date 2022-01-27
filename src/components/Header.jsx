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
import {
  vegetablesAndFruits,
  dairyAndEggs,
  meatAndSeaFood,
  pantryFood,
  bakeryFood,
  frozenFood,
} from "../utils/data";
import { signOutSuccess } from "../redux/actions/auth";
const Header = ({ title, hideCart, hideBackArrow }) => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const cartProducts = [
      ...vegetablesAndFruits,
      ...dairyAndEggs,
      ...meatAndSeaFood,
      ...pantryFood,
      ...bakeryFood,
      ...frozenFood,
    ].filter((product) => product.isAddedToCart);
    setCartItemCount(cartProducts.length);
  }, []);
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
    <View>
      {!hideBackArrow && (
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}
          style={{ position: "absolute", top: 10, zIndex: 10 }}
        >
          <Feather name="arrow-left" size={20} style={{ fontSize: 34 }} />
        </TouchableOpacity>
      )}
      <Text style={styles.logo}>{title ? title : "Fresh Grocer"}</Text>
      <View style={styles.cartContainer}>
        {!hideCart && (
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => navigation.navigate("Cart")}
          >
            <View style={{ position: "relative" }}>
              <Feather name="shopping-cart" size={28} color="black" />
              {cartItemCount > 0 && (
                <View style={styles.cartCount}>
                  <Text style={{ fontSize: 10, color: "white" }}>
                    {cartItemCount}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
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
