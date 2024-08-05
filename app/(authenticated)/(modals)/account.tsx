import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { BlurView } from "expo-blur";
import { useHeaderHeight } from "@react-navigation/elements";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Image as CompressImage } from "react-native-compressor";
import { getAppIcon, setAppIcon } from "expo-dynamic-app-icon";

const ICONS = [
  {
    name: "Default",
    icon: require("@/assets/images/base-icon.png"),
  },
  {
    name: "Blue",
    icon: require("@/assets/images/light-blue.png"),
  },
  {
    name: "Light",
    icon: require("@/assets/images/light-icon.png"),
  },
];

export default function account() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const headerHeight = useHeaderHeight();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [edit, setEdit] = useState(false);
  const [activeIcon, setActiveIcon] = useState(getAppIcon());

  const onSaveUser = async () => {
    try {
      await user?.update({ firstName, lastName });
      setEdit(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeAppIcon = async (iconName: string) => {
    const result = setAppIcon(iconName.toLowerCase());
    console.log("iconName", result);
    setActiveIcon(iconName);
  };

  // const base64 = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAADMElEQVR4nOzVwQnAIBQFQYXff81RUkQCOyDj1YOPnbXWPmeTRef+/3O/OyBjzh3CD95BfqICMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMO0TAAD//2Anhf4QtqobAAAAAElFTkSuQmCC`;

  const onCaptureImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled) {
        // const base64 = `data:image/png;base64,${result.assets[0].base64}`;

        const fileUri = result.assets[0].uri;
        const compressedImagePath = await CompressImage.compress(fileUri, {
          output: "png",
          quality: 0.1,
          maxHeight: 300,
          maxWidth: 300,
        });

        // Convert compressedImagePath to base64 using FileReader
        const response = await fetch(compressedImagePath);
        const blob = await response.blob();

        // Get base64 from blob
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = () => {
            resolve(reader.result as string);
          };

          reader.onerror = (error) => reject(error);
        });

        console.log(base64.replace("jpeg", "png"));

        const resource = await user?.setProfileImage({
          file: base64,
        });

        console.log({ resource });
      }
    } catch (e) {
      JSON.stringify(e, null, 2);
    }
  };

  return (
    <BlurView
      intensity={80}
      tint="dark"
      style={{
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        paddingTop: headerHeight,
      }}
    >
      <View style={styles.wrapper}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={onCaptureImage}>
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
          </TouchableOpacity>
          <View style={styles.infoRow}>
            <View style={styles.userRow}>
              {edit ? (
                <>
                  <TextInput
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                    style={styles.inputField}
                  />
                  <TextInput
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={setLastName}
                    style={styles.inputField}
                  />
                  <TouchableOpacity
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    onPress={onSaveUser}
                  >
                    <Ionicons
                      name="checkmark-outline"
                      size={26}
                      color={Colors.white}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={{ fontSize: 26, color: Colors.white }}>
                    {firstName} {lastName}
                  </Text>
                  <TouchableOpacity
                    style={{ alignSelf: "flex-end" }}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    onPress={() => setEdit(true)}
                  >
                    <Ionicons name="pencil" size={16} color={Colors.white} />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>

        <View style={styles.actionWrapper}>
          <TouchableOpacity style={styles.btn} onPress={() => signOut()}>
            <Ionicons name="log-out" size={24} color={Colors.white} />
            <Text style={styles.btnText}>Log out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Ionicons name="person" size={24} color={Colors.white} />
            <Text style={styles.btnText}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Ionicons name="bulb" size={24} color={Colors.white} />
            <Text style={styles.btnText}>Learn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Ionicons name="megaphone" size={24} color={Colors.white} />
            <Text style={{ color: Colors.white, fontSize: 18, flex: 1 }}>
              Inbox
            </Text>
            <View
              style={{
                backgroundColor: Colors.primary,
                paddingHorizontal: 10,
                borderRadius: 10,
                justifyContent: "center",
              }}
            >
              <Text style={{ color: Colors.white, fontSize: 12 }}>14</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.actionWrapper}>
          {ICONS.map((icon) => (
            <TouchableOpacity
              key={icon.name}
              style={styles.btn}
              onPress={() => onChangeAppIcon(icon.name)}
            >
              <Image source={icon.icon} style={{ width: 24, height: 24 }} />
              <Text style={styles.btnText}>{icon.name}</Text>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                }}
              >
                {activeIcon.toLowerCase() === icon.name.toLowerCase() && (
                  <Ionicons name="checkmark" size={24} color={Colors.white} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  infoRow: {
    flexDirection: "row",
    gap: 6,
  },
  userRow: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  inputField: {
    width: 140,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 10,
    backgroundColor: Colors.white,
  },
  captureBtn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.gray,
  },
  actionWrapper: {
    backgroundColor: "rgba(256, 256, 256, 0.1)",
    borderRadius: 16,
    gap: 0,
    margin: 20,
  },
  btn: {
    padding: 14,
    flexDirection: "row",
    gap: 20,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
  },
});
