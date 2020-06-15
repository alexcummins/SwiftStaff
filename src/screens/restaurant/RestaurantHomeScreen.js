import {Text, View} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import React, {useState} from 'react';
import {CommonActions, useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {getRestaurantProfile} from '../../api/APIUtils';

export default function RestaurantHomeScreen({data}) {

  const navigation = useNavigation();
  const [restaurantId, setRestaurantId] = useState('')

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        let keys = [];
        let vals = []
        let restaurantId = ""
        try {
            keys = await AsyncStorage.getAllKeys();
            vals = await AsyncStorage.multiGet(keys)
            restaurantId = await AsyncStorage.getItem("restaurantId")
            setRestaurantId(restaurantId)
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

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Login' }
        ],
      }));
  }

  function profile() {
    navigation.navigate("RestaurantProfile", {restaurantId: restaurantId})
  }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>SwiftStaff</Text>
            <Button
                icon="logout"
                mode="contained"
                onPress={() => logout()}
            >Logout</Button>
            <Button
                icon="account-circle"
                mode="contained"
                onPress={() => profile()}
            >Profile</Button>
        </View>
    )
}
