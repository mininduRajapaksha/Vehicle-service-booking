import { View, Text,StyleSheet} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function AdminScreen() {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
  loadUser();
  }, []);

const loadUser = async () => {
  const storedUser = await AsyncStorage.getItem("user");

  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
};
  return (
    <View>
      <View style={styles.topSection}>
        <Text style={styles.title}>
           Hello! {user?.firstName || "User"}
        </Text>
      </View>

      <Text>Admin Dashboad</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    topSection: {
    backgroundColor: "#011C3A",
    marginBottom: 30,
    height: 200,
    justifyContent:"center",
    alignItems: "center",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    justifyContent:"center",
    color: "#f6f6f6",
  },
});