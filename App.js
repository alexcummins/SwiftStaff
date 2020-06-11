import React, {useState, useEffect} from 'react';
import {Alert, View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import {createStackNavigator} from '@react-navigation/stack';
import OffersScreen from './src/screens/worker/OffersScreen';
import {firebase} from '@react-native-firebase/messaging';
import navigate, {navigationRef} from './src/RootNavigation';
import RestaurantScreens from './src/screens/restaurant/RestaurantScreens';
import Login from './src/components/Login';
import set from '@babel/runtime/helpers/esm/set';
import {NavigationContainer} from '@react-navigation/native';
import RestaurantOrWorkerSignup from "./src/screens/signup/RestaurantOrWorkerSignup";
import RestaurantProfileScreen from "./src/screens/restaurant/RestaurantProfileScreen";
import TempWorkerProfileScreen from "./src/screens/worker/TempWorkerProfileScreen";
import TempWorkerScreens from "./src/screens/worker/TempWorkerScreens";
import WorkerSignup from "./src/screens/signup/WorkerSignup";
import RestaurantSignup from "./src/screens/signup/RestaurantSignup";
import {userTypeEnumClass} from './src/api/Utils';

const Stack = createStackNavigator();

export default function App({navigator}) {
  const [loading, setLoading] = useState(true);
  const [storageChecked, setStorageChecked] = useState(false);
  const [initialRoute, setInitialRoute] = useState("Login");
  const userTypeEnum = new userTypeEnumClass()

  async function checkLogin() {
    let userType = await AsyncStorage.getItem('userType');
    if (userType !== null) {
      if (userType.toString() === userTypeEnum.WORKER.toString()) {
        setInitialRoute('HomeTempWorker');
      } else if (userType.toString() === userTypeEnum.RESTAURANT.toString()) {
        setInitialRoute('HomeRestaurant');
      }

      console.log(initialRoute);
    } else {
      console.log('Not logged In');
    }
    setStorageChecked(true);
  }

  useEffect(() => {
    (async () => {
      await registerAppWithFCM();
      await requestPermission();
      await checkLogin();
    })();


    firebase.messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      if (remoteMessage.data.type === 'User' || remoteMessage.data.type === 'restaurant') {
        navigate(remoteMessage.data.type);
      }
      // Alert.alert(
      //     'Notification caused app to open from background state:',
      //     JSON.stringify(remoteMessage),
      // );
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
          if (remoteMessage.data.type === 'User' || remoteMessage.data.type === 'restaurant') {
            // setInitialRoute(remoteMessage.data.type);
          }
        }
        setLoading(false);
      });
    const unsubscribe = firebase.messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
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
      await AsyncStorage.setItem('fcmToken', fcmToken);
      console.log(fcmToken);
      console.log('Authorization status:', authStatus);
    } else {
      console.log('User declined messaging permission', authStatus);
    }
  }

  if (loading || !storageChecked) {
    console.log("loading")
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
      <Stack.Screen name="HomeRestaurant" component={RestaurantScreens} options={{headerShown: false, title:'Back'}} />
      {/*<Stack.Screen name="HomeTempWorker" component={TempWorkerScreens} options={{headerShown: false, title:'Back'}}/>*/}
      <Stack.Screen name="HomeTempWorker" component={TempWorkerScreens} />

      <Stack.Screen name="RestaurantOrWorkerSignup" component={RestaurantOrWorkerSignup}
                    options={{title: 'Sign up'}}/>
      <Stack.Screen name="RestaurantSignup" component={RestaurantSignup} options={{title: 'Restaurant Signup'}}/>
      <Stack.Screen name="WorkerSignup" component={WorkerSignup} options={{title: 'Worker Signup'}}/>
      <Stack.Screen name="JobProfile" component={TempWorkerProfileScreen} options={{headerShown: true, title: 'Profile'}} />
      <Stack.Screen name="RestaurantProfile" component={RestaurantProfileScreen} />
    </Stack.Navigator>
  )
}