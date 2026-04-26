import {View , Button} from "react-native";
// import { Button } from "@react-navigation/elements";
import { useRouter } from "expo-router";

export default function Home() {
  
    const router = useRouter();

    return (
        <View style={{ padding: 20 }}>
            <Button
                title="Go to Services"
                onPress={() => router.push("/Services")}
            />

            <Button
                title="Add Services"
                onPress={() => router.push("/AddServices")}
            />
        </View>
    )

}
