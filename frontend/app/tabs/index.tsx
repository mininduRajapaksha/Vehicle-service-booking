import { View, Text } from "react-native";


export default function Home() {

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Vehicle Service Booking
        </Text>
      </View>
    </View>
  );
}
