import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  const router = useRouter();

    const services = [
    { name: "General Service", icon: "construct-outline" },
    { name: "Battery", icon: "battery-charging-outline" },
    { name: "Tyres", icon: "disc-outline" },
    { name: "Brakes", icon: "speedometer-outline" },
    { name: "AC Service", icon: "snow-outline" },
    { name: "Car Wash", icon: "car-outline" },
  ];

  return (
    <View style={styles.container}>
      
      <View style={styles.topSection}>
        {/* image */}
        <Image
          source={require("../../assets/images/carHome.jpg")}
          style={styles.image}
        />

        {/* Title */}
        <Text style={styles.title}>Auto Care</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Book your vehicle service easily and quickly
        </Text>
      </View>

         {/* Services Grid */}
      <View style={styles.gridContainer}>
        <Text style={styles.sectionTitle}>Our Services</Text>

        <FlatList
          data={services}
          numColumns={3}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <Ionicons name={item.icon} size={28} color="#2563eb" />
              <Text style={styles.cardText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.bottomSection}>
        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.logbtnText}>Sign in</Text>
        </TouchableOpacity>

        {/* Register Button */}
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.regbtnText}>Sign up</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  topSection: {
    backgroundColor: "#011C3A",
    marginBottom: 30,
    justifyContent:"flex-start",
    alignItems: "center",
    padding: 20,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },

  bottomSection: {
    // flex: 1,
    padding: 10,
    justifyContent: "flex-end",
    marginBottom: -20,
    alignItems: "center",

  },

  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    height: 120,
    marginTop: 50,
    marginBottom: 20,
    resizeMode:"contain"
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#f6f6f6",
  },

  subtitle: {
    fontSize: 16,
    color: "#f6f6f6",
    textAlign: "center",
    marginBottom: 15,
  },

  loginBtn: {
    width: "100%",
    backgroundColor: "#4CAF50",
    padding: 13,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },

  registerBtn: {
    width: "100%",
    backgroundColor: "#edf2f5",
    borderColor: "#2196F3",
    borderWidth: 2,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },

  regbtnText: {
    color: "#2196F3",
    fontSize: 16,
    fontWeight: "bold",
  },

  logbtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
//service styling
gridContainer: {
  flex: 1,
  paddingHorizontal: 15,
  paddingVertical:10
},

sectionTitle: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 10,
},

card: {
  flex: 1,
  backgroundColor: "#fff",
  margin: 5,
  padding: 15,
  borderRadius: 12,
  alignItems: "center",

  elevation: 3,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 5,
},

cardText: {
  marginTop: 8,
  fontSize: 12,
  textAlign: "center",
},
});