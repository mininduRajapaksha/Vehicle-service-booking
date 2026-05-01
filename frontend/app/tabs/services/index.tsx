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
import API from "../../Services/api"; // ✅ update path if needed

export default function ServicesScreen() {
  const [services, setServices] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    API.get("/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.log(err));
  }, []);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={() => router.push(`/tabs/services/${item._id}`)} // ✅ correct navigation
    >
      {item.Image && (
        <Image
          source={{ uri: `http://192.168.1.3:5000/${item.Image}` }}
          style={styles.image}
        />
      )}

      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.serviceName}</Text>

        <Text numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>

        <View style={styles.row}>
          {item.price && (
            <Text style={styles.price}>Rs. {item.price}</Text>
          )}
          {item.duration && (
            <Text style={styles.duration}>{item.duration}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Services</Text>
      </View>

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
    height: 180,
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

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 180,
  },

  cardContent: {
    padding: 15,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
  },

  description: {
    fontSize: 13,
    color: "#666",
    marginVertical: 5,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  price: {
    color: "#2196F3",
    fontWeight: "bold",
  },

  duration: {
    color: "#888",
  },
});