import React from "react";
import {StyleSheet, View} from "react-native";
import {Button, Paragraph, Title} from 'react-native-paper';

export default function RestaurantOrWorkerSignup({ navigation }) {

    return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Title>Pick Restaurant or worker</Title>
        <Button
            icon="food"
            mode="contained"
            onPress={() => console.log("pressed")}
        >
            Restaurant
        </Button>
        <Paragraph></Paragraph>
        <Button
            icon="worker"
            mode="contained"
            onPress={() => console.log("pressed")}
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