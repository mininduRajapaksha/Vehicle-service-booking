import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      
      {/* Entry point */}
      <Stack.Screen name="index" />

      {/* Public (before login) */}
      <Stack.Screen name="(publicTabs)" />

      {/* Auth screens */}
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />

      {/* After login */}
      <Stack.Screen name="tabs" />
      <Stack.Screen name="admin" />

    </Stack>
    
  );
}