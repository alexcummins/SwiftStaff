import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TempWorkerOffersScreen from './TempWorkerOffersScreen';
import ConfirmedScreen from './ConfirmedScreen';
import TempWorkerHomeScreen from './TempWorkerHomeScreen';
import AsyncStorage from '@react-native-community/async-storage'

export default function TempWorkerScreens({ navigation }) {
  const Tab = createMaterialTopTabNavigator();

  useEffect(() => {
      let workerId;
      (async () => workerId = await AsyncStorage.getItem("workerId"))
    getJobRequest({workerId: workerId}).then((data) => {
      setJobsList(data.reverse());
    });
  }, []);
  let tempOffersScreen = function(){
    return (<TempWorkerOffersScreen preFetchDataJobList={jobsList}/>)
  }

  let tempOffersScreenAccepted = function () {
    return (<TempWorkerOffersScreen preFetchDataJobList={jobsList} accepted={true}/>)
  }

  return (
    <Tab.Navigator tabBarPosition="bottom" initialRouteName="Home">
      <Tab.Screen name="Home" component={TempWorkerHomeScreen} />
      <Tab.Screen name="Confirmed" component={tempOffersScreenAccepted} />
      {/*<Tab.Screen name="Confirmed" component={ConfirmedScreen} />*/}
    </Tab.Navigator>
  )
}