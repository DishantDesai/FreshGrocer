import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign, Feather } from "@expo/vector-icons";

import { THEME_COLOR } from "../../utils/constants";
const data = [
  { label: "Price low to high", value: "priceDesc" },
  { label: "Price high to low", value: "priceAsc" },
  { label: "Top rated", value: "topRated" },
];
const ProductListScreen = ({ route }) => {
  const { category, activeFilter } = route.params;
  const [productList, setProductList] = useState([]);
  const [sortOption, setSortOption] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (activeFilter === "weekly") {
        if (category.type === "fruitsAndVegetables") {
          setProductList(vegetablesAndFruits.filter((p) => p.hasOffer));
        } else if (category.type === "dairy") {
          setProductList(dairyAndEggs.filter((p) => p.hasOffer));
        } else if (category.type === "meat") {
          setProductList(meatAndSeaFood.filter((p) => p.hasOffer));
        } else if (category.type === "bakery") {
          setProductList(bakeryFood.filter((p) => p.hasOffer));
        } else if (category.type === "pantry") {
          setProductList(pantryFood.filter((p) => p.hasOffer));
        } else if (category.type === "frozen") {
          setProductList(frozenFood.filter((p) => p.hasOffer));
        }
      } else {
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
      }
      setLoading(false);
    }, 1000);
  }, []);
  const tempProductList = [...productList];
  const sortedProducts = useMemo(() => {
    if (sortOption) {
      return tempProductList.sort((firstEle, secondEle) => {
        if (sortOption === "priceAsc") {
          if (firstEle.price < secondEle.price) {
            return 1;
          }
          if (firstEle.price > secondEle.price) {
            return -1;
          }
          return 0;
        } else if (sortOption === "priceDesc") {
          if (firstEle.price < secondEle.price) {
            return -1;
          }
          if (firstEle.price > secondEle.price) {
            return 1;
          }
          return 0;
        }
      });
    } else {
      return productList;
    }
  }, [sortOption, productList]);
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
      <Header />
      <TextInput
        style={styles.input}
        placeholder="Search items..."
        autoCapitalize="none"
      />
      {productList.length ? (
        <View>
          <View style={styles.categoryFilterContainer}>
            <TouchableOpacity style={[styles.filterBtn, styles.activeFilterBg]}>
              <Text
                style={[styles.activeFilterTextColor, styles.filterTypeText]}
              >
                Vegetables
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterBtn, styles.inactiveFilterBg]}
            >
              <Text
                style={[styles.inactiveFilterTextColor, styles.filterTypeText]}
              >
                Fruits
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterBtn, styles.inactiveFilterBg]}
            >
              <Text
                style={[styles.inactiveFilterTextColor, styles.filterTypeText]}
              >
                Herbs
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterBtn, styles.activeFilterBg]}>
              <Text
                style={[styles.activeFilterTextColor, styles.filterTypeText]}
              >
                Salade kits
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterBtn, styles.activeFilterBg]}>
              <Text
                style={[styles.activeFilterTextColor, styles.filterTypeText]}
              >
                Vegetables
              </Text>
            </TouchableOpacity>
          </View>
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
                <MaterialCommunityIcons
                  style={styles.icon}
                  name="sort"
                  size={24}
                />
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
            data={sortedProducts}
            horizontal={false}
            numColumns={2}
            columnWrapperStyle={styles.categoryContainer}
            renderItem={({ item }) => {
              return <ProductItem product={item} />;
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={60} color={THEME_COLOR} />
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={styles.noItemFound}>
            <Feather name="shopping-bag" size={80} color={THEME_COLOR} />
          </View>
          <Text
            style={{
              fontSize: 24,
              color: "#9D9998",
              alignSelf: "center",
            }}
          >
            No items found
          </Text>
        </View>
      )}
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
  },
  dropdown: {
    margin: 16,
    height: 50,
    minWidth: 190,
    maxWidth: 190,
    width: "auto",
    borderWidth: 0,
  },
  containerListStyle: {
    width: 200,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
    color: THEME_COLOR,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  activeColor: {
    color: THEME_COLOR,
  },
  sortingContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  categoryFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
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
  activeFilterBg: { backgroundColor: THEME_COLOR },
  inactiveFilterBg: { backgroundColor: "#ECEDF1" },
  activeFilterTextColor: {
    color: "white",
  },
  inactiveFilterTextColor: {
    color: "#9D9998",
  },
  filterTypeText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  noItemFound: {
    height: 150,
    width: 150,
    backgroundColor: "#ECEDF1",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 75,
  },
});

export default ProductListScreen;
