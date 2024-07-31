import { View, Text } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import { useCryptoStore } from "@/store/cryptoStore";

export default function Page() {
  const { id } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const { cryptoInfo, getCryptoInfo } = useCryptoStore();

  const currentCoinInfo = getCryptoInfo(id as string);

  console.log(currentCoinInfo);

  if (!id) return null;

  return (
    <>
      <Stack.Screen options={{ title: "Bitcoin" }} />
    </>
  );
}
