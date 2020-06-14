import {Text, View} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import {CommonActions, useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {getRestaurantProfile} from '../../api/APIUtils';

export default function RestaurantHomeScreen({data}) {

    const navigation = useNavigation();
    const [restaurantData, setRestaurantData] = useState({})
    const [isActive, setIsActive] = useState(true)

    useEffect(() => {
          (async () => {
                let restaurantId = ""
                try {
                    restaurantId = await AsyncStorage.getItem("restaurantId")
                } catch (e) {
                    // read key error
                }
                const restaurant = await getRestaurantProfile({restaurantId: restaurantId});
                setRestaurantData(restaurant)
            })();
          return ()=>{}

        }, []);

    async function logout() {
        try {
            const keys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(keys);
        } catch (e) {
            console.error('Error clearing app data.');
        }

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {name: 'Login'}
                ],
            }));
    }

    function profile() {
        console.log("Restaurant data:")
        console.log(JSON.stringify(restaurantData))
        navigation.navigate("RestaurantProfile", restaurantData)
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
