import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView} from "react-native";
import {Title, Button, Paragraph} from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RequestWorkerScreen from './RequestWorkerScreen';
import RestaurantHomeScreen from './RestaurantHomeScreen';
import BookingsScreen from "./BookingsScreen";


export default function RestaurantScreens({ navigation }) {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator tabBarPosition="bottom" initialRouteName="Home">
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Home" component={RestaurantHomeScreen} />
      <Tab.Screen name="Request" component={RequestWorkerScreen} />
    </Tab.Navigator>
  )
}
