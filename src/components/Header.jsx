import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import { THEME_COLOR } from "../utils/constants";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, hideCart }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.logo}>{title ? title : "Fresh Grocer"}</Text>
      {!hideCart && (
        <TouchableOpacity
          style={styles.cartContainer}
          onPress={() => navigation.navigate("Cart")}
        >
          <View style={{ position: "relative" }}>
            <Feather name="shopping-cart" size={28} color="black" />
            <View style={styles.cartCount}>
              <Text style={{ fontSize: 10, color: "white" }}>1</Text>
            </View>
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
