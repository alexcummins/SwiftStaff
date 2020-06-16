import {Text, View, Image, Dimensions, StyleSheet} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import React, {useState} from 'react';
import {CommonActions, useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'
import {API_JOB_URL, WEBSOCKET_PROTOCOL} from '../../api/APIUtils';

export default function TempWorkerHomeScreen() {

  const navigation = useNavigation();

  const [workerId, setWorkerId] = useState("")

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        let keys = [];
        let vals = []
        let workerId = ""
        try {
          keys = await AsyncStorage.getAllKeys();
          vals = await AsyncStorage.multiGet(keys)
          workerId = await AsyncStorage.getItem("workerId")
          setWorkerId(workerId)
        } catch (e) {
          // read key error
        }

        console.log(vals)
      })();

    }), []);
  async function logout(){
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
    } catch(e) {
      console.error('Error clearing app data.');
    }

    console.log('logged out.')
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Login' }
        ],
      }));
  }

  function profile() {
      navigation.navigate("JobProfile", {workerId: workerId})
  }

  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
        <Image source={require('../../../resources/img/SwiftStaffLogoCroppedSmall.png')} style={styles.imageContainer}/>
        <Button
          style={{marginTop: 20 }}
          icon="logout"
          mode="contained"
          onPress={() => logout()}
        >Logout</Button>
        <Button
            icon="account-circle"
            mode="contained"
            onPress={() => profile()}
            style={{marginTop: 10 }}
        >Profile</Button>
      </View>
  )
}


const width = Dimensions.get('window').width;
const styles = StyleSheet.create({

  imageContainer: {
    flex: 1,
    maxHeight: (width / 6) * 2.2,
    aspectRatio: 2.2,
    resizeMode: 'cover'
  }
})
