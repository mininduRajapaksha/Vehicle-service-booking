import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";


export default function Layout() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const token = await AsyncStorage.getItem("token");
    const role = await AsyncStorage.getItem("role");

    if (!token) {
      setInitialRoute("login");
    } else if (role === "admin") {
      setInitialRoute("admin");
    } else {
      setInitialRoute("(tabs)");
    }
  };

  if (!initialRoute) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="tabs" />
      <Stack.Screen name="admin" />
    </Stack>
  );
}