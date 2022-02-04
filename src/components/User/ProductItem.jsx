import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/actions/cart";

const ProductItem = ({
  product,
  addIcon = true,
  deleteIcon = false,
  categoryList,
  categoryListData,
}) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const navigation = useNavigation();

  const { itemsSelected } = useSelector((state) => state.cart);
  useEffect(() => {
    const filterData = itemsSelected.items.filter(
      (item) => item.id === product.id
    );

    if (filterData.length > 0) {
      setCount(filterData[0].count);
    } else {
      setCount(0);
    }
  }, [itemsSelected]);

  const increaseQty = (item) => {
    // setCount(count + 1);

    dispatch(increaseQuantity(item.id));
  };
  const decreaseQty = (item) => {
    dispatch(decreaseQuantity(item.id));
    if (count - 1 < 1) {
      dispatch(removeFromCart(item));
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(addIcon ? "ProductDetail" : "ProductEdit", {
            product: product,
          })
        }
      >
        <View
          style={[count && { backgroundColor: "#F8A37C" }, styles.productBox]}
        >
          <Image style={styles.productThumb} source={{ uri: product.image }} />
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
          <View></View>
          <View style={styles.priceQuantity}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.productPrice}>${product.discountPrice}</Text>
              {product.offer && (
                <Text style={styles.productPrice2}>${product.price}</Text>
              )}
            </View>

            {count ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={() => decreaseQty(product)}>
                  <View style={styles.countCircle}>
                    <Text style={styles.incrementDecrementIcon}>-</Text>
                  </View>
                </TouchableOpacity>
                <Text style={count && styles.activeFontColor}>
                  {count > 9 ? count : `0${count}`}
                </Text>
                <TouchableOpacity onPress={() => increaseQty(product)}>
                  <View style={styles.countCircle}>
                    <Text style={styles.incrementDecrementIcon}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => {
                    setCount(count + 1);

                    const filterItem = itemsSelected?.items?.filter(
                      (item) => item.id === product.id
                    );

                    if (filterItem.length > 0) {
                    } else {
                      const product1 = { ...product };
                      product1["count"] = count + 1;
                      dispatch(addToCart(product1));
                    }
                  }}
                >
                  {addIcon ? (
                    <View style={styles.countCircle}>
                      <Text style={styles.incrementDecrementIcon}>+</Text>
                    </View>
                  ) : (
                    <View style={{ flexDirection: "row" }}>
                      {deleteIcon && (
                        <View style={styles.countCircle2}>
                          <AntDesign name="delete" size={16} color="black" />
                        </View>
                      )}
                      <View style={styles.countCircle2}>
                        <AntDesign name="edit" size={16} color="white" />
                      </View>
                    </View>
                  )}
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
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginRight: 3,
  },
  productPrice2: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    textDecorationLine: "line-through",
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
  countCircle2: {
    backgroundColor: "#FF4A03",
    // width:25,
    // height:25,
    padding: 5,
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
