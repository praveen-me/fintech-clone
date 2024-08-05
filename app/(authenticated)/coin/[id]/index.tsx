import {
  View,
  Text,
  SectionList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useCallback } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import { useCryptoStore } from "@/store/cryptoStore";
import Colors from "@/constants/Colors";
import RenderSectionHeader from "@/containers/Coin/RenderSectionHeader";
import RenderListHeader from "@/containers/Coin/RenderListHeader";
import RenderItem from "@/containers/Coin/RenderItem";

export default function Page() {
  const { id } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const { cryptoInfo, getCryptoInfo } = useCryptoStore();

  const currentCoinInfo = getCryptoInfo(id as string);

  if (!id) return null;

  const _renderSectionHeader = useCallback(() => <RenderSectionHeader />, []);
  const _renderListHeader = useCallback(
    () => <RenderListHeader currency={currentCoinInfo} />,
    [currentCoinInfo]
  );
  const _renderItem = useCallback(
    () => <RenderItem description={currentCoinInfo.description} />,
    [currentCoinInfo]
  );

  return (
    <>
      <Stack.Screen options={{ title: currentCoinInfo.name }} />
      <SectionList
        contentInsetAdjustmentBehavior="automatic"
        keyExtractor={(item) => item.name}
        sections={[{ title: "Overview", data: [currentCoinInfo] }]}
        renderSectionHeader={_renderSectionHeader}
        renderItem={_renderItem}
        style={{ marginTop: headerHeight }}
        ListHeaderComponent={_renderListHeader}
      />
    </>
  );
}

const styles = StyleSheet.create({});
