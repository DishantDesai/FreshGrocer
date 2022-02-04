import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import Header from "../../components/Header";
import OrderSummary from "../../components/User/OrderSummary";
import {
  DELIVERY_CHARGE,
  TAX_CHARGE,
  THEME_COLOR,
} from "../../utils/constants";
import { db } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/actions/cart";
import axios from "axios";
import { useStripe } from "@stripe/stripe-react-native";
import { ActivityIndicator } from "react-native-paper";

const CheckoutScreen = ({ route }) => {
  const stripe = useStripe();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  const { cartTotal } = route.params;
  const DEFAULT_ADDRESS =
    "4717 Pierre-de coubertin avenue, Montreal,Quebec H1A 1A9";
  const navigation = useNavigation();

  const { items } = useSelector((state) => state.cart.itemsSelected);

  const [isFocused, setIsFocus] = useState(false);
  const [address, setAddress] = useState(DEFAULT_ADDRESS);
  const cancelEditAddress = () => {
    setAddress(DEFAULT_ADDRESS);
    setIsFocus(false);
  };

  const placeOrderToFirebase = async () => {
    const addOrders = collection(db, "orders");

    try {
      const data = await addDoc(addOrders, {
        items: items,
        createdAt: new Date(),
        status: "current",
      });

      const orderId = data._key?.path?.segments[1];

      dispatch(clearCart());

      alert("Order placed successfully");
      navigation.navigate("Order", {
        orderId,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const initiateBuy = async () => {
    const subtotal =
      Math.round((TAX_CHARGE * cartTotal + DELIVERY_CHARGE + cartTotal) * 100) /
      100;

    setLoading(true);

    try {
      const response = await fetch(
        `https://grocery-rn-app.herokuapp.com/buy/${subtotal}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false);

      const data = await response.json();

      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName: "Grocery",
      });

      if (initSheet.error) {
        return Alert.alert(initSheet.error.message);
      }

      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret: data.clientSecret,
      });

      if (presentSheet.error) {
        return Alert.alert(presentSheet.error.message);
      }
    } catch (error) {
      setLoading(false);
    }

    try {
      const response2 = await axios.get(
        `https://grocery-rn-app.herokuapp.com/email/${userData?.user?.email}`
      );
    } catch (error) {
      console.log("error", error);
    }

    Alert.alert("Payment successfully done, Please check your mail.");

    await placeOrderToFirebase();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header hideCart title="Checkout" hidePlusIcon={true} />

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
          {!loading ? (
            <TouchableOpacity
              style={[
                {
                  backgroundColor: THEME_COLOR,
                },
                styles.placeOrderBtn,
              ]}
              onPress={() => {
                initiateBuy();
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                Place order
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                {
                  backgroundColor: THEME_COLOR,
                },
                styles.placeOrderBtn,
              ]}
            >
              <ActivityIndicator color="#fff" />
            </TouchableOpacity>
          )}
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
