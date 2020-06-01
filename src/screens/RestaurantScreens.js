import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView} from "react-native";
import {Title, Button, Paragraph} from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserScreen from './UserScreen';
import PickUserRestaurantScreen from './PickUserRestaurantScreen';


export default function RestaurantScreens({ navigation }) {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator tabBarPosition="bottom">
      <Tab.Screen name="Home" component={UserScreen} />
      <Tab.Screen name="Settings" component={PickUserRestaurantScreen} />
      <Tab.Screen name="Users" component={UserScreen} />
    </Tab.Navigator>
  )
}
