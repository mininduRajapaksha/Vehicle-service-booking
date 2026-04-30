import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telPhone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<any>({});

  // 🔍 Real-time validation (single field)
  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "firstName" && !value.trim()) {
      error = "First name required";
    }

    if (name === "lastName" && !value.trim()) {
      error = "Last name required";
    }

    if (name === "email") {
      if (!value) error = "Email required";
      else if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email";
    }

    if (name === "telPhone") {
      if (!value) error = "Phone required";
      else if (!/^\d{10}$/.test(value)) error = "Must be 10 digits";
    }

    if (name === "password") {
      if (!value) error = "Password required";
      else if (value.length < 6) error = "Min 6 characters";
    }

    if (name === "confirmPassword") {
      if (!value) error = "Confirm password required";
      else if (value !== form.password) error = "Passwords do not match";
    }

    setErrors((prev: any) => ({
      ...prev,
      [name]: error,
    }));
  };

  // ✅ Full validation on submit
  const validateAll = () => {
    let newErrors: any = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name required";

    if (!form.email) newErrors.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email";

    if (!form.telPhone) newErrors.telPhone = "Phone required";
    else if (!/^\d{10}$/.test(form.telPhone))
      newErrors.telPhone = "Must be 10 digits";

    if (!form.password) newErrors.password = "Password required";
    else if (form.password.length < 6)
      newErrors.password = "Min 6 characters";

    if (!form.confirmPassword)
      newErrors.confirmPassword = "Confirm password required";
    else if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateAll()) {
      Alert.alert("Error", "Please fix validation errors");
      return;
    }

    try {
      const res = await fetch("http://192.168.1.3:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", "Registered successfully");
        router.replace("/login");
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (err) {
      Alert.alert("Error", "Server error");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <View style={styles.form}>
        {/* First + Last Name */}
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <TextInput
              placeholder="First Name"
              value={form.firstName}
              onChangeText={(text) => {
                setForm({ ...form, firstName: text });
                validateField("firstName", text);
              }}
              style={[
                styles.input,
                errors.firstName && styles.inputError,
              ]}
            />
            {errors.firstName && (
              <Text style={styles.error}>{errors.firstName}</Text>
            )}
          </View>

          <View style={styles.halfInput}>
            <TextInput
              placeholder="Last Name"
              value={form.lastName}
              onChangeText={(text) => {
                setForm({ ...form, lastName: text });
                validateField("lastName", text);
              }}
              style={[
                styles.input,
                errors.lastName && styles.inputError,
              ]}
            />
            {errors.lastName && (
              <Text style={styles.error}>{errors.lastName}</Text>
            )}
          </View>
        </View>

        {/* Email */}
        <TextInput
          placeholder="Email"
          value={form.email}
          onChangeText={(text) => {
            setForm({ ...form, email: text });
            validateField("email", text);
          }}
          style={[styles.input, errors.email && styles.inputError]}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        {/* Phone */}
        <TextInput
          placeholder="Phone"
          keyboardType="numeric"
          value={form.telPhone}
          onChangeText={(text) => {
            const cleaned = text.replace(/[^0-9]/g, "");
            setForm({ ...form, telPhone: cleaned });
            validateField("telPhone", cleaned);
          }}
          style={[styles.input, errors.telPhone && styles.inputError]}
        />
        {errors.telPhone && (
          <Text style={styles.error}>{errors.telPhone}</Text>
        )}

        {/* Password */}
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => {
            setForm({ ...form, password: text });
            validateField("password", text);
          }}
          style={[styles.input, errors.password && styles.inputError]}
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password}</Text>
        )}

        {/* Confirm Password */}
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          value={form.confirmPassword}
          onChangeText={(text) => {
            setForm({ ...form, confirmPassword: text });
            validateField("confirmPassword", text);
          }}
          style={[styles.input, errors.confirmPassword && styles.inputError]}
        />
        {errors.confirmPassword && (
          <Text style={styles.error}>{errors.confirmPassword}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.btnText}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.link}>
          Already have an account? Login
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
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  form: {
    padding: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    textAlign: "left",
    marginTop: 20,
    marginLeft: 5,
    color: "#2196F3",
    fontWeight: "600",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  inputError: {
    borderColor: "red",
  },
});