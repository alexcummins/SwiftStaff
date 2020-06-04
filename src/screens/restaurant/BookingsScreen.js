import React from "react";
import { View, StyleSheet, SafeAreaView} from "react-native";
import {Title, Button, Paragraph} from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BookingPendingScreen from './BookingPendingScreen';
import BookingAcceptScreen from './BookingAcceptScreen';


export default function RestaurantScreens({ navigation }) {
    const Tab = createMaterialTopTabNavigator();

    return (
            <Tab.Navigator tabBarPosition="top" initialRouteName="Pending"
                           // headerStyle={[styles.header]}
                           // labelStyle={styles.label}
                           // underlineStyle={styles.underline}
                           // imageStyle={styles.image}
                           // sidePadding={10}
                           // inactiveOpacity={0.4}
                           // fadeLabels={true}
            >
                <Tab.Screen name="Pending" component={BookingPendingScreen} />
                <Tab.Screen name="Accepted" component={BookingAcceptScreen} />
            </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#cecece',
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 15,
        fontWeight: '500',
        color: '#fff'
    },
    image: {
        height: 20,
        width: 20,
        tintColor: '#e6faff'
    },
    underline: {
        height: 1,
        backgroundColor: '#1c1c1c',
        width: 40
    }
});
