import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", onPress: () => {}, style: "cancel" },
        {
          text: "Logout",
          onPress: async () => {
            try {
              setLoading(true);
              // Clear AsyncStorage
              await AsyncStorage.removeItem("token");
              await AsyncStorage.removeItem("role");
              await AsyncStorage.removeItem("user");
              
              Alert.alert("Success", "Logged out successfully");
              
              // Navigate back to login
              router.replace("/login");
            } catch (err) {
              console.log("Error during logout:", err);
              Alert.alert("Error", "Failed to logout");
            } finally {
              setLoading(false);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Vehicle Service Booking
        </Text>
        <TouchableOpacity
          onPress={handleLogout}
          disabled={loading}
          style={{
            backgroundColor: "#ff5252",
            paddingVertical: 10,
            paddingHorizontal: 14,
            borderRadius: 8,
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          <MaterialCommunityIcons name="logout" size={18} color="white" />
          <Text style={{ color: "white", fontWeight: "600", fontSize: 13 }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
