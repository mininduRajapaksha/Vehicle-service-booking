import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>

      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          )
        }} 
      />

      <Tabs.Screen 
        name="services/index"
        options={{ 
          title: "Services",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          )
        }} 
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Hide details */}
      <Tabs.Screen
        name="services/[serviceId]"
        options={{
          href: null,
        }}
      />

    </Tabs>
  );
}