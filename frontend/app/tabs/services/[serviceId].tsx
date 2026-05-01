import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import API from "../../Services/api"; // ✅ update path

export default function ServiceDetails() {
  const { serviceId } = useLocalSearchParams();
  const [service, setService] = useState<any>(null);

  useEffect(() => {
    if (!serviceId) return;

    API.get(`/services/${serviceId}`)
      .then((res) => setService(res.data))
      .catch((err) => console.log(err));
  }, [serviceId]);

  if (!service) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {service.Image && (
        <Image
          source={{ uri: `https://vehicle-service-booking-dpzu.onrender.com/${service.Image}` }}
          style={styles.image}
        />
      )}

      <View style={styles.content}>
        <Text style={styles.name}>{service.serviceName}</Text>

        <Text style={styles.description}>
          {service.description}
        </Text>

        {service.price && (
          <Text style={styles.price}>Rs. {service.price}</Text>
        )}

        {service.duration && (
          <Text style={styles.duration}>
            Duration: {service.duration}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  image: {
    width: "100%",
    height: 250,
  },

  content: {
    padding: 20,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    color: "#555",
    marginBottom: 15,
  },

  price: {
    fontSize: 18,
    color: "#2196F3",
    fontWeight: "bold",
    marginBottom: 10,
  },

  duration: {
    fontSize: 14,
    color: "#777",
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});