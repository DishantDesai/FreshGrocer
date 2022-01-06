import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({ product }) => {
  const [count, setCount] = useState(0);
  const navigation = useNavigation();

  const increaseQuantity = () => {
    setCount(count + 1);
  };
  const decreaseQuantity = () => {
    setCount(count - 1);
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductDetail", { product })}
      >
        <View
          style={[count && { backgroundColor: "#F8A37C" }, styles.productBox]}
        >
          <Image style={styles.productThumb} source={{ uri: product.url }} />
          <Text
            style={[
              count ? styles.activeFontColor : styles.inactiveFontColor,
              styles.productTitle,
            ]}
          >
            {product.name}
          </Text>
          <Text
            style={[
              count ? styles.activeFontColor : styles.inactiveFontColor,
              styles.productDescription,
            ]}
          >
            {product.description}
          </Text>
          <View style={styles.priceQuantity}>
            <Text style={styles.productPrice}>${product.price}</Text>
            {count ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={decreaseQuantity}>
                  <View style={styles.countCircle}>
                    <Text style={styles.incrementDecrementIcon}>-</Text>
                  </View>
                </TouchableOpacity>
                <Text style={count && styles.activeFontColor}>
                  {count > 9 ? count : `0${count}`}
                </Text>
                <TouchableOpacity onPress={increaseQuantity}>
                  <View style={styles.countCircle}>
                    <Text style={styles.incrementDecrementIcon}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={increaseQuantity}>
                  <View style={styles.countCircle}>
                    <Text style={styles.incrementDecrementIcon}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  productBox: {
    borderWidth: 1,
    borderColor: "#BDB9B7",
    borderRadius: 13,
    width: 170,
    height: 210,
    justifyContent: "space-around",
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingTop: 16,
    paddingBottom: 7,
  },
  productThumb: {
    borderRadius: 15,
    width: 85,
    height: 85,
    alignSelf: "center",
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 14,
    lineHeight: 16,
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  priceQuantity: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  countCircle: {
    backgroundColor: "#FF4A03",
    width: 25,
    height: 25,
    borderRadius: 50,
    alignItems: "center",
    marginHorizontal: 5,
  },
  incrementDecrementIcon: {
    fontSize: 16,
    color: "#fff",
  },
  activeFontColor: {
    color: "#fff",
  },
  inactiveFontColor: {
    color: "#9D9998",
  },
});
export default ProductItem;
