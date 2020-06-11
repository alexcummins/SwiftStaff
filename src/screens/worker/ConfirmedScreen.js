import React from "react";
import {View, StyleSheet, SafeAreaView} from "react-native";
import {Title, Button, Paragraph} from 'react-native-paper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from "@react-navigation/native";
import ConfirmedUpcomingScreen from './ConfirmedUpcomingScreen'
import ConfirmedCompletedScreen from './ConfirmedCompletedScreen'

export default function ConfirmedScreen({navigation}) {

  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator tabBarPosition="top" initialRouteName="Upcoming"
                   tabBarOptions={tabBarOptions}
    >
      <Tab.Screen name="Upcoming" component={ConfirmedUpcomingScreen}/>
      <Tab.Screen name="Completed" component={ConfirmedUpcomingScreen}/>
    </Tab.Navigator>
  )

  const tabBarOptions = {
    activeTintColor: '#000000', // tab text color
    inactiveTintColor: '#a19f9f',
    labelStyle: {
      marginTop: 40,
      marginBottom: 4,
    }
  }
}