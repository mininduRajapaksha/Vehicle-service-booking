import { View, Text, Button } from "react-native";
import { useState } from "react";
import Login from "../login";
import Register from "../register";

export default function Home() {
  const [screen, setScreen] = useState("login");

  return (
    <View style={{ padding: 20, flex:1 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Vehicle Service Booking
      </Text>

      {screen === "login" ? <Login /> : <Register />}

      <Button
        title="Switch Screen"
        onPress={() =>
          setScreen(screen === "login" ? "register" : "login")
        }
      />

    </View>
  );
}
