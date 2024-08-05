import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function Header() {
  const { top } = useSafeAreaInsets();

  return (
    <BlurView intensity={80} tint="extraLight" style={{ paddingTop: top }}>
      <View style={styles.container}>
        <Link
          asChild
          href={"/(authenticated)/(modals)/account"}
          style={[
            styles.roundBtn,
            {
              backgroundColor: Colors.gray,
            },
          ]}
        >
          <TouchableOpacity>
            <Text style={{ color: "#fff", fontWeight: "500", fontSize: 16 }}>
              FT
            </Text>
          </TouchableOpacity>
        </Link>
        <View style={styles.searchWrapper}>
          <Ionicons
            name="search"
            size={24}
            color={Colors.dark}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor={Colors.dark}
            style={styles.searchInput}
          />
        </View>
        <View style={[styles.roundBtn, { backgroundColor: Colors.lightGray }]}>
          <Ionicons name="stats-chart" size={20} color={Colors.dark} />
        </View>
        <View style={[styles.roundBtn, { backgroundColor: Colors.lightGray }]}>
          <Ionicons name="card" size={20} color={Colors.dark} />
        </View>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    height: 60,
    paddingHorizontal: 20,
  },
  roundBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  searchWrapper: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    paddingLeft: 0,
  },
  searchIcon: {
    padding: 10,
  },
});
