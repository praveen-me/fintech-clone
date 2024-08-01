import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

interface IconButtonProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  textColor?: string;
  background?: string;
  iconColor?: string;
}

export default function IconButton(props: IconButtonProps) {
  const { title, icon, textColor } = props;

  const color = textColor || "#fff";
  const backgroundColor = props.background || Colors.primary;
  const iconColor = props.iconColor || "#fff";

  return (
    <TouchableOpacity
      style={[
        defaultStyles.pillButtonSmall,
        styles.container,
        { backgroundColor },
      ]}
    >
      <Ionicons name={icon} size={24} color={iconColor} />
      <Text style={[defaultStyles.buttonText, { color: color }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
  },
});
