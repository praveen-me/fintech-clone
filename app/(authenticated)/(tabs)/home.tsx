import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import RoundButton from "@/components/RoundButton";
import Dropdown from "@/components/Dropdown";

const items = [
  { key: "statement", icon: "list.bullet.rectangle.fill", title: "Statement" },
  {
    key: "converter",
    icon: "coloncurrencysign.arrow.circlepath",
    title: "Converter",
  },
  { key: "background", icon: "photo.fill", title: "Background" },
  {
    key: "account",
    icon: "plus.rectangle.on.folder.fill",
    title: "Add new account",
  },
];

export default function Page() {
  const balance = 1500;

  const TriggerComponent = () => {
    return <RoundButton icon="menu" text="Menu" onPress={() => {}} />;
  };

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
        <Dropdown TriggerComponent={TriggerComponent} list={items} />
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
