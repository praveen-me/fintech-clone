import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useAssets } from "expo-asset";
import { defaultStyles } from "@/constants/Styles";
import { ResizeMode, Video } from "expo-av";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";

export default function Page() {
  const [assets] = useAssets([require("@/assets/videos/fintech_intro.mp4")]);

  return (
    <View style={defaultStyles.screen}>
      {assets && (
        <Video
          resizeMode={ResizeMode.COVER}
          source={{ uri: assets[0].uri }}
          style={StyleSheet.absoluteFill}
          isMuted
          shouldPlay
          isLooping
        />
      )}
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>Ready to change the way you money?</Text>
      </View>

      <View style={styles.headerButtons}>
        <Link
          href="/login"
          style={[defaultStyles.pillButton, styles.loginBtnWrapper]}
          asChild
        >
          <TouchableOpacity>
            <Text style={styles.logInText}>Login In</Text>
          </TouchableOpacity>
        </Link>
        <Link
          href={"/signup"}
          style={[defaultStyles.pillButton, styles.signBtnWrapper]}
          asChild
        >
          <TouchableOpacity>
            <Text style={styles.signUpText}>Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    marginTop: 100,
  },
  header: {
    fontSize: 36,
    textTransform: "uppercase",
    fontWeight: "900",
    color: "white",
  },
  headerButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    alignItems: "flex-end",
    marginBottom: 50,
  },
  logInText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "500",
  },
  signUpText: {
    fontSize: 22,
    fontWeight: "500",
  },
  loginBtnWrapper: { backgroundColor: Colors.dark, flex: 1 },
  signBtnWrapper: { backgroundColor: "#fff", flex: 1 },
});
