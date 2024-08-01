import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { CryptoInfo } from "@/@types";
import { Image } from "expo-image";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import IconButton from "@/components/IconButton";

interface RenderListHeaderProps {
  currency: CryptoInfo;
}

const RenderListHeader = (props: RenderListHeaderProps) => {
  const { currency } = props;

  return (
    <>
      <View style={styles.topInfoContainer}>
        <Text style={styles.subtitle}>{currency.symbol}</Text>
        <Image source={currency.logo} style={styles.logo} />
      </View>

      <View style={styles.actionBtnWrapper}>
        <IconButton
          icon="add"
          title="Buy"
          textColor="#fff"
          background={Colors.primary}
          iconColor="#fff"
        />
        <IconButton
          icon="arrow-back"
          title="Receive"
          textColor={Colors.primary}
          background={Colors.primaryMuted}
          iconColor={Colors.primary}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
  },
  logo: {
    height: 60,
    width: 60,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.gray,
  },
  actionBtnWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    margin: 12,
  },
});

export default RenderListHeader;
