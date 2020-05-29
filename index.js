/**
 * @format
 */

import React, { Component, useState } from "react";

import { AppRegistry } from "react-native";
import {DefaultTheme,  Provider as PaperProvider } from "react-native-paper";
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
    <PaperProvider theme={theme}>
      <App theme={theme}/>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
