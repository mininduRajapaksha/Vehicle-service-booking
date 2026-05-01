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

      const response = await fetch("http://192.168.1.3:5000/auth/login", {
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
      <Text style={styles.title}>Log in</Text>

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
          <Text style={styles.buttonText}>Log in</Text>
        )}
      </TouchableOpacity>

      {/* Register Link */}
      <TouchableOpacity onPress={() => router.push("/register")}>        
        <Text style={styles.link}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    marginBottom: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 12,
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