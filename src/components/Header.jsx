import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { THEME_COLOR } from "../utils/constants";
import {
  vegetablesAndFruits,
  dairyAndEggs,
  meatAndSeaFood,
  pantryFood,
  bakeryFood,
  frozenFood,
} from "../utils/data";

const Header = ({
  title,
  hideCart,
  hideBackArrow,
  hidePlusIcon = true,
  addNavigate,
}) => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigation = useNavigation();
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
      {!hideCart && (
        <TouchableOpacity
          style={styles.cartContainer}
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
