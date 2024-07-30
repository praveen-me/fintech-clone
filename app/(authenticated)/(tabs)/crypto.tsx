import { View, Text } from "react-native";
import React, { useEffect, useMemo } from "react";
import { getCryptoInfo, getCryptoListing } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { CMCStatus, CryptoInfo, Currency } from "@/@types";
import { CURRENCIES_LISTING_MOCK_DATA } from "@/mockData/listing";
import { CRYPTO_INFO_MOCK_DATA } from "@/mockData/cryptoInfo";

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
  });

  if (isLoading) return;

  console.log(JSON.stringify(currenciesInfo));

  return (
    <View>
      {currencies?.data?.map((c) => (
        <Text>{c.name}</Text>
      ))}
    </View>
  );
}
