import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import {
  vegetablesAndFruits,
  dairyAndEggs,
  meatAndSeaFood,
  pantryFood,
  bakeryFood,
  frozenFood,
} from "../../utils/data";
import ProductItem from "../../components/User/ProductItem";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductListScreen = ({ route }) => {
  const { category } = route.params;
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    if (category.type === "fruitsAndVegetables") {
      setProductList(vegetablesAndFruits);
    } else if (category.type === "dairy") {
      setProductList(dairyAndEggs);
    } else if (category.type === "meat") {
      setProductList(meatAndSeaFood);
    } else if (category.type === "bakery") {
      setProductList(bakeryFood);
    } else if (category.type === "pantry") {
      setProductList(pantryFood);
    } else if (category.type === "frozen") {
      setProductList(frozenFood);
    }
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <TextInput
        style={styles.input}
        placeholder="Search items..."
        autoCapitalize="none"
      />
      <TouchableOpacity>
        <Text>Sorti</Text>
      </TouchableOpacity>
      <FlatList
        key={"_"}
        data={productList}
        horizontal={false}
        numColumns={2}
        columnWrapperStyle={styles.categoryContainer}
        renderItem={({ item }) => {
          return <ProductItem product={item} />;
        }}
        keyExtractor={(item) => item.id}
      />
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
  categoryContainer: {
    justifyContent: "space-between",
    paddingTop: 20,
  },
});

export default ProductListScreen;
