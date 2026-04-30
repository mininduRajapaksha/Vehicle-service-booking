import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function Profile() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const storedUser = await AsyncStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };


  const handleLogout = () => {
  Alert.alert(
    "Logout",
    "Are you sure you want to log out?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.clear();
          router.replace("/(publicTabs)");
        },
      },
    ]
  );
};

const handleDeleteAccount = () => {
  Alert.alert(
    "Delete Account",
    "Do you really want to delete your account?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem("token");

            const res = await fetch(
              "http://192.168.1.3:5000/auth/delete",
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (res.ok) {
              await AsyncStorage.clear();

              Alert.alert("Deleted", "Your account has been deleted");

              router.replace("/(publicTabs)");
            } else {
              const data = await res.json();
              Alert.alert("Error", data.message);
            }
          } catch (err) {
            Alert.alert("Error", "Failed to delete account");
          }
        },
      },
    ]
  );
};

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Full Name</Text>
        <Text style={styles.value}>
          {user.firstName} {user.lastName}
        </Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{user.telPhone}</Text>

        <Text style={styles.label}>Role</Text>
        <Text style={styles.value}>{user.role}</Text>
      </View>

      <TouchableOpacity
        style={styles.editButton} onPress={() => router.push("/EditProfile")}>
        <Text style={styles.editText}>
          Edit Profile
        </Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteBtn}
          onPress={handleDeleteAccount}
>
        <Text style={styles.deleteText}>Delete Account</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f7fa",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
  },

  label: {
    color: "#888",
    marginTop: 10,
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
  },

  editButton:{
    backgroundColor: "#04b819",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop:10
  },

  editText:{
    color: "#fff",
    fontWeight: "bold",
    fontSize:15
  },

  logoutBtn: {
    backgroundColor: "#e53935",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop:10
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize:15
  },

  deleteBtn: {
  backgroundColor: "#000",
  padding: 15,
  borderRadius: 10,
  alignItems: "center",
  marginTop: 10,
  },

  deleteText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 15,
  },
});

