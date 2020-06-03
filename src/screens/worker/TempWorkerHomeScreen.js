import {Text, View} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import React from 'react';
import {CommonActions, useNavigation} from '@react-navigation/native';

export default function TempWorkerHomeScreen() {

  const navigation = useNavigation();

  function logout(){
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Login' }
        ],
      }));
  }

  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
        <Text>SwiftStaff</Text>
        <Button
          icon="logout"
          mode="contained"
          onPress={() => logout()}
        >Logout</Button>
      </View>
  )
}
