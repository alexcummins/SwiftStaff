import React, { Component, useState } from "react";
import LoginScreen from "react-native-login-screen";
import { StatusBar } from "react-native";

const source = require("./resources/img/background.jpg");
import set from "@babel/runtime/helpers/esm/set";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <PickRestaurantOrWorkerScreen>
      </PickRestaurantOrWorkerScreen>
    );
  }
}
