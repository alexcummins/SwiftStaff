import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView} from "react-native";
import {Title, Button, Paragraph} from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TempWorkerOffersScreen from '../Worker/TempWorkerOffersScreen';
import RequestWorkerScreen from './RequestWorkerScreen';
import RestaurantHomeScreen from './RestaurantHomeScreen';


export default function RestaurantScreens({ navigation }) {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator tabBarPosition="bottom" initialRouteName="Home">
      <Tab.Screen name="Bookings" component={TempWorkerOffersScreen} />
      <Tab.Screen name="Home" component={RestaurantHomeScreen} />
      <Tab.Screen name="Request" component={RequestWorkerScreen} />
    </Tab.Navigator>
  )
}
