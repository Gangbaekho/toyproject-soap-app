import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import CartItem from "./CartItem";
import Colors from "../../constants/Colors";

const OrderItem = (props) => {
  return (
    <View style={styles.orderItem}>
      <View style={styles.summaray}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button color={Colors.primary} title="Show Details" />
    </View>
  );
};
const styles = StyleSheet.create({
  orderItem: {
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888",
  },
});

export default OrderItem;
