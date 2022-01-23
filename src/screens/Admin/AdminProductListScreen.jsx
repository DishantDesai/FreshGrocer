import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Header from "../../components/Header";
import CategoryItem from "../../components/User/CategoryItem";
import ProductItem from "../../components/User/ProductItem";
import { THEME_COLOR } from "../../utils/constants";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

import {
  vegetablesAndFruits,
  dairyAndEggs,
  meatAndSeaFood,
  pantryFood,
  bakeryFood,
  frozenFood,
} from "../../utils/data";
import AdminProductItem from "./AdminProductItem";
const AdminProductList = ({ navigation, route }) => {
  const productsCollection = collection(db, "products");

  const [products, setProducts] = useState([]);

  // const { category } = route.params;
  const [sortOption, setSortOption] = useState(null);
  const data = [
    { label: "Price low to high", value: "priceDesc" },
    { label: "Price high to low", value: "priceAsc" },
    { label: "Top rated", value: "topRated" },
  ];
  const [activeFilter, setActiveFilter] = useState("weekly");
  const [productList, setProductList] = useState([]);

  const getProducts = async () => {
    const data = await getDocs(productsCollection);

    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log("products", products);

  const categoryList = [
    {
      id: 1,
      title: "Fruits & Vegetables",
      thumb: require("../../../assets/images/fruits-and-vegetables.jpeg"),
      type: "fruitsAndVegetables",
    },
    {
      id: 2,
      title: "Dairy & Eggs",
      thumb: require("../../../assets/images/Dairy-and-eggs.jpeg"),
      type: "dairy",
    },
    {
      id: 3,
      title: "Meet & Sea Food",
      thumb: require("../../../assets/images/meat-and-sea-food.jpeg"),
      type: "meat",
    },
    {
      id: 4,
      title: "Pantry & Groceries",
      thumb: require("../../../assets/images/pantry.jpeg"),
      type: "pantry",
    },
    {
      id: 5,
      title: "Bakery",
      thumb: require("../../../assets/images/bakery.jpeg"),
      type: "bakery",
    },
    {
      id: 6,
      title: "Frozen Food",
      thumb: require("../../../assets/images/frozen-food.jpeg"),
      type: "frozen",
    },
  ];
  const filterList = [
    {
      id: 1,
      title: "Weekly Offers",
      thumb: require("../../../assets/images/weekly-offers.jpeg"),
      key: "weekly",
    },
    {
      id: 2,
      title: "Grocery",
      thumb: require("../../../assets/images/grocery.png"),
      key: "grocery",
    },
    {
      id: 3,
      title: "Favorite",
      thumb: require("../../../assets/images/favorites.png"),
      key: "favorite",
    },
  ];
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text
          style={[
            item.value === sortOption
              ? { color: "#ffffff" }
              : { color: "#000" },
            styles.textItem,
          ]}
        >
          {item.label}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header hideCart={true} addNavigate={true} hideBackArrow={true} />
      <TextInput
        style={styles.input}
        placeholder="Search items..."
        autoCapitalize="none"
      />

      <View style={styles.sortingContainer}>
        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.containerListStyle}
          placeholderStyle={styles.activeColor}
          selectedTextStyle={styles.activeColor}
          data={data}
          onChange={(item) => setSortOption(item.value)}
          value={sortOption}
          maxHeight={180}
          labelField="label"
          valueField="value"
          placeholder="Sorting"
          activeColor={THEME_COLOR}
          iconColor={THEME_COLOR}
          renderLeftIcon={() => (
            <MaterialCommunityIcons style={styles.icon} name="sort" size={24} />
          )}
          renderItem={renderItem}
        />
        {sortOption ? (
          <TouchableOpacity onPress={() => setSortOption(null)}>
            <AntDesign name="closecircleo" size={18} color={THEME_COLOR} />
          </TouchableOpacity>
        ) : (
          <Text></Text>
        )}
      </View>

      <FlatList
        key={"_"}
        data={products}
        horizontal={false}
        numColumns={2}
        columnWrapperStyle={styles.categoryContainer}
        renderItem={({ item }) => {
          return (
            <AdminProductItem
              product={item}
              addIcon={false}
              deleteIcon={true}
              getProducts={getProducts}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
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
});

export default AdminProductList;
c