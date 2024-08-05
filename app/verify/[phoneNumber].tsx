import { View, Text, Platform, StyleSheet, Alert } from "react-native";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from "@clerk/clerk-expo";

const CELL_COUNT = 6;

export default function Page() {
  const { phoneNumber, signin } = useLocalSearchParams<{
    phoneNumber: string;
    signin: string;
  }>();
  const [verificationCode, setVerificationCode] = useState("");
  const { signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();

  const ref = useBlurOnFulfill({
    value: verificationCode,
    cellCount: CELL_COUNT,
  });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: verificationCode,
    setValue: setVerificationCode,
  });

  useEffect(() => {
    if (verificationCode.length === 6) {
      if (signin === "true") {
        verifySignInCode();
      } else {
        verifyVerificationCode();
      }
    }
  }, [verificationCode]);

  const verifyVerificationCode = useCallback(async () => {
    try {
      await signUp!.attemptPhoneNumberVerification({
        code: verificationCode,
      });

      await setActive!({ session: signUp!.createdSessionId });
    } catch (e) {
      if (isClerkAPIResponseError(e)) {
        Alert.alert("Error", e.errors[0].message);
      }
    }
  }, [verificationCode]);

  const verifySignInCode = useCallback(async () => {
    try {
      await signIn!.attemptFirstFactor({
        strategy: "phone_code",
        code: verificationCode,
      });

      await setActive!({ session: signIn!.createdSessionId });
    } catch (e) {
      if (isClerkAPIResponseError(e)) {
        Alert.alert("Error", e.errors[0].message);
      }
    }
  }, [verificationCode]);

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>6-digit code</Text>

      <Text style={defaultStyles.descriptionText}>
        Code sent to {phoneNumber} unless you already have an account
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={verificationCode}
        onChangeText={setVerificationCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => {
          return (
            <Fragment key={index}>
              <View
                style={styles.cell}
                onLayout={getCellOnLayoutHandler(index)}
              >
                <Text
                  key={index}
                  style={[styles.cellText, isFocused && styles.focusCell]}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
              {index === 2 ? <View style={styles.separator} /> : null}
            </Fragment>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: "auto",
    marginRight: "auto",
    gap: 12,
  },
  cell: {
    width: 45,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  cellText: {
    color: "#000",
    fontSize: 36,
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
  separator: {
    height: 2,
    width: 10,
    backgroundColor: Colors.gray,
    alignSelf: "center",
  },
});
