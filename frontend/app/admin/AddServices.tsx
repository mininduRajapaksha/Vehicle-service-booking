import { useState } from "react";
import { Alert, TextInput, View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import API from "../Services/api";

export default function AddServices() {
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState<any>(null);

  // Pick Image
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Please allow access to gallery");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  // Clear Image
  const clearImage = () => {
    setImage(null);
    Alert.alert("Image Cleared", "The selected image has been removed");
  };

  // Submit
  const handleSubmit = async () => {
    if (!serviceName || !description) {
      Alert.alert("Error", "Service name and description are required");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("serviceName", serviceName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("duration", duration);

      // Attach Image
      if (image) {
        formData.append("image", {
          uri: image.uri,
          name: `service_${Date.now()}.jpg`,
          type: "image/jpeg",
        } as any);
      }

      await API.post("/services/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Alert.alert("Success", "Service added successfully");

      // Clear form
      setServiceName("");
      setPrice("");
      setDescription("");
      setDuration("");
      setImage(null);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to add service");
    }
  };

  return (
    <View>

      <View style={styles.topSection}>
        <Text style={styles.title}>Add Services</Text>

        <Text style={styles.subtitle}>
            Update your information
        </Text>
      </View>

    <ScrollView style={{ padding: 20, backgroundColor: "#fff" }}>

      <TextInput
        placeholder="Service Name *"
        value={serviceName}
        onChangeText={setServiceName}
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 12, marginVertical: 8, borderRadius: 8 }}
      />

      <TextInput
        placeholder="Description *"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 12, marginVertical: 8, borderRadius: 8, textAlignVertical: "top" }}
      />

      <TextInput
        placeholder="Price ($)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 12, marginVertical: 8, borderRadius: 8 }}
      />

      <TextInput
        placeholder="Duration (e.g., 30 mins)"
        value={duration}
        onChangeText={setDuration}
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 12, marginVertical: 8, borderRadius: 8 }}
      />

      {/* Image Section */}
      <View style={{ marginVertical: 15, paddingVertical: 15, borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#e0e0e0" }}>
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>Upload Image</Text>

        {image ? (
          <View>
            <Image
              source={{ uri: image.uri }}
              style={{
                width: "100%",
                height: 250,
                borderRadius: 12,
                marginBottom: 12,
                borderWidth: 2,
                borderColor: "#4CAF50",
              }}
            />
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                onPress={clearImage}
                style={{
                  flex: 1,
                  backgroundColor: "#ff5252",
                  padding: 12,
                  borderRadius: 8,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <MaterialCommunityIcons name="trash-can" size={20} color="white" />
                <Text style={{ color: "white", fontWeight: "600" }}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ gap: 10 }}>
            <TouchableOpacity
              onPress={pickImage}
              style={{
                backgroundColor: "#E3F2FD",
                padding: 15,
                borderRadius: 8,
                borderWidth: 2,
                borderColor: "#2196F3",
                borderStyle: "dashed",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <MaterialCommunityIcons name="image-plus" size={24} color="#2196F3" />
              <Text style={{ color: "#2196F3", fontWeight: "600", fontSize: 16 }}>
                Choose from Gallery
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: "#4CAF50",
          padding: 15,
          borderRadius: 8,
          marginVertical: 15,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16, textAlign: "center" }}>
          Add Service
        </Text>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
}

const styles =StyleSheet.create({
  topSection: {
    backgroundColor: "#011C3A",
    marginBottom: 30,
    height: 200,
    justifyContent:"center",
    alignItems: "center",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    justifyContent:"center",
    color: "#f6f6f6",
  },

  subtitle: {
    fontSize: 16,
    color: "#f6f6f6",
    textAlign: "center",
    marginTop:10
  },
})