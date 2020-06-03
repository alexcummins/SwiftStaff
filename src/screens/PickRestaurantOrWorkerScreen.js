import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView} from "react-native";
import {Title, Button, Paragraph} from 'react-native-paper';


export default function PickRestaurantOrWorkerScreen({ navigation }) {
  return (
    <View style={styles.topView}>
      <Title>Pick Restaurant or worker</Title>
      <Button
        icon="food"
        mode="contained"
        onPress={() => navigation.navigate("Restaurant")}
      >
        Restaurant
      </Button>
      <Paragraph></Paragraph>
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
    topView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});
