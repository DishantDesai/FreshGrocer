import React from "react";
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

const ProductEditScreen = ({ navigation, route }) => {
  const { product } = route.params;
  const [checked, setChecked] = React.useState("first");
  return (
    <SafeAreaView style={styles.container}>
      <Header hideCart={true} />
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
          source={{ uri: product.url }}
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
        <TextInput style={styles.input} placeholder="edit price" />
      </View>
      <View>
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 20,
            paddingVertical: 10,
          }}
        >
          Order Type
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 20,
            }}
          >
            <RadioButton
              value="first"
              label="Carto Base MAp"
              status={checked === "first" ? "checked" : "unchecked"}
              onPress={() => {
                setChecked("first");
              }}
            />
            <Text>Delivery</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value="second"
              status={checked === "second" ? "checked" : "unchecked"}
              onPress={() => {
                setChecked("second");
              }}
            />
            <Text>Pick Up</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AdminProductList")}
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
