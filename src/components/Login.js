import React, {useState} from 'react';
import LoginScreen from 'react-native-login-screen';
import {StatusBar, View} from 'react-native';

const background = require('../../resources/img/background.jpg');
import set from '@babel/runtime/helpers/esm/set';
import Logo from './Logo';
import navigate from '../RootNavigation';
import { CommonActions, useNavigation } from '@react-navigation/native';
import {Button, Paragraph} from "react-native-paper";

import createStackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";

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


  function goToTempUser() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'HomeTempWorker' }
        ],
      }));
  }

  function goToRestaurant() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'HomeRestaurant' }
        ],
      }));
  }

    function goToSignup() {
        navigation.navigate("RestaurantOrWorkerSignup")
    }

  return (
    <>
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
          onPress={() => goToTempUser()}
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
        onPressLogin={() => goToRestaurant()}
        onPressSettings={() => skip}
        onPressSignup={() => goToSignup()}
        disableSettings={true}
        disableSwitch={true}
        disableSignup={true}
        onSwitchValueChange={(sV) => setSwitchValue(sV)}
        usernameOnChangeText={(uname) => setUsernameUpdateSpinner(uname)}
        passwordOnChangeText={(paswd) => setPasswordUpdateSpinner(paswd)}
        loginButtonBackgroundColor="#a2a5a9"
      />
    </>
  );

}
