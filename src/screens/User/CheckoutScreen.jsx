import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import Header from "../../components/Header";
import OrderSummary from "../../components/User/OrderSummary";
import { THEME_COLOR } from "../../utils/constants";

const CheckoutScreen = ({ route }) => {
  const { cartTotal } = route.params;
  const DEFAULT_ADDRESS =
    "4717 Pierre-de coubertin avenue, Montreal,Quebec H1A 1A9";
  const navigation = useNavigation();

  const [isFocused, setIsFocus] = useState(false);
  const [address, setAddress] = useState(DEFAULT_ADDRESS);
  const cancelEditAddress = () => {
    setAddress(DEFAULT_ADDRESS);
    setIsFocus(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header hideCart title="Checkout" />
      <View style={styles.mainViewStyle}>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Delivery Address :
          </Text>
          {isFocused ? (
            <View style={styles.inputContainer}>
              <TextInput
                multiline={true}
                style={styles.input}
                value={address}
                autofocus={true}
                onChangeText={setAddress}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={[
                    {
                      backgroundColor: "#ced4da",
                      marginRight: 20,
                    },
                    styles.addressBtn,
                  ]}
                  onPress={cancelEditAddress}
                >
                  <Text style={{ color: "#F20E0E", fontSize: 18 }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    {
                      backgroundColor: THEME_COLOR,
                    },
                    styles.addressBtn,
                  ]}
                  onPress={() => setIsFocus(false)}
                >
                  <Text style={{ color: "#fff", fontSize: 18 }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.addressViewStyle}>
              <Text style={{ padding: 20, fontSize: 22, color: "black" }}>
                {address}
              </Text>
              <TouchableOpacity
                onPress={() => setIsFocus(true)}
                style={styles.editIcon}
              >
                <Feather name="edit" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={{ marginTop: 30 }}>
          <OrderSummary cartTotal={cartTotal} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            flex: 1,
            alignItems: "flex-end",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={[
              {
                backgroundColor: "#ced4da",
                marginRight: 20,
              },
              styles.addressBtn,
            ]}
            onPress={() => navigation.navigate("Home")}
          >
            <Text
              style={{ color: "#F20E0E", fontSize: 18, fontWeight: "bold" }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                backgroundColor: THEME_COLOR,
              },
              styles.placeOrderBtn,
            ]}
            onPress={() => {
              Alert.alert(
                "Email Sent Successfully",
                "Order placed and confirmation sent to your email address",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      navigation.navigate("Order");
                    },
                  },
                ]
              );
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
              Place order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
  mainViewStyle: {
    flex: 1,
  },
  addressViewStyle: {
    borderRadius: 20,
    backgroundColor: "#ECEDF1",
    color: "#000",
    marginTop: 20,
  },
  editIcon: {
    alignSelf: "flex-end",
    marginRight: 10,
    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: "#ECEDF1",
    borderRadius: 20,
    marginVertical: 12,
    color: "#000",
    padding: 20,
  },
  input: {
    color: "#000",
    fontSize: 22,
    borderWidth: 1,
    borderRadius: 10,
  },
  addressBtn: {
    width: 100,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  placeOrderBtn: {
    width: 150,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default CheckoutScreen;