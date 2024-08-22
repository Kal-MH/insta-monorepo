import { Button } from "@insta-monorepo/design-system";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="hello world" onPress={() => {}}></Button>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
