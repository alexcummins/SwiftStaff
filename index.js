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
import set from "@babel/runtime/helpers/esm/set";
import { navigationRef } from './src/RootNavigation';

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
