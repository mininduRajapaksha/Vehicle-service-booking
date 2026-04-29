import { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const token = await AsyncStorage.getItem("token");
    const role = await AsyncStorage.getItem("role");

    if (token) {
      if (role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/tabs");
      }
    } else {
      // show UI
      setLoading(false);
    }
  };

  // 🔄 While checking login
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 🏠 Home Screen UI (before login)
  return (
    <View style={styles.container}>
    <View style={styles.topSection}>
      
      {/* Logo */}
      <Image
        source={require("../assets/images/carHome.jpg")} // change if needed
        style={styles.logo}
      />

      {/* Title */}
      <Text style={styles.title}>Vehicle Service App</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Book your vehicle service easily and quickly
      </Text>

      </View>
      
      <View style={styles.bottomSection}>
      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.logbtnText}>Login</Text>
      </TouchableOpacity>

      {/* Register Button */}
      <TouchableOpacity
        style={styles.registerBtn}
        onPress={() => router.push("/register")}
      >
        <Text style={styles.regbtnText}>Sign Up</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  topSection: {
    backgroundColor: "#011C3A",
    marginTop:0,
    marginBottom: 30,
    alignItems: "center",
    padding: 20,
    borderBottomEndRadius:20,
    borderBottomStartRadius:20,
  },
    bottomSection: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-end",
    marginBottom: 30,
    alignItems: "center",
    },

  logo: {
    // width: 120,
    maxWidth: "100%",
    maxHeight:"100%",
    height: 120,
    marginTop:50,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#f6f6f6",
  },

  subtitle: {
    fontSize: 16,
    color: "#f6f6f6",
    textAlign: "center",
    marginBottom: 15,
  },

  loginBtn: {
    width: "100%",
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },

  registerBtn: {
    width: "100%",
    // backgroundColor: "#2196F3",
    backgroundColor: "#edf2f5",
    borderColor:"#2196F3",
    borderWidth:2,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },

  regbtnText: {
    // color: "#fff",
    color:"#2196F3",
    fontSize: 16,
    fontWeight: "bold",
  },

  logbtnText:{
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  }
});