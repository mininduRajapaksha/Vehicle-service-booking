import { useState } from "react";
import {
  Alert,
  TextInput,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import API from "../Services/api";

export default function AddServices() {
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState<any>(null);
  const [errors, setErrors] = useState<any>({});

  const validateField = (name:string, value:string)=>{
    let error ="";

    if(name==="serviceName" && !value.trim()){
      error="Service name is required";
    }

    if(name==="description" && !value.trim()){
      error="Description is required"
    }

      setErrors((prev: any) => ({
    ...prev,
    [name]: error,
  }));
  }

  // Pick Image
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Please allow access to gallery");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
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
    if (!serviceName.trim() || !description.trim()) {
      validateField("serviceName", serviceName);
      validateField("description", description);

      Alert.alert("Error", "Please fill required fields");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("serviceName", serviceName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("duration", duration);

      if (image) {
        formData.append("image", {
          uri: image.uri,
          name: `service_${Date.now()}.jpg`,
          type: "image/jpeg",
        } as any);
      }

      await API.post("/services/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Alert.alert("Success", "Service added successfully");

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
    <View style={styles.container}>
      {/*Header */}
      <View style={styles.topSection}>
        <Text style={styles.title}>Add Services</Text>
        <Text style={styles.subtitle}>
          Add and manage your service details
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {/*Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Service Name *</Text>
          <TextInput
            value={serviceName}
            onChangeText={(text) => {
                setServiceName(text);
                validateField("serviceName", text);
              }}
              style={[
                styles.input,
                errors.serviceName && styles.inputError
              ]}
          />
          {errors.serviceName && (<Text style={styles.error}>{errors.serviceName}</Text>)}

          <Text style={styles.label}>Price</Text>
          <TextInput
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={styles.input}
          />

          <Text style={styles.label}>Duration</Text>
          <TextInput
            value={duration}
            onChangeText={setDuration}
            style={styles.input}
          />

          <Text style={styles.label}>Description *</Text>
          <TextInput
            value={description}
            onChangeText={(text) => {
                setDescription(text);
                validateField("description", text);
              }}
              style={[
                styles.input,
                errors.description && styles.inputError,
                { height: 100, textAlignVertical: "top" }
              ]}
            multiline
            numberOfLines={4}
          />
          {errors.description && (<Text style={styles.error}>{errors.description}</Text>)}

          {/* 🖼 Image Section */}
          <View style={styles.imageSection}>
            <Text style={styles.sectionTitle}>Upload Image</Text>

            {image ? (
              <View>
                <Image source={{ uri: image.uri }} style={styles.image} />

                <TouchableOpacity
                  onPress={clearImage}
                  style={styles.clearBtn}
                >
                  <MaterialCommunityIcons
                    name="trash-can"
                    size={20}
                    color="#c62828"
                  />
                  <Text style={styles.clearText}>Remove Image</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={pickImage}
                style={styles.uploadBtn}
              >
                <MaterialCommunityIcons
                  name="image-plus"
                  size={24}
                  color="#1565C0"
                />
                <Text style={styles.uploadText}>
                  Choose Image from Gallery
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* 🔘 Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Service</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },

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
    fontSize: 26,
    fontWeight: "bold",
    color: "#f6f6f6",
  },

  subtitle: {
    fontSize: 14,
    color: "#cfd8dc",
    marginTop: 8,
  },

  form: {
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
    color: "#555",
  },

  input: {
    backgroundColor: "#fafafa",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  imageSection: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
  },

  uploadBtn: {
    backgroundColor: "#E3F2FD",
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#1565C0",
    borderStyle: "dashed",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  uploadText: {
    color: "#1565C0",
    fontWeight: "600",
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 10,
  },

  clearBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFEBEE",
    borderWidth: 1,
    borderColor: "#c62828",
    padding: 12,
    borderRadius: 10,
  },

  clearText: {
    color: "#c62828",
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#011C3A",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 25,
    marginHorizontal: 12,
    elevation: 2,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  inputError: {
    borderColor: "#e53935",
    borderWidth: 1,
  },

  error: {
    color: "#e53935",
    fontSize: 12,
    marginTop: 4,
  },
});