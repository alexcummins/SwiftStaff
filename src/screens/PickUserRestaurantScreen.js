import React from 'react'
import {View, Text, Button} from 'react-native'


export default function PickUserRestaurantScreen( { navigation }) {

    return (
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text>Restaurant Screen</Text>
        <Button
          title="Go back to home"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    );
}