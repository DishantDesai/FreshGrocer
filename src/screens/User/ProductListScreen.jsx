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
import ProductItem from "../../components/User/ProductItem";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign, Feather } from "@expo/vector-icons";
import { getAllProducts } from "../../redux/actions/products";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { THEME_COLOR } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
const data = [
  { label: "Price low to high", value: "lth" },
  { label: "Price high to low", value: "htl" },
  { label: "Relevance", value: "relevance" },
];
const ProductListScreen = ({ route }) => {
  const dispatch = useDispatch();
  const [filterFoodProduct, setFilterFoodProduct] = useState("all");

  const [sorting, setSorting] = useState("relevance");

  const productsCollection = collection(db, "products");

  const { category, categoryListData } = route.params;
  const [productList, setProductList] = useState([]);
  const [sortOption, setSortOption] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const { items } = useSelector((state) => state.products);

  const getProducts = async () => {
    const data = await getDocs(productsCollection);

    dispatch(
      getAllProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  useEffect(() => {
    getProducts();
  }, []);

  const eitherSort = (arr = []) => {
    const sorter = (a, b) => {
      return +a.price - +b.price;
    };
    return arr.sort(sorter);
  };

  const htlSort = (arr = []) => {
    const sorter = (a, b) => {
      return +b.price - +a.price;
    };
    return arr.sort(sorter);
  };

  useEffect(() => {
    let filterData = [];
    if (items.length > 0) {
      filterData = items.filter((item) => {
        if (item.category === category.type) {
          if (filterFoodProduct === "all") {
            return true;
          } else if (filterFoodProduct === item.subCategory) {
            return true;
          }
        }
      });

      if (sorting === "lth") {
        filterData = eitherSort(filterData);
      }
      if (sorting === "htl") {
        filterData = htlSort(filterData);
      }

      setProductList(filterData);
    }
  }, [items, filterFoodProduct, sorting]);

  useEffect(() => {
    // setLoading(true);
    // setTimeout(() => {
    //   if (activeFilter === "weekly") {
    //     if (category.type === "vegetablesFruits") {
    //       setProductList(vegetablesAndFruits.filter((p) => p.hasOffer));
    //     } else if (category.type === "dairy") {
    //       setProductList(dairyAndEggs.filter((p) => p.hasOffer));
    //     } else if (category.type === "meat") {
    //       setProductList(meatAndSeaFood.filter((p) => p.hasOffer));
    //     } else if (category.type === "bakery") {
    //       setProductList(bakeryFood.filter((p) => p.hasOffer));
    //     } else if (category.type === "pantry") {
    //       setProductList(pantryFood.filter((p) => p.hasOffer));
    //     } else if (category.type === "frozen") {
    //       setProductList(frozenFood.filter((p) => p.hasOffer));
    //     }
    //   } else {
    //     if (category.type === "vegetablesFruits") {
    //       setProductList(vegetablesAndFruits);
    //     } else if (category.type === "dairy") {
    //       setProductList(dairyAndEggs);
    //     } else if (category.type === "meat") {
    //       setProductList(meatAndSeaFood);
    //     } else if (category.type === "bakery") {
    //       setProductList(bakeryFood);
    //     } else if (category.type === "pantry") {
    //       setProductList(pantryFood);
    //     } else if (category.type === "frozen") {
    //       setProductList(frozenFood);
    //     }
    //   }
    //   setLoading(false);
    // }, 1000);
  }, []);
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
      <Header hidePlusIcon={true} />
      <TextInput
        style={styles.input}
        placeholder="Search items..."
        autoCapitalize="none"
        onChangeText={setSearchText}
      />
      <View style={styles.categoryFilterContainer}>
        {categoryListData.map((list, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => setFilterFoodProduct(list)}
              style={[
                styles.filterBtn,
                filterFoodProduct === list
                  ? styles.activeFilterBg
                  : styles.inactiveFilterBg,
              ]}
            >
              <Text
                style={[
                  filterFoodProduct === list
                    ? styles.activeFilterTextColor
                    : styles.inactiveFilterTextColor,
                  styles.filterTypeText,
                ]}
              >
                {list}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {productList.length ? (
        <View style={{ paddingBottom: 100 }}>
          <FlatList
            key={"_"}
            data={productList}
            data={productList.filter((val) => {
              if (searchText === "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return val;
              }
            })}
            horizontal={false}
            numColumns={2}
            columnWrapperStyle={styles.categoryContainer}
            renderItem={({ item }) => {
              return (
                <ProductItem
                  product={item}
                  categoryListData={categoryListData}
                />
              );
            }}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => {
              return (
                <View>
                  <View style={styles.sortingContainer}>
                    <Dropdown
                      style={styles.dropdown}
                      containerStyle={styles.containerListStyle}
                      placeholderStyle={styles.activeColor}
                      selectedTextStyle={styles.activeColor}
                      data={data}
                      onChange={(item) => setSorting(item.value)}
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
                        <AntDesign
                          name="closecircleo"
                          size={18}
                          color={THEME_COLOR}
                        />
                      </TouchableOpacity>
                    ) : (
                      <Text></Text>
                    )}
                  </View>
                </View>
              );
            }}
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
