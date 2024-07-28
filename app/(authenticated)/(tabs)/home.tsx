import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import RoundButton from "@/components/RoundButton";

export default function Page() {
  const balance = 1500;

  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance}</Text>
          <Text style={styles.currency}>₹</Text>
        </View>
      </View>
      <View style={styles.actionRow}>
        <RoundButton icon="add" text="Add money" onPress={() => {}} />
        <RoundButton icon="refresh" text="Exchange" onPress={() => {}} />
        <RoundButton icon="list" text="Details" onPress={() => {}} />
        <RoundButton icon="pulse" text="Pulse" onPress={() => {}} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  account: {
    margin: 80,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 10,
  },
  balance: {
    fontSize: 50,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 20,
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
});
