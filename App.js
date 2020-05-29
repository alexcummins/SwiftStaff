import React, { Component, useState } from "react";
import LoginScreen from "react-native-login-screen";
import { StatusBar } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PickRestaurantOrWorkerScreen from './src/screens/PickRestaurantOrWorkerScreen';
import PickUserRestaurantScreen from './src/screens/PickUserRestaurantScreen'

const source = require("./resources/img/background.jpg");
import set from "@babel/runtime/helpers/esm/set";
import UserScreen from "./src/screens/UserScreen";


const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={PickRestaurantOrWorkerScreen}
        />
        <Stack.Screen
          name="Restaurant"
          component={PickUserRestaurantScreen}
        />
        <Stack.Screen
          name="User"
          component={UserScreen}
        />
      </Stack.Navigator>
    );
  }
}
