import React, { Component, useState } from "react";
import LoginScreen from "react-native-login-screen";
import { StatusBar } from "react-native";
import PickRestaurantOrWorkerScreen from './src/screens/PickRestaurantOrWorkerScreen';

const source = require("./resources/img/background.jpg");
import set from "@babel/runtime/helpers/esm/set";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <PickRestaurantOrWorkerScreen theme={this.props.theme}>
      </PickRestaurantOrWorkerScreen>
    );
  }
}
