import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
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

  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "firstName" && !value.trim()) error = "First name required";
    if (name === "lastName" && !value.trim()) error = "Last name required";

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

    setErrors((prev: any) => ({ ...prev, [name]: error }));
  };

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
        Alert.alert("Success", "Account created");
        router.replace("/login");
      } else {
        Alert.alert("Error", data.message);
      }
    } catch {
      Alert.alert("Error", "Server error");
    }
  };

  return (
    <View style={styles.container}>
      {/*Header */}
      <View style={styles.topSection}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join us today</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Text style={styles.formTitle}>Sign up</Text>
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                value={form.firstName}
                onChangeText={(t) => {
                  setForm({ ...form, firstName: t });
                  validateField("firstName", t);
                }}
                style={[styles.input, errors.firstName && styles.inputError]}
              />
              {errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}
            </View>

            <View style={styles.halfInput}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                value={form.lastName}
                onChangeText={(t) => {
                  setForm({ ...form, lastName: t });
                  validateField("lastName", t);
                }}
                style={[styles.input, errors.lastName && styles.inputError]}
              />
              {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}
            </View>
          </View>

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="example@test.com"
            placeholderTextColor="#999"
            value={form.email}
            onChangeText={(t) => {
              setForm({ ...form, email: t });
              validateField("email", t);
            }}
            style={[styles.input, errors.email && styles.inputError]}
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

          {/* Phone */}
          <Text style={styles.label}>Phone</Text>
          <TextInput
            placeholder="07XXXXXXXX"
            placeholderTextColor="#999"
            value={form.telPhone}
            keyboardType="numeric"
            onChangeText={(t) => {
              const clean = t.replace(/[^0-9]/g, "");
              setForm({ ...form, telPhone: clean });
              validateField("telPhone", clean);
            }}
            style={[styles.input, errors.telPhone && styles.inputError]}
          />
          {errors.telPhone && <Text style={styles.error}>{errors.telPhone}</Text>}

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Minimum 6 characters"
            placeholderTextColor="#999"
            secureTextEntry
            value={form.password}
            onChangeText={(t) => {
              setForm({ ...form, password: t });
              validateField("password", t);
            }}
            style={[styles.input, errors.password && styles.inputError]}
          />
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}

          {/* Confirm Password */}
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={(t) => {
              setForm({ ...form, confirmPassword: t });
              validateField("confirmPassword", t);
            }}
            style={[styles.input, errors.confirmPassword && styles.inputError]}
          />
          {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

          {/* Button */}
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Link */}
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.link}>
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fa" },

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

  form: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
  },

  formTitle:{
    color:"#011C3A",
    fontWeight:"bold",
    fontSize:26,
    marginBottom:20,
    marginLeft:5
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
    color: "#555",
  },

  input: {
    backgroundColor: "#fafafa",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  inputError: {
    borderColor: "#e53935",
  },

  error: {
    color: "#e53935",
    fontSize: 12,
    marginTop: 4,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  halfInput: {
    flex: 1,
  },

  button: {
    backgroundColor: "#011C3A",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 25,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  link: {
    textAlign: "center",
    marginTop: 20,
    color: "#2196F3",
    fontWeight: "600",
  },
});