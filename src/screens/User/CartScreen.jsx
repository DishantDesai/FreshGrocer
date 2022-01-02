import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { THEME_COLOR } from "../../utils/constants";

const CartScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header hideCart title="Cart" />
      <View style={{ marginTop: 40 }}>
        <View style={styles.cartItemContainer}>
          <View style={{ alignItems: "center", marginRight: 30 }}>
            <TouchableOpacity>
              <View style={styles.countCircle}>
                <Text style={styles.incrementDecrementIcon}>-</Text>
              </View>
            </TouchableOpacity>
            <Text style={{ color: "#9D9998", fontWeight: "bold" }}>01</Text>
            <TouchableOpacity>
              <View style={styles.countCircle}>
                <Text style={styles.incrementDecrementIcon}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.cartItemDetailContainer}>
            <Image
              style={styles.productThumb}
              source={{
                uri: "https://i5.walmartimages.ca/images/Thumbnails/580/6_r/875806_R.jpg",
              }}
            />
            <View>
              <Text style={styles.productTitle}>Fresh Apple</Text>
              <Text style={styles.productPrice}>$5.97</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.closeIcon}>
            <Ionicons name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.cartItemContainer}>
          <View style={{ alignItems: "center", marginRight: 30 }}>
            <TouchableOpacity>
              <View style={styles.countCircle}>
                <Text style={styles.incrementDecrementIcon}>-</Text>
              </View>
            </TouchableOpacity>
            <Text style={{ color: "#9D9998", fontWeight: "bold" }}>01</Text>
            <TouchableOpacity>
              <View style={styles.countCircle}>
                <Text style={styles.incrementDecrementIcon}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.cartItemDetailContainer}>
            <Image
              style={styles.productThumb}
              source={{
                uri: "https://i5.walmartimages.ca/images/Thumbnails/580/6_r/875806_R.jpg",
              }}
            />
            <View>
              <Text style={styles.productTitle}>Fresh Apple</Text>
              <Text style={styles.productPrice}>$5.97</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.closeIcon}>
            <Ionicons name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            style={styles.input}
            autoCapitalize={"characters"}
            placeholder="Promocode"
          />
          <TouchableOpacity style={styles.applyBtn}>
            <Text style={{ color: "white" }}>Apply</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 40 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "#9D9998", lineHeight: 25 }}>Card Title</Text>
            <Text style={{ color: "#9D9998", lineHeight: 25 }}>$11.94</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "#9D9998", lineHeight: 25 }}>Tax</Text>
            <Text style={{ color: "#9D9998", lineHeight: 25 }}>$5.00</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "#9D9998", lineHeight: 25 }}>Delivery</Text>
            <Text style={{ color: "#9D9998", lineHeight: 25 }}>$5.00</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "#9D9998", lineHeight: 25 }}>
              Promotion Discount
            </Text>
            <Text style={{ color: "#9D9998", lineHeight: 25 }}>$0.00</Text>
          </View>
          <View
            style={{
              borderBottomColor: "#9D9998",
              borderBottomWidth: 1,
              marginVertical: 16,
            }}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "#9D9998", lineHeight: 25 }}>Subtotal</Text>
            <Text
              style={{ color: "#9D9998", lineHeight: 25, fontWeight: "bold" }}
            >
              $21.94
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.checkOutBtn}>
          <Text style={{ color: "white" }}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 14,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  cartItemContainer: {
    height: 90,
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

export default CartScreen;
