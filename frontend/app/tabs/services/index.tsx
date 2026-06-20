import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../../Services/api";

export default function ServicesScreen() {
  const [services, setServices] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    API.get("/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.log(err));

    AsyncStorage.getItem("role").then((r) => setRole(r || ""));
  }, []);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => router.push(`/tabs/services/${item._id}`)}
    >
      {item.Image && (
        <Image
          source={{
            uri: item.Image
          }}
          style={styles.image}
        />
      )}

      <Text style={styles.name}>{item.serviceName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Services</Text>
        <Text style={styles.subtitle}>
          Explore available vehicle services
        </Text>
      </View>

      {/*ADMIN ONLY BUTTON */}
      {role === "admin" && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/admin/AddServices")}
        >
          <Text style={styles.addButtonText}>+ Add Service</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={services}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 15 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fa" },

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
  },

  subtitle: {
    fontSize: 16,
    color: "#cfd8dc",
    marginTop: 10,
  },

  addButton: {
    backgroundColor: "#E3F2FD",
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1565C0",
    alignItems: "center",
  },

  addButtonText: {
    color: "#1565C0",
    fontWeight: "bold",
    fontSize: 15,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  image: {
    width: "100%",
    height: 160,
  },

  name: {
    padding: 12,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "left",
    color: "#333",
  },
});
