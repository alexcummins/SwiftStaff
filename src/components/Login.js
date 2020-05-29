import React, { Component, useState } from "react";
import LoginScreen from "react-native-login-screen";
import { StatusBar } from "react-native";

const source = require("./resources/img/background.jpg");
import set from "@babel/runtime/helpers/esm/set";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      switchValue: true,
      spinnerEnable: true,
    };
  }

  setSwitchValue(value) {
    this.setState({ switchValue: value });
  }

  setUsername(uN) {
    this.setState({ userName: uN }, () => {
      this.setSpinner();
    });
  }

  setSpinner() {
    this.setState({
      spinnerEnable: this.getUsername() === "" || this.getPassword() === "",
    });
  }
  setPassword(pass) {
    this.setState({ password: pass }, () => {
      this.setSpinner();
    });
  }
  getUsername() {
    return this.state.userName;
  }
  getPassword() {
    return this.state.password;
  }
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <LoginScreen
          spinnerEnable={this.state.spinnerEnable}
          spinnerVisibility
          logoText="Swift Staff"
          source={source}
          switchValue={this.state.switchValue}
          onPressLogin={() => alert("Login Button is pressed")}
          onPressSettings={() => alert("Settings Button is pressed")}
          onSwitchValueChange={(sV) => this.setSwitchValue(sV)}
          usernameOnChangeText={(username) => this.setUsername(username)}
          passwordOnChangeText={(password) => this.setPassword(password)}
          loginButtonBackgroundColor="#a2a5a9"
        />
      </>
    );
  }
}
