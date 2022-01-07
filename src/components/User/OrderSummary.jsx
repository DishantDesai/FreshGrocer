import React from "react";
import { View, Text } from "react-native";
import { TAX_CHARGE, DELIVERY_CHARGE } from "../../utils/constants";

const OrderSummary = ({ cartTotal }) => {
  return (
    <View style={{ marginTop: 40 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#9D9998", lineHeight: 25 }}>Cart Total</Text>
        <Text style={{ color: "#9D9998", lineHeight: 25 }}>${cartTotal}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#9D9998", lineHeight: 25 }}>Tax</Text>
        <Text style={{ color: "#9D9998", lineHeight: 25 }}>
          ${Math.round(TAX_CHARGE * cartTotal * 100) / 100}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#9D9998", lineHeight: 25 }}>Delivery</Text>
        <Text style={{ color: "#9D9998", lineHeight: 25 }}>
          ${DELIVERY_CHARGE}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#9D9998", lineHeight: 25 }}>
          Promotion Discount
        </Text>
        <Text style={{ color: "#9D9998", lineHeight: 25 }}>$0.00</Text>
      </View>
      <View
        style={{
          borderBottomColor: "#9D9998",
          borderBottomWidth: 1,
          marginVertical: 16,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#9D9998", lineHeight: 25 }}>Subtotal</Text>
        <Text
          style={{
            color: "#9D9998",
            lineHeight: 25,
            fontWeight: "bold",
          }}
        >
          $
          {Math.round(
            (TAX_CHARGE * cartTotal + DELIVERY_CHARGE + cartTotal) * 100
          ) / 100}
        </Text>
      </View>
    </View>
  );
};

export default OrderSummary;
