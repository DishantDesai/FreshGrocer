import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";

const AdminProductItem = ({
  product,
  addIcon = true,
  deleteIcon = false,
  getProducts,
}) => {
  const [count, setCount] = useState(0);
  const navigation = useNavigation();

  const increaseQuantity = () => {
    setCount(count + 1);
  };
  const decreaseQuantity = () => {
    setCount(count - 1);
  };

  console.log("product", product);

  const deleteProduct = async (id) => {
    try {
      const productDoc = doc(db, "products", id);
      await deleteDoc(productDoc);

      getProducts();
    } catch (error) {
      console.log("id", id);
      console.log("eror", error);
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
                {addIcon ? (
                  <View style={styles.countCircle}>
                    <Text style={styles.incrementDecrementIcon}>+</Text>
                  </View>
                ) : (
                  <View style={{ flexDirection: "row" }}>
                    {deleteIcon && (
                      <TouchableOpacity
                        onPress={() => deleteProduct(product.id)}
                      >
                        <View style={styles.countCircle2}>
                          <AntDesign name="delete" size={16} color="black" />
                        </View>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      onPress={() =>
                        addIcon
                          ? setCount(count + 1)
                          : navigation.navigate("ProductEdit", {
                              product,
                            })
                      }
                    >
                      <View style={styles.countCircle2}>
                        <AntDesign name="edit" size={16} color="white" />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
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
export default AdminProductItem;
