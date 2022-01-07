import React, { useEffect } from "react";
import { StyleSheet, View, Text, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Rating } from "react-native-ratings";
import { useTimer } from "react-timer-hook";
import { useNavigation } from "@react-navigation/native";

import { DELIVERY_TIME, THEME_COLOR } from "../../utils/constants";
import Header from "../../components/Header";

const OrderScreen = () => {
  const navigation = useNavigation();
  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp: new Date().setSeconds(DELIVERY_TIME),
    onExpire: () =>
      Alert.alert("Order delivered successfully", null, [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Home");
          },
        },
      ]),
  });
  useEffect(() => {
    restart(new Date().setSeconds(new Date().getSeconds() + 1799));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header hideCart title="Delivery" />
      <View style={styles.timerContainer}>
        <View>
          <Text style={[styles.timerTitleText]}>Minutes</Text>
          <View style={styles.timer}>
            <Text style={{ color: "white", fontSize: 34 }}>
              {minutes > 9 ? minutes : "0" + minutes}
            </Text>
          </View>
        </View>
        <Text
          style={[
            styles.timerTitleText,
            { alignSelf: "center", marginTop: 40, marginHorizontal: 20 },
          ]}
        >
          :
        </Text>
        <View>
          <Text style={styles.timerTitleText}>Seconds</Text>
          <View style={styles.timer}>
            <Text style={{ color: "white", fontSize: 34 }}>
              {seconds > 9 ? seconds : "0" + seconds}
            </Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          fontSize: 20,
          color: "#343F56",
          textAlign: "center",
          paddingHorizontal: 20,
          marginTop: 20,
        }}
      >
        Your order will be delivered in above time limit
      </Text>
      <View style={styles.deliveryPersonDetailsContainer}>
        <View style={{ alignItems: "center", top: -65 }}>
          <Image
            style={{
              height: 130,
              width: 130,
              borderRadius: 65,
            }}
            source={require("../../../assets/images/profile-pic.jpg")}
          />
          <Text style={{ fontSize: 20, color: "#082032", lineHeight: 40 }}>
            Delivery Person Details:
          </Text>
          <Rating
            onFinishRating={(rating) => {
              console.log(rating);
            }}
            startingValue={4.5}
            style={{
              //   flexDirection: "row",
              //   alignItems: "flex-start",
              marginVertical: 10,
            }}
            jumpValue={0.5}
            fractions
            imageSize={30}
          />
          <Text style={{ fontSize: 20, color: "#082032", lineHeight: 40 }}>
            Henry Michel
          </Text>
          <Text style={{ fontSize: 20, color: "#082032" }}>514-443-3525</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 14,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  timerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
  timer: {
    backgroundColor: THEME_COLOR,
    borderRadius: 20,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  timerTitleText: {
    color: "#343F56",
    fontSize: 24,
    fontWeight: "600",
  },
  deliveryPersonDetailsContainer: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: "#f7f5f5",
    marginTop: 85,
  },
});

export default OrderScreen;
