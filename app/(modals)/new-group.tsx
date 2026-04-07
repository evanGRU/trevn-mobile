import { View, Text } from "react-native";
import {Link} from "expo-router";

export default function NewGroup() {
  return (
      <View style={{ height: 300, justifyContent: "center", alignItems: "center", backgroundColor: "red" }}>
        <Text>Nouvelle modale</Text>
        <Link href="/" dismissTo>
          <Text>Go to home screen</Text>
        </Link>
      </View>
  );
}