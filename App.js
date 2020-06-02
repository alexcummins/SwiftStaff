import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import TempWorkerOffersScreen from './src/screens/Worker/TempWorkerOffersScreen';
import {firebase} from '@react-native-firebase/messaging';
import navigate, {navigationRef} from './src/RootNavigation';
import RestaurantScreens from './src/screens/Restaurant/RestaurantScreens';
import Login from './src/components/Login';
import set from '@babel/runtime/helpers/esm/set';
import {NavigationContainer} from '@react-navigation/native';
import TempWorkerScreens from './src/screens/Worker/TempWorkerScreens';
import RestaurantOrWorkerSignup from "./src/screens/Signup/RestaurantOrWorkerSignup";

const Stack = createStackNavigator();

export default function App({navigator}) {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Home');

  useEffect(() => {
    (async () => {
      await registerAppWithFCM();
      await requestPermission();
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
    console.log('registering');
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
  let isRestaurant = true;
  let isTempWorker = true;
  let isSignedIn = false;
  return (

    (isSignedIn && isRestaurant) ? (
      <Stack.Navigator headerMode={false} >
        <Stack.Screen name="HomeRestaurant" component={RestaurantScreens}/>
      </Stack.Navigator>

    ) : (isSignedIn && isTempWorker) ? (
      <Stack.Navigator headerMode={false} >
        <Stack.Screen name="HomeTempWorker" component={TempWorkerScreens}/>
      </Stack.Navigator>

    ) : (
        <Stack.Navigator headerMode={false} >
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="HomeRestaurant" component={RestaurantScreens}/>
          <Stack.Screen name="HomeTempWorker" component={TempWorkerScreens}/>
          <Stack.Screen name="WorkerOrRestaurantSignup" component={RestaurantOrWorkerSignup}/>
        </Stack.Navigator>

    )
  );

}



