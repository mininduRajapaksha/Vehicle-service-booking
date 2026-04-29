import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [telPhone, setTelPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<any>({});

  // 🔍 Validation function
  const validate = () => {
    let newErrors: any = {};

    if (!firstName) newErrors.firstName = "First name required";
    if (!lastName) newErrors.lastName = "Last name required";

    if (!email) {
      newErrors.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email";
    }

    if (!telPhone) {
      newErrors.telPhone = "Phone required";
    } else if (telPhone.length !== 10) {
      newErrors.telPhone = "Must be 10 digits";
    }

    if (!password) {
      newErrors.password = "Password required";
    } else if (password.length < 6) {
      newErrors.password = "Min 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password required";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      const res = await fetch("http://192.168.1.3:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          telPhone,
          password,
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registered successfully");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Error connecting to server");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => {
          setFirstName(text);
          validate();
        }}
        style={styles.input}
      />
      {errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => {
          setLastName(text);
          validate();
        }}
        style={styles.input}
      />
      {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          validate();
        }}
        style={styles.input}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput
        placeholder="Phone"
        value={telPhone}
        onChangeText={(text) => {
          setTelPhone(text);
          validate();
        }}
        keyboardType="numeric"
        style={styles.input}
      />
      {errors.telPhone && <Text style={styles.error}>{errors.telPhone}</Text>}

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          validate();
        }}
        secureTextEntry
        style={styles.input}
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          validate();
        }}
        secureTextEntry
        style={styles.input}
      />
      {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

      <Button title="Sign Up" onPress={handleRegister} />

      <TouchableOpacity onPress={() => router.push("/login")}>
          <Text>Already have an account? Login</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 5,
    borderRadius: 5
  },
  error: {
    color: "red",
    marginBottom: 10
  }
});