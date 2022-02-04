import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

const CategoryItem = ({ category, activeFilter, navigation, categoryList }) => {
  const [categoryListData, setCategoryListData] = useState([]);

  useEffect(() => {
    const filterData = categoryList.filter((item) => {
      return item.type === category.type;
    });

    setCategoryListData(filterData[0].list);
  }, [category]);

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductList", {
            category,
            activeFilter,
            categoryListData,
          })
        }
      >
        <View style={styles.categoryBox}>
          <Image style={styles.categoryThumb} source={category.thumb} />
          <Text style={styles.categoryTitle}>{category.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
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
export default CategoryItem;
