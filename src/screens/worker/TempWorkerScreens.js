import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OffersScreen from './OffersScreen';
import ConfirmedScreen from './ConfirmedScreen';
import TempWorkerHomeScreen from './TempWorkerHomeScreen';
<<<<<<< HEAD
=======
import {getJobRequest} from '../../api/APIUtils';
import AsyncStorage from '@react-native-community/async-storage'
>>>>>>> 7415e97fee98988cb5ef687fa8658cb3ae145cf9

export default function TempWorkerScreens({ navigation }) {
  const Tab = createMaterialTopTabNavigator();

<<<<<<< HEAD
=======
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
>>>>>>> 7415e97fee98988cb5ef687fa8658cb3ae145cf9
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
