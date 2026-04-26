import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import API from "./Services/api";

export default function ServicesScreen() {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    API.get("/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Services
      </Text>

      <FlatList
        data={services}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text>{item.serviceName}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}