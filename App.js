import React, {Component, useState, useEffect} from 'react';
import LoginScreen from 'react-native-login-screen';
import {StatusBar, Alert} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PickRestaurantOrWorkerScreen from './src/screens/PickRestaurantOrWorkerScreen';
import PickUserRestaurantScreen from './src/screens/PickUserRestaurantScreen';
import UserScreen from './src/screens/UserScreen';
import firebaseApp from '@react-native-firebase/app';
import {firebase, FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import navigate from './src/RootNavigation'
import set from '@babel/runtime/helpers/esm/set';
import RestaurantScreens from './src/screens/RestaurantScreens';

const Stack = createStackNavigator();

export default function App(props) {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Home');

  useEffect(() => {
    (async () => {
      await requestPermission();
      await registerAppWithFCM();
    })();


    firebase.messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      if (remoteMessage.data.type === 'User' || remoteMessage.data.type === 'Restaurant') {
        navigate(remoteMessage.data.type);
      }
      Alert.alert(
        'Notification caused app to open from background state:',
        JSON.stringify(remoteMessage),
      );
    });

    // Check whether an initial notification is available
    firebase.messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          if (remoteMessage.data.type === 'User' || remoteMessage.data.type === 'Restaurant') {
            setInitialRoute(remoteMessage.data.type);
          }
        }
        setLoading(false);
      });
    const unsubscribe = firebase.messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);


  async function registerAppWithFCM() {
    await firebase.messaging().registerDeviceForRemoteMessages();
  }

  async function requestPermission() {
    const authStatus = await firebase.messaging().requestPermission({
      alert: true,
      announcement: false,
      badge: true,
      carPlay: false,
      provisional: false,
      sound: true,
    });
    if (authStatus === 1 || authStatus === 2) {
      const fcmToken = await firebase.messaging().getToken();
      console.log(fcmToken);
      console.log('Authorization status:', authStatus);
    } else {
      console.log('User declined messaging permission', authStatus);
    }
  }

  if (loading) {
    return null;
  }
  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="Home"
        component={PickRestaurantOrWorkerScreen}
      />
      <Stack.Screen
        name="Restaurant"
        component={RestaurantScreens}
      />
      <Stack.Screen
        name="User"
        component={UserScreen}
      />
    </Stack.Navigator>
  );
}
