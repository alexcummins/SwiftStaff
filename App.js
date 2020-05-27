/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useState} from 'react';
import LoginScreen from 'react-native-login-screen';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import set from '@babel/runtime/helpers/esm/set';

const source = require('./resources/img/background.jpg');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {userName: '', password: '', switchValue: true, spinnerEnable: true};
  }

  setSwitchValue(value) {
    this.setState({switchValue: value});
  }

  setUsername(uN) {
    this.setState({userName: uN}, () => {
      this.setSpinner();
    });
  }

  setSpinner(){
      this.setState({spinnerEnable: this.getUsername() === '' || this.getPassword() === ''})
  }
  setPassword(pass) {
    this.setState({password:  pass}, () => {
      this.setSpinner();
    });
  }
  getUsername() {
    return this.state.userName;
  }
  getPassword() {
    return this.state.password;
  }
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
          <LoginScreen
            spinnerEnable={this.state.spinnerEnable}
            spinnerVisibility
            logoText="Swift Staff"
            source={source}
            switchValue={this.state.switchValue}
            onPressLogin={() => alert('Login Button is pressed')}
            onPressSettings={() => alert('Settings Button is pressed')}
            onSwitchValueChange={sV => this.setSwitchValue(sV)}
            usernameOnChangeText={username => this.setUsername(username)}
            passwordOnChangeText={password => this.setPassword(password)}
            loginButtonBackgroundColor="#a2a5a9"
          />
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
