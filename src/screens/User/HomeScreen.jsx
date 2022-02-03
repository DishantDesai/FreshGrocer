import { collection, getDocs } from "firebase/firestore";
import React, { useState, useMemo, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import CategoryItem from "../../components/User/CategoryItem";
import ProductItem from "../../components/User/ProductItem";
import { db } from "../../firebase/config";
import { getAllProducts } from "../../redux/actions/products";

import {
  vegetablesAndFruits,
  dairyAndEggs,
  meatAndSeaFood,
  pantryFood,
  bakeryFood,
  frozenFood,
} from "../../utils/data";
const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const productsCollection = collection(db, "products");
  const [activeFilter, setActiveFilter] = useState("weekly");
  const [productList, setProductList] = useState([]);

  const { items } = useSelector((state) => state.products);

  const favoriteItems = useSelector((state) => state.favorite.itemsSelected);

  const getProducts = async () => {
    const data = await getDocs(productsCollection);

    dispatch(
      getAllProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      // const filterData = items.filter((item) => {
      //   return item.category === category.type;
      // });
      setProductList(items);
    }
  }, [items]);

  const categoryList = [
    {
      id: 1,
      title: "Fruits & Vegetables",
      thumb: require("../../../assets/images/fruits-and-vegetables.jpeg"),
      type: "vegetablesFruits",
      list: ["all", "fruits", "vegetables"],
    },
    {
      id: 2,
      title: "Dairy & Eggs",
      thumb: require("../../../assets/images/Dairy-and-eggs.jpeg"),
      type: "dairyEggs",
      list: ["all", "dairy", "eggs"],
    },
    {
      id: 3,
      title: "Meet & Sea Food",
      thumb: require("../../../assets/images/meat-and-sea-food.jpeg"),
      type: "meatSeafood",
      list: ["all", "seafood", "meat"],
    },
    {
      id: 4,
      title: "Pantry & Groceries",
      thumb: require("../../../assets/images/pantry.jpeg"),
      type: "pantryGroceries",
      list: ["all", "pantry", "groceries"],
    },
    {
      id: 5,
      title: "Bakery",
      thumb: require("../../../assets/images/bakery.jpeg"),
      type: "bakery",
      list: ["all", "bakeryy"],
    },
    {
      id: 6,
      title: "Frozen Food",
      thumb: require("../../../assets/images/frozen-food.jpeg"),
      type: "frozenFood",
      list: ["all", "frozenFood"],
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
  const favoriteItemList = useMemo(() => {
    if (activeFilter === "favorite") {
      const allProducts = [
        ...vegetablesAndFruits,
        ...dairyAndEggs,
        ...meatAndSeaFood,
        ...pantryFood,
        ...bakeryFood,
        ...frozenFood,
      ];
      return allProducts.filter((p) => p.isFavorite);
    }
  }, [activeFilter]);
  return (
    <SafeAreaView style={styles.container}>
      <Header hideBackArrow />
      <TextInput
        style={styles.input}
        placeholder="Search items..."
        autoCapitalize="none"
      />
      <View style={styles.filterContainer}>
        {filterList.map((filter) => {
          return (
            <TouchableOpacity
              key={filter.id}
              onPress={() => setActiveFilter(filter.key)}
            >
              <View
                style={[
                  filter.key === activeFilter
                    ? styles.activeFilterBg
                    : styles.inActiveFilterBg,
                  styles.filterBox,
                ]}
              >
                <Text
                  style={[
                    filter.key === activeFilter
                      ? styles.activeFilterTitle
                      : styles.inActiveFilterTitle,
                    styles.filterTitle,
                  ]}
                >
                  {filter.title}
                </Text>
                <Image style={styles.filterImage} source={filter.thumb} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{ marginTop: 25 }}>
        <Text style={styles.selectedFilterTitle}>
          {activeFilter === "weekly" ? "Weekly Offers" : activeFilter}
        </Text>
      </View>
      {activeFilter === "weekly" && (
        <>
          <View style={{ paddingBottom: 100 }}>
            <FlatList
              key={"_"}
              data={productList}
              horizontal={false}
              numColumns={2}
              columnWrapperStyle={styles.categoryContainer}
              renderItem={({ item }) => {
                return (
                  <ProductItem product={item} categoryList={categoryList} />
                );
              }}
              keyExtractor={(item) => item.id}
            />
          </View>
        </>
      )}

      {activeFilter === "grocery" && (
        <FlatList
          key={"_"}
          data={categoryList}
          horizontal={false}
          numColumns={2}
          columnWrapperStyle={styles.categoryContainer}
          renderItem={({ item }) => {
            return (
              <CategoryItem
                activeFilter={activeFilter}
                category={item}
                navigation={navigation}
                categoryList={categoryList}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      )}

      {activeFilter === "favorite" && (
        <FlatList
          key={"_"}
          data={favoriteItems.items}
          horizontal={false}
          numColumns={2}
          columnWrapperStyle={styles.categoryContainer}
          renderItem={({ item }) => {
            return <ProductItem product={item} />;
          }}
          keyExtractor={(item) => item.id}
        />
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
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activeFilterBg: {
    backgroundColor: "#FF4A03",
    color: "#ffffff",
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
});

export default Home;
