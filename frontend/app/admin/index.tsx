import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function AdminScreen() {
  const router = useRouter();

  const logout = async () => {
    await AsyncStorage.clear();
    router.replace("/login");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Admin Dashboard</Text>

      <Button title="Logout" onPress={logout} />
    </View>
  );
}