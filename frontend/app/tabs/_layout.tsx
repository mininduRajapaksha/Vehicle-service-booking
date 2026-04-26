import { Tabs } from "expo-router";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs>
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
        name="Services" 
        options={{ 
          title: "Services",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          )
        }} 
      />
      <Tabs.Screen 
        name="AddServices" 
        options={{ 
          title: "Add Service",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" color={color} size={size} />
          )
        }} 
      />
    </Tabs>
  );
}