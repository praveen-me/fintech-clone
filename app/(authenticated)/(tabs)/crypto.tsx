import { View, Text, ScrollView } from "react-native";
import React, { useMemo } from "react";
import { getCryptoInfo, getCryptoListing } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { CMCStatus, CryptoInfo, Currency } from "@/@types";
import { CURRENCIES_LISTING_MOCK_DATA } from "@/mockData/listing";
import { CRYPTO_INFO_MOCK_DATA } from "@/mockData/cryptoInfo";
import { defaultStyles } from "@/constants/Styles";

import CryptoInfoAsRow from "@/components/CryptoInfoAsRow";
import { useCryptoStore } from "@/store/cryptoStore";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function Page() {
  const { setCryptoInfo } = useCryptoStore();
  const tabBarHeight = useBottomTabBarHeight();

  const { data: currencies, isLoading } = useQuery<{
    status: CMCStatus;
    data: Currency[];
  }>({
    queryKey: ["crypto-listing"],
    // queryFn: () => getCryptoListing(50).then((res) => res.data),
    queryFn: () =>
      new Promise((resolve) => resolve(CURRENCIES_LISTING_MOCK_DATA)),
  });

  const ids = useMemo(
    () => currencies?.data?.map((c) => c.id).join(",") || "",
    [currencies?.data]
  );

  const { isLoading: isQueryInfoLoading, data: currenciesInfo } = useQuery<{
    status: CMCStatus;
    data: CryptoInfo[];
  }>({
    queryKey: ["query-info"],
    // queryFn: () => getCryptoInfo(ids).then((res) => res.data),
    queryFn() {
      return new Promise((resolve) => {
        setCryptoInfo(CRYPTO_INFO_MOCK_DATA);
        resolve(CRYPTO_INFO_MOCK_DATA);
      });
    },
    enabled: Boolean(ids),
  });

  if (isLoading) return;

  const quote = "INR";

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: tabBarHeight + 20 }}>
      <Text style={defaultStyles.sectionHeader}>Latest Crypto</Text>
      <View style={defaultStyles.block}>
        {currencies?.data?.map((c) => (
          <CryptoInfoAsRow
            key={c.id}
            id={c.id}
            name={c.name}
            symbol={c.symbol}
            price={c.quote[quote].price}
            change_1h={c.quote[quote].percent_change_1h}
            logo={currenciesInfo?.data[c.id].logo!}
          />
        ))}
      </View>
    </ScrollView>
  );
}
