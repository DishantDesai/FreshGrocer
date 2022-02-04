import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { deleteDoc, doc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../../firebase/config";
import { THEME_COLOR } from "../../utils/constants";

const OrderItem = ({
  order,
  addIcon = true,
  deleteIcon = false,
  getProducts,
}) => {
  const [count, setCount] = useState(0);
  const navigation = useNavigation();

  console.log("order", order);

  return (
    <View style={styles.cartItemContainer}>
      <View style={styles.cartItemDetailContainer}>
        {/* <Image
          style={styles.productThumb}
          source={{
            uri: cartProduct.url,
          }}
        /> */}
        <View>
          <Text numberOfLines={1} style={styles.productTitle}>
            {"Order id #"} {order.id}
          </Text>
          {order.items.map((item) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 2,
                }}
              >
                <Text>{item.name}</Text>
                <Text>{item.quantity}</Text>
                <Text>${item.price}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 14,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "white",
  },
  cartItemContainer: {
    // height: 90,
    // marginTop: 4,
    paddingVertical: 4,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "#9D9998",
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 25,
  },
  countCircle: {
    backgroundColor: "#FF4A03",
    width: 25,
    height: 25,
    borderRadius: 50,
    alignItems: "center",
  },
  incrementDecrementIcon: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
  },
  cartItemDetailContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  productThumb: {
    borderRadius: 15,
    width: 60,
    height: 60,
    marginRight: 20,
  },
  productTitle: {
    fontSize: 18,
    color: "#9D9998",
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  closeIcon: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: "#c21b3b",
    position: "absolute",
    top: 7,
    right: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 60,
    marginVertical: 12,
    backgroundColor: "#ECEDF1",
    borderRadius: 9,
    fontWeight: "bold",
    color: "#000",
    paddingLeft: 10,
  },
  applyBtn: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 110,
    backgroundColor: THEME_COLOR,
    borderRadius: 8,
    position: "absolute",
    top: 13,
    right: 0,
  },
  checkOutBtn: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    backgroundColor: THEME_COLOR,
    borderRadius: 8,
    marginTop: 40,
  },
});
export default OrderItem;
