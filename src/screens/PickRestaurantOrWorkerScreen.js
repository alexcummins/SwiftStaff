import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Title, Button } from "react-native-paper";


export default function PickRestaurantOrWorkerScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Pick Restaurant or worker</Title>
      <Button
        icon="food"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Press me
      </Button>
      />
      <Button
        icon="worker"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Press me
      </Button>
    </View>
  );
}
