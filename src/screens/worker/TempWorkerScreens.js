import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OffersScreen from './OffersScreen';
import ConfirmedScreen from './ConfirmedScreen';
import TempWorkerHomeScreen from './TempWorkerHomeScreen';

export default function TempWorkerScreens({ navigation }) {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator tabBarPosition="bottom" initialRouteName="Home">
      <Tab.Screen name="Offers">
        {OffersScreen}
      </Tab.Screen>
      <Tab.Screen name="Home" component={TempWorkerHomeScreen} />
      <Tab.Screen name="Confirmed" component={ConfirmedScreen} />
    </Tab.Navigator>
  )
}
