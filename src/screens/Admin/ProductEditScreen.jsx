import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import Header from "../../components/Header";
import { RadioButton } from "react-native-paper";
import { updateDoc, doc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../redux/actions/products";

const ProductEditScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { product } = route.params;
  const [productPrice, setProductPrice] = useState(product?.price);

  const productsCollection = collection(db, "products");

  const getProducts = async () => {
    const data = await getDocs(productsCollection);

    dispatch(
      getAllProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  const updateProduct = async (id, price) => {
    const productDoc = doc(db, "products", id);
    const newFields = { price };
    await updateDoc(productDoc, newFields);

    getProducts();

    alert("Product successfully updated!");
    navigation.navigate("AdminProductList");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header hideCart={true} addNavigate={true} hideBackArrow={true} />
      <View
        style={{
          backgroundColor: "orange",
          flexDirection: "row",
          padding: 12,
          paddingVertical: 20,
          borderRadius: 10,
          width: "100%",
        }}
      >
        <Image
          style={{
            borderRadius: 15,
            width: 85,
            height: 85,
            marginRight: 15,
            alignSelf: "center",
          }}
          source={{ uri: product.image }}
        />
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
            width: "100%",
          }}
        >
          {product.name}
        </Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 20,
            paddingVertical: 10,
          }}
        >
          Item Price
        </Text>
        <TextInput
          value={productPrice}
          onChangeText={(text) => setProductPrice(text)}
          style={styles.input}
          placeholder="edit price"
        />
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => updateProduct(product.id, productPrice)}
        >
          <Text style={styles.buttonText}>Save and Exit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  input: {
    backgroundColor: "#ecedf1",
    height: 45,
    marginBottom: 20,
    borderRadius: 15,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#ff5b2d",
    borderRadius: 15,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
    height: 45,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default ProductEditScreen;
