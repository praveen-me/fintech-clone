import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Header from "@/components/Header";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarBackground: () => (
          <BlurView
            intensity={50}
            style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.05)" }}
          />
        ),
        tabBarStyle: {
          backgroundColor: "transparent",
          position: "absolute",
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="registered" size={size} color={color} />
          ),
          header: () => <Header />,
        }}
      />
      <Tabs.Screen
        name="invest"
        options={{
          title: "Invest",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="line-chart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transfers"
        options={{
          title: "Transfers",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="exchange" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="crypto"
        options={{
          title: "Crypto",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="bitcoin" size={size} color={color} />
          ),
          header: () => <Header />,
        }}
      />
      <Tabs.Screen
        name="lifestyle"
        options={{
          title: "Transfers",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="th" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
