import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Header from "../../components/Header";
import { THEME_COLOR } from "../../utils/constants";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { RadioButton } from "react-native-paper";
import { getAllProducts } from "../../redux/actions/products";
import { useDispatch } from "react-redux";

const AddProducts = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [productPrice, setProductPrice] = useState(0);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productImage, setProductImage] = useState("");
  const [checked, setChecked] = useState("");

  const productsCollectionRef = collection(db, "products");

  const getProducts = async () => {
    const data = await getDocs(productsCollectionRef);

    dispatch(
      getAllProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  const createProduct = async () => {
    try {
      const data = await addDoc(productsCollectionRef, {
        name: productName,
        image: productImage,
        price: productPrice,
        quantity: productQuantity,
        description: productDescription,
        type: checked,
      });
      getProducts();
      alert("Product successfully added!");
      navigation.navigate("AdminProductList");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header hideCart={true} addNavigate={false} hideBackArrow={true} />

        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 20,
              paddingVertical: 10,
            }}
          >
            Add Product
          </Text>
          <TextInput
            value={productName}
            onChangeText={(text) => setProductName(text)}
            style={styles.input}
            placeholder="Add Name"
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <TextInput
            value={productDescription}
            onChangeText={(text) => setProductDescription(text)}
            style={styles.input}
            placeholder="Add Description"
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <TextInput
            value={productPrice}
            onChangeText={(text) => setProductPrice(text)}
            style={styles.input}
            placeholder="Add price"
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <TextInput
            value={productQuantity}
            onChangeText={(text) => setProductQuantity(text)}
            style={styles.input}
            placeholder="Quantity"
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <TextInput
            value={productImage}
            onChangeText={(text) => setProductImage(text)}
            style={styles.input}
            placeholder="Add product image"
          />
        </View>
        <View style={{ marginTop: 10, flexDirection: "row" }}>
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <RadioButton
              value="first"
              label="Carto Base MAp"
              status={checked === "vegetables" ? "checked" : "unchecked"}
              onPress={() => {
                setChecked("vegetables");
              }}
            />
            <Text>Vegetables</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <RadioButton
              value="second"
              status={checked === "fruits" ? "checked" : "unchecked"}
              // onPress={() => { this.setState({ checked: 'second' }); }}
              onPress={() => {
                setChecked("fruits");
              }}
            />
            <Text>Fruits</Text>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <TouchableOpacity style={styles.button} onPress={createProduct}>
            <Text style={styles.buttonText}>Save and Exit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
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
  container: {
    flex: 1,
    paddingTop: 14,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  filterBtn: {
    height: 40,
    width: 100,
    marginRight: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  filterTypeText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  activeFilterBg: { backgroundColor: THEME_COLOR },
  inactiveFilterBg: { backgroundColor: "#ECEDF1" },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#9D9998",
    padding: 10,
    borderRadius: 9,
    fontWeight: "bold",
    color: "#9D9998",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  activeFilterBg: {
    backgroundColor: "#FF4A03",
    color: "#ffffff",
  },
  sortingContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  inActiveFilterBg: {
    backgroundColor: "#ECEDF1",
    color: "#9D9998",
  },
  activeFilterTitle: {
    color: "#ffffff",
  },
  inActiveFilterTitle: {
    color: "#9D9998",
  },
  filterBox: {
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: "space-around",
  },

  filterImage: {
    zIndex: 10,
    width: 80,
    height: 55,
    borderRadius: 28,
    alignSelf: "center",
  },
  filterTitle: {
    fontSize: 12,
    fontWeight: "bold",
    alignSelf: "center",
  },
  categoryContainer: {
    justifyContent: "space-between",
    paddingTop: 20,
  },
  selectedFilterTitle: {
    fontSize: 20,
    color: "#FF4A03",
    textTransform: "capitalize",
  },
  categoryBox: {
    borderWidth: 1,
    borderColor: "#BDB9B7",
    borderRadius: 13,
    width: 165,
    height: 185,
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  categoryThumb: {
    borderRadius: 15,
    width: 116,
    height: 116,
    marginTop: 10,
  },
  categoryTitle: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "bold",
    color: "#9D9998",
  },
  dropdown: {
    margin: 16,
    height: 50,
    minWidth: 190,
    maxWidth: 190,
    width: "auto",
    borderWidth: 0,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AddProducts;
