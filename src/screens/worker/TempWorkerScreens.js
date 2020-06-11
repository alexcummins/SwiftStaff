import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TempWorkerOffersScreen from './TempWorkerOffersScreen';
import OffersScreen from './OffersScreen';
import RequestWorkerScreen from '../restaurant/RequestWorkerScreen';
import TempWorkerHomeScreen from './TempWorkerHomeScreen';
import {getJobRequest} from '../../api/APIUtils';
import AsyncStorage from '@react-native-community/async-storage'






export default function RestaurantScreens({ navigation }) {
  const Tab = createMaterialTopTabNavigator();
  const [jobsList, setJobsList] = useState([])

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
  return (
    <Tab.Navigator tabBarPosition="bottom" initialRouteName="Home">
      <Tab.Screen name="Offers">
        {tempOffersScreen}
      </Tab.Screen>
      <Tab.Screen name="Home" component={TempWorkerHomeScreen} />
      <Tab.Screen name="Confirmed" component={OffersScreen} />
    </Tab.Navigator>
  )
}
