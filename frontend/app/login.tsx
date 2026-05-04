import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("https://vehicle-service-booking-dpzu.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token + role
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("role", data.role);

        if (data.user) {await AsyncStorage.setItem("user", JSON.stringify(data.user));
  }

        Alert.alert("Success", "Login successful");

        // Navigate based on role
        if (data.role === "admin") {
          router.replace("/admin");
        } else {
          router.replace("/tabs");
        }

      } else {
        Alert.alert("Error", data.message || "Login failed");
      }

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Sign in to continue
        </Text>
      </View>

    <View style={styles.form}>
      <Text style={styles.formTitle}>Sign in</Text>

      {/* Email */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign in</Text>
        )}
      </TouchableOpacity>

      {/* Register Link */}
      <TouchableOpacity onPress={() => router.push("/register")}>        
        <Text style={styles.link}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },

  topSection: {
    backgroundColor: "#011C3A",
    marginBottom: 30,
    height: 150,
    justifyContent:"center",
    alignItems: "center",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },

  backBtn: {
    position: "absolute",
    left: 15,
    top: 50,
    zIndex: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    justifyContent:"center",
    color: "#f6f6f6",
  },
  subtitle: {
    fontSize: 16,
    color: "#cfd8dc",
    marginTop: 10,
  },
  form:{
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  formTitle:{
    color:"#011C3A",
    fontWeight:"bold",
    fontSize:26,
    marginBottom:20,
    marginLeft:5
  },

  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 15,
    borderRadius: 12,
    borderColor: "#ccc",
  },
  button: {
    // backgroundColor: "#4CAF50",
    backgroundColor:"#011C3A",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    marginLeft:5,
    textAlign: 'left',
    color: "#2196F3",
    fontWeight: "600",
  },
});