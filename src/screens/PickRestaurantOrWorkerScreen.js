import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView} from "react-native";
import {Title, Button} from 'react-native-paper';


export default function PickRestaurantOrWorkerScreen() {

  return (
    <SafeAreaView>
      <Title>Pick Restaurant or worker</Title>
      <Button
        icon="food"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Press me
      </Button>
      <Button
        icon="worker"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Press me
      </Button>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
