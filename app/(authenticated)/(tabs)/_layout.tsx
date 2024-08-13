import React from "react";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Header from "@/components/Header";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

export default function _layout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor={Colors.dark} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.dark,
          tabBarBackground: () => (
            <BlurView
              intensity={25}
              style={styles.blurContainer}
              tint="light"
            />
          ),
          tabBarStyle: styles.tabBarStyles,
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
    </>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  tabBarStyles: {
    backgroundColor: "transparent",
    position: "absolute",
    borderTopWidth: 0,
  },
});
