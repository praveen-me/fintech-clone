import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

import { MotiView } from "moti";

import Colors from "@/constants/Colors";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
const { width } = Dimensions.get("window");

const dialpad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "del"];

const dialPadSize = width * 0.2;
const dialPadTextSize = dialPadSize * 0.4;
const _spacing = 20;

const pinLength = 6;
const pinContainerSize = width / 2;
const pinSpacing = 10;
const pinMaxSize = pinContainerSize / pinLength;
const pinSize = pinMaxSize - pinSpacing;

const primaryColor = "#f2f2f2";

const _colors = {
  primary: primaryColor,
  secondaryColor: Colors.dark,
};

const OFFSET = 40;
const TIME = 80;

interface IDialPadProps {
  onPress: (item: (typeof dialpad)[number]) => void;
}

function RenderItem({
  item,
  onPress,
}: {
  item: string | number;
  onPress: (item: (typeof dialpad)[number]) => void;
}) {
  return (
    <TouchableOpacity
      style={styles.dialBtn}
      onPress={() => onPress(item)}
      disabled={!item}
    >
      <Text style={styles.dialPadText}>{item}</Text>
    </TouchableOpacity>
  );
}

function DialPad(props: IDialPadProps) {
  return (
    <FlatList
      data={dialpad}
      numColumns={3}
      style={{ flexGrow: 0 }}
      columnWrapperStyle={{ gap: _spacing }}
      contentContainerStyle={{ gap: _spacing }}
      scrollEnabled={false}
      renderItem={({ item }) => (
        <RenderItem item={item} onPress={props.onPress} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

interface IRenderPinProps {
  selected: boolean;
}
function RenderPin(props: IRenderPinProps) {
  return (
    <MotiView
      style={styles.pin}
      animate={{
        height: props.selected ? pinSize : 2,
        backgroundColor: props.selected
          ? _colors.secondaryColor
          : `${_colors.secondaryColor}66`,
        marginBottom: props.selected ? pinSize / 2 : 0,
      }}
      transition={{ type: "timing", duration: 200 }}
    />
  );
}

export default function DialPadContainer() {
  const [code, setCode] = useState<number[]>([]);
  const offset = useSharedValue(0);
  const { user } = useUser();

  const handleDialPress = (item: (typeof dialpad)[number]) => {
    if (item === "del") {
      setCode(code.slice(0, -1));
    } else if (typeof item === "number") {
      if (code.length >= pinLength) return;
      setCode([...code, item]);
    }
  };

  useEffect(() => {
    if (code.length === pinLength) {
      if (code.join("") === "137946") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        router.replace("/(authenticated)/(tabs)/home");
      } else {
        offset.value = withSequence(
          withTiming(-OFFSET, { duration: TIME / 2 }),
          withRepeat(withTiming(OFFSET, { duration: TIME }), 5, true),
          withTiming(0, { duration: TIME / 2 }, () => {
            runOnJS(setCode)([]);
          })
        );
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    }
  }, [code]);

  const pinWrapperAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
      flexDirection: "row",
      gap: pinSpacing * 2,
      marginBottom: _spacing * 2,
      height: pinSize * 2,
      alignItems: "flex-end",
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>Welcome Back, {user?.firstName}</Text>
      <Animated.View style={pinWrapperAnimatedStyles}>
        {[...Array(6)].map((_, i) => (
          <RenderPin key={`pin-${i}`} selected={Boolean(code[i])} />
        ))}
      </Animated.View>
      <DialPad onPress={handleDialPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: _colors.primary,
  },
  dialBtn: {
    width: dialPadSize,
    height: dialPadSize,
    justifyContent: "center",
    alignItems: "center",
    borderColor: _colors.secondaryColor,
    borderRadius: dialPadSize / 2,
  },
  dialPadText: {
    fontSize: dialPadTextSize,
    color: _colors.secondaryColor,
  },
  pin: {
    width: pinSize,
    height: pinSize,
    borderRadius: pinSize,
    backgroundColor: _colors.secondaryColor,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    alignSelf: "center",
  },
});
