import { View, Text } from "react-native";

export default function Home() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Vehicle Service Booking
      </Text>
      <Text style={{ marginTop: 10, fontSize: 16, color: "#666" }}>
        Use the tabs below to browse services or add a new one.
      </Text>
    </View>
  );
}
