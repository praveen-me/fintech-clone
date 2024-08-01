import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

interface RenderItemProps {
  description: string;
}

const RenderItem = (props: RenderItemProps) => {
  const { description } = props;

  return (
    <View style={[defaultStyles.block, { marginTop: 20 }]}>
      <Text style={defaultStyles.subtitle}>Overview</Text>
      <Text style={{ color: Colors.gray }}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default RenderItem;
