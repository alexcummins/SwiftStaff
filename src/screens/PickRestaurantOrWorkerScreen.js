import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView} from "react-native";
import {Title, Button} from 'react-native-paper';
import {PickUserRestaurantScreen} from "./PickUserRestaurantScreen"


export default function PickRestaurantOrWorkerScreen(props) {

  let appConsumer;
  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent: 'center',
      backgroundColor: props.theme.colors.primary
    }}>
      <Title>Pick Restaurant or worker</Title>
      <Button
        icon="food"
        mode="contained"
        onPress={() => PickUserRestaurantScreen}
      >
        Restaurant
      </Button>
      <Button
        icon="worker"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Worker
      </Button>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
