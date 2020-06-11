import React, {useState} from 'react';
import LoginScreen from 'react-native-login-screen';
import {ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const background = require('../../resources/img/background.jpg');
import set from '@babel/runtime/helpers/esm/set';
import Logo from './Logo';
import navigate from '../RootNavigation';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Button, Paragraph} from 'react-native-paper';

import createStackNavigator from '@react-navigation/stack/src/navigators/createStackNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getLoginRequest} from '../api/APIUtils';
import {notifyMessage, userTypeEnumClass} from '../api/Utils';
import {firebase} from '@react-native-firebase/messaging';

Stack = createStackNavigator();

export default function Login(props) {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [switchValue, setSwitchValue] = useState('');
  const [spinnerEnable, setSpinnerEnable] = useState(true);
  const navigation = useNavigation();
  const userTypeEnum = new userTypeEnumClass();
  let logoComponent = Logo();

  function setUsernameUpdateSpinner(uN) {
    setUsername(uN);
    setSpinner();
  }

  function setSpinner() {
    setSpinnerEnable(getUsername() === '' || getPassword() === '');
  }

  function setPasswordUpdateSpinner(pass) {
    setPassword(pass);
    setSpinner();

  }

  function getUsername() {
    return userName;
  }

  function getPassword() {
    return password;
  }

  function goToWorker() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {name: 'HomeTempWorker'},
        ],
      }));
  }

  async function verifyLogin() {

    try {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      if (fcmToken !== null) {
        console.log(fcmToken);
      } else {
        fcmToken = await firebase.messaging().getToken();
        console.log(fcmToken);
      }
      let responseObj = await getLoginRequest({email: userName, password: password, fcmToken: fcmToken});
      if (responseObj.isSuccessful) {
        let data = responseObj.data;
        console.log(JSON.stringify(userTypeEnum));
        if (userTypeEnum.WORKER.toString() === data.userType.toString()) {

          await AsyncStorage.multiSet(
            [
              ['userId', data.userId],
              ['workerId', data.workerId],
              ['userType', data.userType.toString()],
              ['email', data.email],
              ['fName', ''],
              ['lName', ''],
              ['phone', data.phone.toString()],
            ]);
          goToWorker();
        } else if (data.userType.toString() === userTypeEnum.RESTAURANT.toString()) {
          await AsyncStorage.multiSet(
            [
              ['userId', data.userId],
              ['userType', data.userType.toString()],
              ['email', data.email],
              ['restaurantEmail', data.restaurantEmail],
              ['restaurantName', data.restaurantName],
              ['restaurantPhone', data.restaurantPhone.toString()],
              ['fName', data.fName],
              ['lName', data.lName],
              ['restaurantId', data.restaurantId]
            ]);
          console.log('about to navigate');

          goToRestaurant();
          console.log('navigated');
        } else {
          notifyMessage('Login Unsuccessful.  Please try again.');
        }
      } else {
        notifyMessage('Login Unsuccessful.  Please try again.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  function goToRestaurant() {
    console.log('navigating');

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {name: 'HomeRestaurant'},
        ],
      }));
  }

  function goToSignup() {
    navigation.navigate('RestaurantOrWorkerSignup');
  }

  return (
    <ScrollView>
      {/*<Paragraph/>*/}
      {/*<Paragraph/>*/}

      {/*<Button*/}
      {/*  icon="food"*/}
      {/*  mode="contained"*/}
      {/*  onPress={() => goToRestaurant()}*/}
      {/*>*/}
      {/*  Restaurant*/}
      {/*</Button>*/}
      {/*<Button*/}
      {/*  icon="worker"*/}
      {/*  mode="contained"*/}
      {/*  onPress={() => goToWorker()}*/}
      {/*>*/}
      {/*  Worker*/}
      {/*</Button>*/}
      <LoginScreen
        spinnerEnable={spinnerEnable}
        spinnerVisibility={true}
        logoText="Swift Staff"
        source={background}
        logoComponent={logoComponent}
        switchValue={switchValue}
        onPressLogin={() => verifyLogin()}
        onPressSettings={() => {
        }}
        onPressSignup={() => goToSignup()}
        disableSettings={true}
        disableSwitch={true}
        disableSignup={true}
        onSwitchValueChange={(sV) => setSwitchValue(sV)}
        usernameOnChangeText={(uname) => setUsernameUpdateSpinner(uname)}
        passwordOnChangeText={(paswd) => setPasswordUpdateSpinner(paswd)}
        loginButtonBackgroundColor="#a2a5a9"
      />
    </ScrollView>
  );

}
