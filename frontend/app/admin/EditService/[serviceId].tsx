import { useState, useEffect } from "react";
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
import { useLocalSearchParams, useRouter } from "expo-router";
import API from "../../Services/api";

export default function EditService() {
  const { serviceId } = useLocalSearchParams();
  const router = useRouter();

  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState<any>(null);
  const [existingImage, setExistingImage] = useState("");
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (!serviceId) return;

    API.get(`/services/${serviceId}`)
      .then((res) => {
        const data = res.data;
        setServiceName(data.serviceName || "");
        setPrice(data.price || "");
        setDescription(data.description || "");
        setDuration(data.duration || "");
        setExistingImage(data.Image || "");
      })
      .catch((err) => console.log(err));
  }, [serviceId]);

  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "serviceName" && !value.trim()) {
      error = "Service name is required";
    }

    if (name === "description" && !value.trim()) {
      error = "Description is required";
    }

    setErrors((prev: any) => ({
      ...prev,
      [name]: error,
    }));
  };

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
      setExistingImage("");
    }
  };

  const clearImage = () => {
    setImage(null);
    setExistingImage("");
  };

  const handleUpdate = async () => {
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
          name: "photo.jpg",
          type: "image/jpeg",
        } as any);
      }

      await API.put(`/services/update/${serviceId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Alert.alert("Success", "Service updated successfully");

      router.replace(`/tabs/services/${serviceId}`);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to update service");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Edit Service</Text>
        <Text style={styles.subtitle}>
          Update your service details
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
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
              errors.serviceName && styles.inputError,
            ]}
          />
          {errors.serviceName && (
            <Text style={styles.error}>{errors.serviceName}</Text>
          )}

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
              { height: 100, textAlignVertical: "top" },
            ]}
            multiline
          />
          {errors.description && (
            <Text style={styles.error}>{errors.description}</Text>
          )}

          <View style={styles.imageSection}>
            <Text style={styles.sectionTitle}>Upload Image</Text>

            {image ? (
              <View>
                <Image source={{ uri: image.uri }} style={styles.image} />

                <TouchableOpacity
                  onPress={clearImage}
                  style={styles.clearBtn}
                >
                  <Text style={styles.clearText}>Remove Image</Text>
                </TouchableOpacity>
              </View>
            ) : existingImage ? (
              <View>
                <Image
                  source={{
                    uri: `https://vehicle-service-booking-dpzu.onrender.com/${existingImage}`,
                  }}
                  style={styles.image}
                />

                <TouchableOpacity
                  onPress={clearImage}
                  style={styles.clearBtn}
                >
                  <Text style={styles.clearText}>Remove Image</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={pickImage}
                style={styles.uploadBtn}
              >
                <Text style={styles.uploadText}>
                  Choose Image from Gallery
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update Service</Text>
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
    justifyContent: "center",
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
    alignItems: "center",
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
    alignItems: "center",
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