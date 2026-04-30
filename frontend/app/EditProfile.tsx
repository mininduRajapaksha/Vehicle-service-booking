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
    email: "",
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      setForm({
        firstName: parsed.firstName || "",
        lastName: parsed.lastName || "",
        telPhone: parsed.telPhone || "",
        email: parsed.email || "",
      });
    }
  };

  // 🔍 Real-time validation
  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "firstName" && !value.trim()) {
      error = "First name required";
    }

    if (name === "lastName" && !value.trim()) {
      error = "Last name required";
    }

    if (name === "telPhone") {
      if (!value) error = "Phone required";
      else if (!/^\d{10}$/.test(value)) error = "Must be 10 digits";
    }

    if (name === "email") {
      if (!value) error = "Email required";
      else if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email";
    }

    setErrors((prev: any) => ({
      ...prev,
      [name]: error,
    }));
  };

  // ✅ FULL validation before submit
  const validateAll = () => {
    let newErrors: any = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name required";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name required";
    }

    if (!form.telPhone) {
      newErrors.telPhone = "Phone required";
    } else if (!/^\d{10}$/.test(form.telPhone)) {
      newErrors.telPhone = "Must be 10 digits";
    }

    if (!form.email) {
      newErrors.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    // ✅ Validate everything before submit
    if (!validateAll()) {
      Alert.alert("Error", "Please fix validation errors");
      return;
    }

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
        await AsyncStorage.setItem("user", JSON.stringify(data.user));

        Alert.alert("Success", "Profile updated");

        router.replace("/tabs/profile");
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

      {/* 🧑 First + Last Name */}
      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            value={form.firstName}
            onChangeText={(text) => {
              setForm({ ...form, firstName: text });
              validateField("firstName", text);
            }}
            style={[styles.input, errors.firstName && styles.inputError]}
          />
          {errors.firstName && (
            <Text style={styles.error}>{errors.firstName}</Text>
          )}
        </View>

        <View style={styles.halfInput}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            value={form.lastName}
            onChangeText={(text) => {
              setForm({ ...form, lastName: text });
              validateField("lastName", text);
            }}
            style={[styles.input, errors.lastName && styles.inputError]}
          />
          {errors.lastName && (
            <Text style={styles.error}>{errors.lastName}</Text>
          )}
        </View>
      </View>

      {/* 📱 Phone */}
      <Text style={styles.label}>Phone</Text>
      <TextInput
        value={form.telPhone}
        keyboardType="numeric"
        onChangeText={(text) => {
          const cleaned = text.replace(/[^0-9]/g, ""); // ✅ only numbers
          setForm({ ...form, telPhone: cleaned });
          validateField("telPhone", cleaned);
        }}
        style={[styles.input, errors.telPhone && styles.inputError]}
      />
      {errors.telPhone && (
        <Text style={styles.error}>{errors.telPhone}</Text>
      )}

      {/* 📧 Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={form.email}
        autoCapitalize="none"
        onChangeText={(text) => {
          setForm({ ...form, email: text });
          validateField("email", text);
        }}
        style={[styles.input, errors.email && styles.inputError]}
      />
      {errors.email && (
        <Text style={styles.error}>{errors.email}</Text>
      )}

      {/* 🔘 Button */}
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
    justifyContent: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    marginTop: 10,
    color: "#333",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  halfInput: {
    flex: 1,
    marginHorizontal: 5,
  },

  input: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 5,
  },

  inputError: {
    borderWidth: 1,
    borderColor: "red",
  },

  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },

  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});