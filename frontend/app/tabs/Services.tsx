import { View, Text, FlatList, Image, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import API from "../Services/api";

export default function ServicesScreen() {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    API.get("/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={{ padding: 20 }}>
      {/* <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 15 }}>
        Services
      </Text> */}

      <FlatList
        data={services}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{
            marginVertical: 10,
            borderWidth: 1,
            borderColor: "#e0e0e0",
            borderRadius: 10,
            padding: 12,
            backgroundColor: "#f9f9f9"
          }}>
            {item.Image && (
              <Image
                source={{ uri: `http://192.168.1.3:5000/${item.Image}` }}
                style={{
                  width: "100%",
                  height: 180,
                  borderRadius: 8,
                  marginBottom: 12,
                }}
              />
            )}
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
              {item.serviceName}
            </Text>
            <Text style={{ fontSize: 14, color: "#666", marginBottom: 8 }}>
              {item.description}
            </Text>
            {item.price && (
              <Text style={{ fontSize: 14, color: "#2196F3", fontWeight: "600", marginBottom: 5 }}>
                Price: Rs.{item.price}
              </Text>
            )}
            {item.duration && (
              <Text style={{ fontSize: 14, color: "#666" }}>
                Duration: {item.duration}
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
}