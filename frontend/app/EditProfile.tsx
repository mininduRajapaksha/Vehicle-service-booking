import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function EditProfile() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    telPhone: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      setForm({
        firstName: parsed.firstName,
        lastName: parsed.lastName,
        telPhone: parsed.telPhone,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch("http://192.168.1.3:5000/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ update local storage
        await AsyncStorage.setItem("user", JSON.stringify(data.user));

        Alert.alert("Success", "Profile updated");

        router.back();
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (err) {
      Alert.alert("Error", "Update failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TextInput
        placeholder="First Name"
        value={form.firstName}
        onChangeText={(text) =>
          setForm({ ...form, firstName: text })
        }
        style={styles.input}
      />

      <TextInput
        placeholder="Last Name"
        value={form.lastName}
        onChangeText={(text) =>
          setForm({ ...form, lastName: text })
        }
        style={styles.input}
      />

      <TextInput
        placeholder="Phone"
        value={form.telPhone}
        onChangeText={(text) =>
          setForm({ ...form, telPhone: text })
        }
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});