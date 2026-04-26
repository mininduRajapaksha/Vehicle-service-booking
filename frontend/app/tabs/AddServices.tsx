import { useState } from "react";
import { Alert, TextInput, View, Button, Text } from "react-native";
import API from "../Services/api";




export default function AddServices() {

    const [serviceName, setServiceName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");

    const handleSubmit = async() => {
        if(!serviceName || !description) {
            Alert.alert("Error", "Service name and description are required");
            return;
        }

        try {
            await API.post("/services/add", {
                serviceName,
                price,
                description,
                duration
            });
            Alert.alert("Success", "Service added successfully");

            // Clear form
            setServiceName("");
            setPrice("");
            setDescription("");
            setDuration("");
            
        } catch (err) {
            console.log(err);
            Alert.alert("Error", "Failed to add service");
        }
    }
    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Add Services
            </Text>

            <TextInput
                placeholder="Service Name"
                value={serviceName}
                onChangeText={setServiceName}
                style={{borderWidth: 1, borderColor: "#ccc", padding: 10, marginVertical: 10}}
            />

            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={{borderWidth: 1, borderColor: "#ccc", padding: 10, marginVertical: 10}}
            />

            <TextInput
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                style={{borderWidth: 1, borderColor: "#ccc", padding: 10, marginVertical: 10}}
            />

            <TextInput
                placeholder="Duration"
                value={duration}
                onChangeText={setDuration}
                style={{borderWidth: 1, borderColor: "#ccc", padding: 10, marginVertical: 10}}
            />

            <Button title="Add Service" onPress={handleSubmit} />
        </View>
    )
}