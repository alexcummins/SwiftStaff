import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Button, Paragraph, Text, TextInput, Title} from 'react-native-paper';

export default function RestaurantOrWorkerSignup({navigation}) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    return (
        <View style={{ margin: 5, justifyContent: 'center'}}>
            <TextInput
                mode='outlined'
                label={"Email"}
                value={email}
                onChangeText={email => setEmail(email)}
                textContentType="username"
                keyboardType="email-address"
            >
            </TextInput>
            <TextInput
                mode='outlined'
                label={"Password"}
                value={password}
                onChangeText={password => setPassword(password)}
                textContentType="password"
            >
            </TextInput>
            <TextInput
                mode='outlined'
                label={"Confirm Password"}
                value={confirmPassword}
                onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
            >
            </TextInput>
        </View>
    );
}