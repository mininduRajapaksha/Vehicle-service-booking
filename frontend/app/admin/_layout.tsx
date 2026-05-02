import { Tabs } from "expo-router";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
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
        name="services" 
        options={{ 
          title: "Service",
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
      <Tabs.Screen
        name="AddServices"
        options={{
          href:null
        }}
      />
      <Tabs.Screen
        name="EditService/[serviceId]"
        options={{
          href:null
        }}
      />
    </Tabs>
  );
}