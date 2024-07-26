import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useCallback, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Link, router } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";

export default function SignUp() {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { signUp } = useSignUp();

  const signUpUser = useCallback(async () => {
    const fullPhoneNumber = countryCode + phoneNumber;

    try {
      await signUp?.create({ phoneNumber: fullPhoneNumber });
      await signUp?.preparePhoneNumberVerification();
      router.push({
        pathname: "/verify/[phoneNumber]",
        params: {
          phoneNumber: fullPhoneNumber,
        },
      });
    } catch (error) {
      console.log("Error signing up:", error);
    }
  }, [countryCode, phoneNumber]);

  return (
    <KeyboardAvoidingView style={defaultStyles.flex1} behavior="padding">
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Let's get started!</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your phone number. We will send you a confirmation code there
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

        <Link href="/login" replace asChild>
          <TouchableOpacity>
            <Text style={defaultStyles.textLink}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </Link>

        <View style={defaultStyles.flex1} />

        <TouchableOpacity
          onPress={signUpUser}
          style={[
            defaultStyles.pillButton,
            styles.signUpBtn,
            phoneNumber !== "" ? styles.enabled : styles.disabled,
          ]}
        >
          <Text style={defaultStyles.buttonText}>Sign up</Text>
        </TouchableOpacity>
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
  signUpBtn: {
    marginVertical: 20,
  },
});
