import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

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
              "https://vehicle-service-booking-dpzu.onrender.com/auth/delete",
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

      <View>
        <View style={styles.topSection}>
             {/* Profile Icon */}
          <Ionicons name="person-circle-outline" size={90} color="#fff" />
             {/* Title */}
          <Text style={styles.title}>
            {user.firstName} {user.lastName}
          </Text>
       </View>
      </View>
    <ScrollView>
      <View style={styles.card}>
      {/* Name */}
        <View style={styles.rowItem}>
          <Ionicons name="person-outline" size={22} color="#4CAF50" />
          <View style={styles.textContainer}>
            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.value}>
              {user.firstName} {user.lastName}
            </Text>
          </View>
        </View>

      <View style={styles.divider} />

      {/* Email */}
      <View style={styles.rowItem}>
        <Ionicons name="mail-outline" size={22} color="#2196F3" />
        <View style={styles.textContainer}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Phone */}
      <View style={styles.rowItem}>
        <Ionicons name="call-outline" size={22} color="#FF9800" />
        <View style={styles.textContainer}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{user.telPhone}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Role */}
      <View style={styles.rowItem}>
        <Ionicons name="shield-outline" size={22} color="#9C27B0" />
        <View style={styles.textContainer}>
          <Text style={styles.label}>Role</Text>
          <Text style={styles.value}>{user.role}</Text>
        </View>
      </View>

    </View>

      <TouchableOpacity
        style={styles.editButton} onPress={() => router.push("/EditProfile")}>
        <Ionicons name="create-outline" size={20} color="#2e7d32" />
        <Text style={styles.editText}>
          Edit Profile
        </Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#c62828" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteBtn} onPress={handleDeleteAccount}>
        <Ionicons name="trash-outline" size={20} color="#C62828" />
        <Text style={styles.deleteText}>Delete Account</Text>
      </TouchableOpacity>
    </ScrollView>
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
    height: 200,
    justifyContent:"center",
    alignItems: "center",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    justifyContent:"center",
    color: "#f6f6f6",
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginLeft:10,
    marginRight:10,
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

  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8f5e9",
    borderColor: "#2e7d32",
    borderWidth: 1.5,
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
    marginLeft:10,
    marginRight:10,
  },
  editText: {
    color: "#2e7d32",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 8,
  },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffebee",   // light red
    borderColor: "#c62828",
    borderWidth: 1.5,
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
    marginLeft:10,
    marginRight:10,
  },

  logoutText: {
    color: "#c62828",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 8,
  },

  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f88989",
    borderColor: "#be2020",
    borderWidth: 1.5,
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
    marginLeft:10,
    marginRight:10,
    marginBottom:10
  },

  deleteText: {
    color: "#be2020",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 8,
  },

  rowItem: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 12,
},

textContainer: {
  marginLeft: 15,
},

divider: {
  height: 1,
  backgroundColor: "#eee",
},
});

