import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV({
  id: "user-inactivity",
});

export const UserInactivityProvider = ({ children }: any) => {
  const appState = useRef(AppState.currentState);
  const router = useRouter();

  const { isSignedIn } = useAuth();

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    const isAppInactive =
      nextAppState === "background" || nextAppState === "inactive";

    if (isSignedIn) {
      if (isAppInactive) {
        storage.set("inActivityTimestamp", Date.now());
      } else if (!isAppInactive) {
        const lastTimeStamp = storage.getNumber("inActivityTimestamp") || 0;

        if (Date.now() - lastTimeStamp > 5 * 60 * 1000) {
          router.replace("/(authenticated)/(modals)/lock");
        }
        storage.delete("inActivityTimestamp");
      }
    }

    appState.current = nextAppState;
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return children;
};
