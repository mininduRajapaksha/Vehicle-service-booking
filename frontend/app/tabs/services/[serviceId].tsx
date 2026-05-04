import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../../Services/api";

export default function ServiceDetails() {
  const { serviceId } = useLocalSearchParams();
  const router = useRouter();

  const [service, setService] = useState<any>(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (!serviceId) return;

    API.get(`/services/${serviceId}`)
      .then((res) => setService(res.data))
      .catch((err) => console.log(err));

    AsyncStorage.getItem("role").then((r) => setRole(r || ""));
  }, [serviceId]);

  const handleEdit = () => {
    router.push(`/admin/EditService/${serviceId}`);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Service",
      "Are you sure you want to delete this service?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");

              await fetch(
                `https://vehicle-service-booking-dpzu.onrender.com/services/delete/${serviceId}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              Alert.alert("Deleted", "Service removed successfully");

              router.replace("/tabs/services");
            } catch (err) {
              Alert.alert("Error", "Delete failed");
            }
          },
        },
      ]
    );
  };

  if (!service) {
    return (
      <View style={styles.loading}>
        <Text style={{ fontSize: 16 }}>Loading service...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <View style={styles.topSection}>
        <Text style={styles.title}>{service.serviceName}</Text>
        <Text style={styles.subtitle}>
          Professional vehicle care service
        </Text>
      </View>

      {service.Image && (
        <Image
          source={{
            uri: `https://vehicle-service-booking-dpzu.onrender.com/${service.Image}`,
          }}
          style={styles.image}
        />
      )}

      <View style={styles.card}>
        <Text style={styles.description}>
          {service.description || "No description available."}
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Price</Text>
          <Text style={styles.value}>
            {service.price ? `Rs. ${service.price}` : "Varies"}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Duration</Text>
          <Text style={styles.value}>
            {service.duration ? service.duration : "Depends on service"}
          </Text>
        </View>

        {/* ADMIN ACTIONS */}
        {role === "admin" && (
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.editBtn} onPress={handleEdit}>
              <Text style={styles.editText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },

  topSection: {
    backgroundColor: "#011C3A",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#cfd8dc",
    marginTop: 8,
  },

  image: {
    width: "90%",
    height: 220,
    alignSelf: "center",
    borderRadius: 16,
    marginTop: -40,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    borderRadius: 18,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },

  description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
    marginBottom: 20,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  label: {
    fontSize: 14,
    color: "#777",
  },

  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2196F3",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  editBtn: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    borderWidth: 1,
    borderColor: "#1565C0",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 8,
  },

  editText: {
    color: "#1565C0",
    fontWeight: "bold",
  },

  deleteBtn: {
    flex: 1,
    backgroundColor: "#FFEBEE",
    borderWidth: 1,
    borderColor: "#c62828",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginLeft: 8,
  },

  deleteText: {
    color: "#c62828",
    fontWeight: "bold",
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});