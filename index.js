/**
 * @format
 */

import React, { Component, useState } from "react";

import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import App from "./App";
import { name as appName } from "./app.json";
import set from "@babel/runtime/helpers/esm/set";

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);