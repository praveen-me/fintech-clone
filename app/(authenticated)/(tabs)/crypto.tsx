import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo } from "react";
import { getCryptoInfo, getCryptoListing } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { CMCStatus, CryptoInfo, Currency } from "@/@types";
import { CURRENCIES_LISTING_MOCK_DATA } from "@/mockData/listing";
import { CRYPTO_INFO_MOCK_DATA } from "@/mockData/cryptoInfo";
import { defaultStyles } from "@/constants/Styles";
import { Image } from "expo-image";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import CryptoInfoAsRow from "@/components/CryptoInfoAsRow";

const RenderCrypto = () => {
  return <TouchableOpacity></TouchableOpacity>;
};

export default function Page() {
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
    queryFn: () => new Promise((resolve) => resolve(CRYPTO_INFO_MOCK_DATA)),
    enabled: Boolean(ids),
  });

  if (isLoading) return;

  const quote = "INR";

  return (
    <ScrollView>
      <Text style={defaultStyles.sectionHeader}>Latest Crypto</Text>
      <View style={defaultStyles.block}>
        {currencies?.data?.map((c) => (
          <Link href={`/crypto/${c.id}`} asChild>
            <CryptoInfoAsRow
              id={c.id}
              name={c.name}
              symbol={c.symbol}
              price={c.quote[quote].price}
              change_1h={c.quote[quote].percent_change_1h}
              logo={currenciesInfo?.data[c.id].logo!}
            />
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}
