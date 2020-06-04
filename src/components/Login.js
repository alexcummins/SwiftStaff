import React, {useState} from 'react';
import LoginScreen from 'react-native-login-screen';
import {AsyncStorage} from 'react-native';

const background = require('../../resources/img/background.jpg');
import set from '@babel/runtime/helpers/esm/set';
import Logo from './Logo';
import navigate from '../RootNavigation';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Button, Paragraph} from 'react-native-paper';

import createStackNavigator from '@react-navigation/stack/src/navigators/createStackNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getLoginRequest} from '../api/APIUtils';
import {notifyMessage, userTypeEnum} from '../api/utils';

Stack = createStackNavigator();

export default function Login(props) {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [switchValue, setSwitchValue] = useState('');
  const [spinnerEnable, setSpinnerEnable] = useState(true);
  const navigation = useNavigation();

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
        let responseObj = await getLoginRequest({email: userName, password: password, fcmToken: fcmToken});
        if (responseObj.isSuccessful) {
          let data = responseObj.data;
          if (userTypeEnum.worker === parseInt(data.userType)) {
            await AsyncStorage.multiSet(
              [
                ['userId', data.userId],
                ['userType', parseInt(data.userType)],
                ['email', data.email],
                ['fname', data.fname],
                ['lname', data.lname],
                ['phone', data.phone],
              ]);
            goToWorker();
          } else if (data.userType === parseInt(userTypeEnum.restaurant)) {
            await AsyncStorage.multiSet(
              [
                ['userId', data.userId],
                ['userType', parseInt(data.userType)],
                ['email', data.email],
                ['restaurantEmail', data.restaurantEmail],
                ['restaurantName', data.restaurantName],
                ['restaurantPhone', data.phone],
                ['fname', data.fname],
                ['lname', data.lname],
              ]);
            goToRestaurant();
          } else {
            notifyMessage('Login Unsuccessful.  Please try again.');
          }
        } else {
          notifyMessage('Login Unsuccessful.  Please try again.');
        }
      } else {
        notifyMessage('Login Unsuccessful.  Please try again.');
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  function goToRestaurant() {
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
    <SafeAreaView>
      <Button
        icon="food"
        mode="contained"
        onPress={() => goToRestaurant()}
      >
        Restaurant
      </Button>
      <Button
        icon="worker"
        mode="contained"
        onPress={() => goToWorker()}
      >
        Worker
      </Button>
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
    </SafeAreaView>
  );

}
