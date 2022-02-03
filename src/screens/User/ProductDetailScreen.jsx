import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import Header from "../../components/Header";
import { AntDesign } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import { THEME_COLOR } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../redux/actions/cart";
import { db } from "../../firebase/config";
import { getAllProducts } from "../../redux/actions/products";
import {
  addToFavorite,
  removeFromFavorite,
} from "../../redux/actions/favorite";

const ProductDetailScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { product } = route.params;
  const [count, setCount] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const { itemsSelected } = useSelector((state) => state.cart);
  const favoriteItems = useSelector((state) => state.favorite.itemsSelected);

  useEffect(() => {
    const filterData = itemsSelected.items.filter(
      (item) => item.id === product.id
    );

    if (filterData.length > 0) {
      setCount(filterData[0].count);
    }
  }, [itemsSelected]);

  useEffect(() => {
    const filterData = favoriteItems.items.filter(
      (item) => item.id === product.id
    );

    if (filterData.length > 0) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favoriteItems]);

  const increaseQty = (item) => {
    dispatch(increaseQuantity(item.id));
  };

  const decreaseQty = (item) => {
    dispatch(decreaseQuantity(item.id));
    setCount(count - 1);
    if (count - 1 < 1) {
      dispatch(removeFromCart(item));
    }
  };

  const addFavorite = (item) => {
    dispatch(addToFavorite(item));
  };
  const removeFavorite = (item) => {
    dispatch(removeFromFavorite(item));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header hidePlusIcon={true} />
      <View style={styles.ratingContainer}>
        {isFavorite ? (
          <TouchableOpacity onPress={() => removeFavorite(product)}>
            <AntDesign name="heart" size={24} color="red" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => addFavorite(product)}>
            <AntDesign name="hearto" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <Image
        source={{ uri: product.image }}
        style={{ height: 300, width: "100%", resizeMode: "contain" }}
      />
      <Text style={styles.productTitle}>{product.name}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Rating
        onFinishRating={(rating) => {
          console.log(rating);
        }}
        startingValue={product.ratings}
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          marginVertical: 10,
        }}
        jumpValue={0.5}
        fractions
        imageSize={24}
        readonly
      />
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>${product.price}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={{ color: "#9D9998" }}>Quantity: </Text>
        <TouchableOpacity
          disabled={count === 1 ? true : false}
          onPress={() => {
            if (count - 1 !== 0) {
              decreaseQty(product);
            }
          }}
        >
          <View style={[count === 1 && { opacity: 0.6 }, styles.countCircle]}>
            <Text style={styles.incrementDecrementIcon}>
              <AntDesign name="minus" size={20} color="white" />
            </Text>
          </View>
        </TouchableOpacity>
        <Text
          style={[count && styles.activeFontColor, { marginHorizontal: 8 }]}
        >
          {count > 9 ? count : `${count}`}
        </Text>
        <TouchableOpacity onPress={() => increaseQty(product)}>
          <View style={styles.countCircle}>
            <Text style={styles.incrementDecrementIcon}>
              <AntDesign name="plus" size={20} color="white" />
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          const filterItem = itemsSelected.items.filter(
            (item) => item.id === product.id
          );

          if (filterItem.length > 0) {
            ToastAndroid.showWithGravity(
              "Already added to cart",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          } else {
            const data = { ...product };
            data["count"] = 1;
            dispatch(addToCart(data));
          }

          //
        }}
        style={styles.addToCartBtn}
      >
        <Text style={{ color: "white" }}>Add to cart</Text>
      </TouchableOpacity>
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
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 25,
  },
  productTitle: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "bold",
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 16,
    color: "#9D9998",
    fontWeight: "bold",
  },
  countCircle: {
    backgroundColor: "#FF4A03",
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  incrementDecrementIcon: {
    fontSize: 16,
    color: "#fff",
  },
  addToCartBtn: {
    height: 50,
    width: "100%",
    backgroundColor: THEME_COLOR,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    position: "absolute",
    bottom: 40,
  },
});

export default ProductDetailScreen;
