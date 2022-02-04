import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { db } from "../../firebase/config";
import OrderItem from "./OrderDetails";

const ListOrders = () => {
  const [orderStatus, setOrderStatus] = useState("current");

  const [orders, setOrders] = useState([]);

  const ordersCollection = collection(db, "orders");

  const getOrders = async () => {
    const data = await getDocs(ordersCollection);

    const temp = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    const filteredData = temp.filter((order) => order.status === orderStatus);

    setOrders(filteredData);
  };

  useEffect(() => {
    getOrders();
  }, [orderStatus]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <TouchableOpacity onPress={() => setOrderStatus("current")}>
          <View
            style={{
              backgroundColor: orderStatus === "current" ? "red" : "#ECEDF1",
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => setOrderStatus("current")}
          >
            <Text>Current Orders</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setOrderStatus("previous")}>
          <View
            style={{
              backgroundColor: orderStatus === "previous" ? "red" : "#ECEDF1",
              padding: 10,
              borderRadius: 10,
              marginLeft: 10,
            }}
          >
            <Text>Previous Orders</Text>
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        key={"_"}
        data={orders}
        horizontal={false}
        numColumns={1}
        // columnWrapperStyle={styles.categoryContainer}
        renderItem={({ item }) => {
          return <OrderItem order={item} addIcon={false} deleteIcon={true} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  categoryContainer: {
    justifyContent: "space-between",
    paddingTop: 20,
  },
});

export default ListOrders;
