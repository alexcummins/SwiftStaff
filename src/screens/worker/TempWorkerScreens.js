import React, { useState } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TempWorkerOffersScreen from './TempWorkerOffersScreen';
import RequestWorkerScreen from '../restaurant/RequestWorkerScreen';
import TempWorkerHomeScreen from './TempWorkerHomeScreen';


export default function RestaurantScreens({ navigation }) {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator tabBarPosition="bottom" initialRouteName="Home">
      <Tab.Screen name="Offers" component={TempWorkerOffersScreen} />
      <Tab.Screen name="Home" component={TempWorkerHomeScreen} />
      <Tab.Screen name="Confirmed" component={TempWorkerOffersScreen} />
    </Tab.Navigator>
  )
}
