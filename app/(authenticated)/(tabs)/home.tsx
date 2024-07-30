import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import Colors from "@/constants/Colors";
import RoundButton from "@/components/RoundButton";
import Dropdown from "@/components/Dropdown";
import { defaultStyles } from "@/constants/Styles";
import { useBalanceStore } from "@/store/balanceStore";
import { Ionicons } from "@expo/vector-icons";
import { transactionTitle } from "@/constants/randomTransaction";
import { useHeaderHeight } from "@react-navigation/elements";

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
  const headerHeight = useHeaderHeight();

  const { transactions, balance, runTransaction, clearTransactions } =
    useBalanceStore();

  const TriggerComponent = () => {
    return <RoundButton icon="menu" text="Menu" onPress={() => {}} />;
  };

  const handleAddMoney = useCallback(() => {
    const randomTitleIndex = Math.floor(Math.random() * 100);

    runTransaction({
      id: Date.now().toString(),
      date: new Date(),
      amount: Math.floor(Math.random() * 1000) - 300,
      title: transactionTitle[randomTitleIndex],
    });
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{ paddingTop: headerHeight }}
    >
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance()}</Text>
          <Text style={styles.currency}>₹</Text>
        </View>
      </View>
      <View style={styles.actionRow}>
        <RoundButton icon="add" text="Add money" onPress={handleAddMoney} />
        <RoundButton icon="remove" text="Delete" onPress={clearTransactions} />
        <RoundButton icon="refresh" text="Exchange" onPress={() => {}} />
        <RoundButton icon="list" text="Details" onPress={() => {}} />
        <Dropdown TriggerComponent={TriggerComponent} list={items} />
      </View>

      <Text style={defaultStyles.sectionHeader}>Transactions</Text>
      <View style={styles.transactions}>
        {(transactions.length > 0 &&
          transactions.map((transaction, index) => {
            return (
              <View
                key={transaction.id}
                style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
              >
                <View style={styles.circle}>
                  <Ionicons
                    name={transaction.amount > 0 ? "add" : "remove"}
                    size={24}
                    color={Colors.dark}
                  />
                </View>
                <View style={defaultStyles.flex1}>
                  <Text style={{ fontWeight: "400" }}>{transaction.title}</Text>
                  <Text style={{ color: Colors.gray, fontSize: 12 }}>
                    {transaction.date.toLocaleString()}
                  </Text>
                </View>
                <Text>₹{transaction.amount}</Text>
              </View>
            );
          })) || <Text style={styles.noTransactions}>No transactions</Text>}
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
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    gap: 20,
  },
  noTransactions: {
    padding: 14,
    color: Colors.gray,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
});
