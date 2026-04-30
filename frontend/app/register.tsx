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
      <Text style={styles.title}>Create Account</Text>
      <View style={styles.form}>
        <View style={styles.row}>
          <View style={styles.halfInput}>
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
          </View>
          <View style={styles.halfInput}>
          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              validate();
            }}
            style={styles.halfInputLast}
          />
          {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}
          </View>
        </View>
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

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.btnText}>Sign up</Text>
      </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1,
    padding: 20,
    justifyContent: "center"
  },
  title: { 
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center"
  },
  form:{
    padding:1
  },
  row:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  halfInput:{
    flex:1,
    marginRight: 10,
  },
  halfInputLast:{
    backgroundColor: "#f5f5f5",
    marginRight:-10,
    // flex:1,
    borderWidth: 1,
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  button:{
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },
  btnText:{
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    textAlign: "left",
    marginTop: 20,
    marginLeft:5,
    color: "#2196F3",
    fontWeight: "600",
  },
  error: {
    color: "red",
    marginBottom: 10
  }
});