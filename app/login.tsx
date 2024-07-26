import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useCallback, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

import { Ionicons } from "@expo/vector-icons";
import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from "@clerk/clerk-expo";
import { SignInFactor } from "@clerk/types";
import { useRouter } from "expo-router";

enum LoginType {
  PHONE,
  APPLE,
  GOOGLE,
  EMAIL,
}

interface ISignInButtonProps {
  onPress: (type: LoginType) => void;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  loginType: LoginType;
}

const SignInButton = (props: ISignInButtonProps) => (
  <TouchableOpacity
    onPress={() => props.onPress(props.loginType)}
    style={[defaultStyles.pillButton, styles.loginTypeBtn]}
  >
    <Ionicons name={props.icon} size={24} color={Colors.dark} />
    <Text>{props.title}</Text>
  </TouchableOpacity>
);

export default function SignUp() {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  const { signIn } = useSignIn();

  const loginUser = useCallback(async (type: LoginType) => {
    if (type === LoginType.PHONE) {
      try {
        const fullPhoneNumber = countryCode + phoneNumber;

        const { supportedFirstFactors } = await signIn!.create({
          identifier: fullPhoneNumber,
        });

        const firstPhoneFactor = supportedFirstFactors.find(
          (factor: SignInFactor) => factor.strategy === "phone_code"
        );

        const { phoneNumberId } = firstPhoneFactor!;

        await signIn?.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId,
        });

        router.push({
          pathname: "/verify/[phoneNumber]",
          params: {
            phoneNumber: fullPhoneNumber,
          },
        });
      } catch (e) {
        console.log(e);

        if (isClerkAPIResponseError(e)) {
          if (e.errors[0].code === "form_identifier_not_found") {
            Alert.alert("Error", e.errors[0].message);
          }
        }
      }
    }
  }, []);

  return (
    <KeyboardAvoidingView style={defaultStyles.flex1} behavior="padding">
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome back!</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter the phone number associated with your account
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Country Code"
            placeholderTextColor={Colors.gray}
            value={countryCode}
          />
          <TextInput
            style={[styles.input, defaultStyles.flex1]}
            placeholder="Mobile number"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <TouchableOpacity
          onPress={() => loginUser(LoginType.PHONE)}
          style={[
            defaultStyles.pillButton,
            { marginBottom: 20 },
            phoneNumber !== "" ? styles.enabled : styles.disabled,
          ]}
        >
          <Text style={defaultStyles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.gray,
              flex: 1,
            }}
          />
          <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.gray,
              flex: 1,
            }}
          />
        </View>

        <SignInButton
          icon="mail"
          title="Continue with email"
          onPress={() => {}}
          loginType={LoginType.EMAIL}
        />
        <SignInButton
          icon="logo-google"
          title="Continue with google"
          onPress={() => {}}
          loginType={LoginType.GOOGLE}
        />
        <SignInButton
          icon="logo-apple"
          title="Continue with apple"
          onPress={() => {}}
          loginType={LoginType.APPLE}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: "row",
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
  loginTypeBtn: {
    flexDirection: "row",
    gap: 16,
    marginTop: 20,
    backgroundColor: "#fff",
  },
});
