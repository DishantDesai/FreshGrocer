import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  FlatList,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import Header from "../../components/Header";
import OrderSummary from "../../components/User/OrderSummary";
import { Ionicons } from "@expo/vector-icons";
import { THEME_COLOR } from "../../utils/constants";
import {
  vegetablesAndFruits,
  dairyAndEggs,
  meatAndSeaFood,
  pantryFood,
  bakeryFood,
  frozenFood,
} from "../../utils/data";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../redux/actions/cart";

import { TAX_CHARGE, DELIVERY_CHARGE } from "../../utils/constants";

const CartScreen = () => {
  const dispatch = useDispatch();
  const [cartTotal, setCartTotal] = useState("");
  const [cartSubtotal, setCartSubtotal] = useState("");
  const navigation = useNavigation();
  const { items } = useSelector((state) => state.cart.itemsSelected);
  const calculateCartTotal = () => {
    let total = 0;
    items.forEach((c) => {
      const productPrice = parseFloat(c.discountPrice) * c.count;
      total += parseFloat(productPrice);
    });
    return total;
  };
  const CartItem = ({ cartProduct }) => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);

    const { itemsSelected } = useSelector((state) => state.cart);

    useEffect(() => {
      const filterData = itemsSelected.items.filter(
        (item) => item.id === cartProduct.id
      );

      if (filterData.length > 0) {
        setCount(filterData[0].count);
      }
    }, [itemsSelected]);

    const increaseQty = (item) => {
      dispatch(increaseQuantity(item.id));
    };
    const decreaseQty = (item) => {
      dispatch(decreaseQuantity(item.id));
      if (count - 1 < 1) {
        dispatch(removeFromCart(item));
      }
    };

    return (
      <View style={styles.cartItemContainer}>
        <View style={{ alignItems: "center", marginRight: 30 }}>
          <TouchableOpacity onPress={() => decreaseQty(cartProduct)}>
            <View style={styles.countCircle}>
              <Text style={styles.incrementDecrementIcon}>-</Text>
            </View>
          </TouchableOpacity>
          <Text style={{ color: "#9D9998", fontWeight: "bold" }}>{count}</Text>
          <TouchableOpacity onPress={() => increaseQty(cartProduct)}>
            <View style={styles.countCircle}>
              <Text style={styles.incrementDecrementIcon}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.cartItemDetailContainer}>
          <Image
            style={styles.productThumb}
            source={{
              uri: cartProduct.image,
            }}
          />
          <View>
            <Text numberOfLines={1} style={styles.productTitle}>
              {cartProduct.name}
            </Text>
            <Text style={styles.productPrice}>{cartProduct.discountPrice}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => dispatch(removeFromCart(cartProduct))}
          style={styles.closeIcon}
        >
          <Ionicons name="close" size={20} color="white" />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header hideCart title="Cart" hideBackArrow={false} hidePlusIcon={true} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={items}
        keyExtractor={(data) => data.id}
        renderItem={({ item }) => {
          return <CartItem cartProduct={item} />;
        }}
        ListFooterComponent={() => {
          return (
            <View>
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
              <OrderSummary
                cartTotal={calculateCartTotal()}
                setCartSubtotal={setCartSubtotal}
              />
              <TouchableOpacity
                onPress={() => {
                  if (items.length > 0) {
                    navigation.navigate("Checkout", {
                      cartTotal: calculateCartTotal(),
                    });
                  } else {
                    ToastAndroid.showWithGravity(
                      "Cart is empty",
                      ToastAndroid.SHORT,
                      ToastAndroid.BOTTOM
                    );
                  }
                }}
                style={styles.checkOutBtn}
              >
                <Text style={{ color: "white" }}>Proceed to Checkout</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
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
