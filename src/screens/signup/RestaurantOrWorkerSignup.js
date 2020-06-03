import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Button, Paragraph, Text, TextInput, Title} from 'react-native-paper';

export default function RestaurantOrWorkerSignup({navigation}) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isError, setIsError] = useState(false);

    function checkError() {
        console.log(password === confirmPassword)
        if (confirmPassword !== "") {
            setIsError(password !== confirmPassword)
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', margin:5}}>
            <TextInput
                mode='outlined'
                label={"Email"}
                value={email}
                onChangeText={email => setEmail(email)}
                autoCorrect={false}
                textContentType="username"
                keyboardType="email-address"
            >
            </TextInput>
            <TextInput
                mode='outlined'
                label={"Password"}
                value={password}
                onChangeText={password => setPassword(password)}
                onEndEditing={checkError}
                textContentType="newPassword"
                secureTextEntry={true}
            >
            </TextInput>
            <TextInput
                mode='outlined'
                label={"Confirm Password"}
                value={confirmPassword}
                error={isError}
                onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                onEndEditing={checkError}
                textContentType="newPassword"
                secureTextEntry={true}
            >
            </TextInput>
        </View>
    );
}
