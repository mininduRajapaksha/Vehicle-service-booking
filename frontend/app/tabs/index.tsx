import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text,StyleSheet } from "react-native";
  
export default function Home() {

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
    </View>
  );
}

const styles =StyleSheet.create({
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

})
