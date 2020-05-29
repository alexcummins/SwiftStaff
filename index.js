/**
 * @format
 */

import React, { Component, useState } from "react";
import "react-native-gesture-handler";

import { AppRegistry } from "react-native";
import {DefaultTheme,  Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import App from "./App";
import { name as appName } from "./app.json";
import set from "@babel/runtime/helpers/esm/set";

const theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 20,
  colors: {
    ...DefaultTheme.colors,
    primary: '#157EFB',
    accent: '#f1c40f',
  }
};
export default function Main() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <App theme={theme} />
      </PaperProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Main);
