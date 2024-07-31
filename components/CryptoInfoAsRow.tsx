import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import Colors from "@/constants/Colors";

type CryptoInfoAsRowProps = {
  id: number;
  name: string;
  symbol: string;
  price: number;
  change_1h: number;
  logo: string;
};

export default function CryptoInfoAsRow(props: CryptoInfoAsRowProps) {
  const { logo, price, change_1h, name, symbol } = props;

  const isPriceFall = useMemo(() => change_1h < 0, [change_1h]);

  const priceIndicatorColor = useMemo(() => {
    return isPriceFall ? "red" : "green";
  }, [isPriceFall]);

  return (
    <TouchableOpacity style={styles.root}>
      <Image source={logo} style={styles.image} />

      <View style={styles.symbolWrapper}>
        <Text style={styles.symbolName}>{name}</Text>
        <Text style={styles.symbol}>{symbol}</Text>
      </View>
      <View style={styles.priceWrapper}>
        <Text>{price.toFixed(2)} ₹</Text>
        <View style={styles.priceIndicatorWrapper}>
          <Ionicons name="caret-up" size={16} color={priceIndicatorColor} />
          <Text style={{ color: priceIndicatorColor }}>
            {change_1h.toFixed(2)}₹
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  symbolName: {
    fontWeight: "600",
    color: Colors.dark,
  },
  symbol: {
    color: Colors.gray,
  },
  symbolWrapper: {
    flex: 1,
    gap: 6,
  },
  priceWrapper: {
    gap: 6,
    alignItems: "flex-end",
  },
  priceIndicatorWrapper: {
    flexDirection: "row",
    gap: 4,
  },
});
