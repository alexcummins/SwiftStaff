import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView} from "react-native";
import {Title, Button} from 'react-native-paper';
import {PickUserRestaurantScreen} from "./PickUserRestaurantScreen"


export default function PickRestaurantOrWorkerScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Title>Pick Restaurant or worker</Title>
      <Button
        icon="food"
        mode="contained"
        onPress={() => navigation.navigate("Restaurant")}
      >
        Restaurant
      </Button>
      <Button
        icon="worker"
        mode="contained"
        onPress={() => navigation.navigate("User")}
      >
        Worker
      </Button>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
