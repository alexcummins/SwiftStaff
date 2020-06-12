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
import {firebase} from '@react-native-firebase/messaging';
import { navigationRef } from './src/RootNavigation';
import set from "@babel/runtime/helpers/esm/set";

const theme = {
  ...DefaultTheme,
  dark: false,
  roundness:10,
  colors: {
    ...DefaultTheme.colors,
    primary: '#38B6FF',
    accent: '#EF2E51',
  }
};

// Register background handler
firebase.messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});



function Main() {
  return (
    <NavigationContainer ref={navigationRef}>
      <PaperProvider theme={theme}>
        <App theme={theme} />
      </PaperProvider>
    </NavigationContainer>
  );
}

export default  function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <Main />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
