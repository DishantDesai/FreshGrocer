import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Header = () => {
  return (
    <View>
      <Text style={styles.logo}>Fresh Grocer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    color: "#ff5b2d",
    fontSize: 34,
    fontFamily: "Lobster-Regular",
    alignSelf: "center",
  },
});
export default Header;
