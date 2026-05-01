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
import { Ionicons } from "@expo/vector-icons";

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

  // Real-time validation
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

  //validation before submit
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
    //Validate before submit
    if (!validateAll()) {
      Alert.alert("Error", "Please fix validation errors");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch("https://vehicle-service-booking-dpzu.onrender.com/auth/update", {
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

        const role = await AsyncStorage.getItem("role");

          if (role === "admin") {
            router.replace("/admin/profile");
          } else {
            router.replace("/tabs/profile");
          }
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (err) {
      Alert.alert("Error", "Update failed");
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.topSection}>

        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Edit Profile</Text>

        <Text style={styles.subtitle}>
          Update your information
        </Text>

      </View>
      
      <View style={styles.form}>

        {/* First Name */}
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

          {/*Last Name*/}
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

        {/* Phone */}
        <Text style={styles.label}>Phone</Text>
        <TextInput
          value={form.telPhone}
          keyboardType="numeric"
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

        {/*Email */}
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

      </View>

      {/*Button */}
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
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

  title: {
    fontSize: 26,
    fontWeight: "bold",
    justifyContent:"center",
    color: "#f6f6f6",
  },

  subtitle: {
    fontSize: 16,
    color: "#f6f6f6",
    textAlign: "center",
    marginTop:10,
    // marginBottom: 5,
  },

  backBtn: {
    position: "absolute",
    left: 15,
    top: 50,
    zIndex: 10,
  },

  form:{
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 12,
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
    color: "#555",
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
    backgroundColor: "#fafafa",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    // borderColor: "#eee",
    borderColor: "#ccc",
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
    backgroundColor: "#011C3A",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 25,
    marginHorizontal:10
},

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize:16
  },
});