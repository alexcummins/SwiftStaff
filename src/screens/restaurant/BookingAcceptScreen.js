import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView} from "react-native";
import AcceptedWorkerCard from "../../components/AcceptedWorkerCard";


export default function BookingPendingScreen() {

    return (
        <ScrollView>
            <AcceptedWorkerCard/>
        </ScrollView>
    );

}