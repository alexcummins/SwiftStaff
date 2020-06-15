import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Avatar, Button, HelperText, RadioButton, Subheading, Surface, Text, TextInput, Title} from 'react-native-paper';
import {sendSignup} from "../../api/APIUtils";
import {CommonActions} from "@react-navigation/native";
import {notifyMessage} from "../../api/Utils";

export default function RestaurantOrWorkerSignup({navigation}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [userType, setUserType] = useState("");

    const userTypeEnum = {restaurant: 1, worker: 2}

    function checkPasswordError() {
        if (confirmPassword !== "") {
            setIsPasswordError(password !== confirmPassword)
        }
    }

    function checkEmailError() {
        if (email !== "") {
            setIsEmailError(!email.includes("@"))
        }
    }

    function nextPageSignup() {
        let credentials = {email: email, password: password}
        if (userType === userTypeEnum.worker) {
            navigation.navigate("WorkerSignup", credentials)
        }
        if (userType === userTypeEnum.restaurant) {
            navigation.navigate("RestaurantSignup", credentials)
        }
    }

    return (
        <>
            <Avatar.Icon size={128} icon="account" style={{margin: 15, alignSelf: "center"}}/>
            <View style={{margin: 5}}>
                <TextInput
                    mode='outlined'
                    label={"Email"}
                    value={email}
                    onChangeText={email => setEmail(email)}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onEndEditing={checkEmailError}
                    error={isEmailError}
                    textContentType="username"
                    keyboardType="email-address"
                >
                </TextInput>
                <HelperText
                    type="error"
                    visible={isEmailError}
                >
                    Invalid email address.
                </HelperText>
                <TextInput
                    mode='outlined'
                    label={"Password"}
                    value={password}
                    onChangeText={password => setPassword(password)}
                    onEndEditing={checkPasswordError}
                    textContentType="newPassword"
                    secureTextEntry={true}
                >
                </TextInput>
                <TextInput
                    mode='outlined'
                    label={"Confirm Password"}
                    value={confirmPassword}
                    error={isPasswordError}
                    onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                    onEndEditing={checkPasswordError}
                    textContentType="newPassword"
                    secureTextEntry={true}
                >
                </TextInput>
                <HelperText
                    type="error"
                    visible={isPasswordError}
                >
                    Password and confirm password must be the same.
                </HelperText>
            </View>
            <View>
                <Surface style={{elevation: 5}}>
                    <RadioButton.Group
                        onValueChange={value => setUserType(value)}
                        value={userType}
                    >
                        <RadioButton.Item icon="account-tie" label="Business Manager" value={userTypeEnum.restaurant}
                                          style={{color: 'red'}}/>
                        <RadioButton.Item icon="worker" label="Worker" value={userTypeEnum.worker}/>
                    </RadioButton.Group>
                </Surface>
            </View>
            <Button icon="account-arrow-right" mode={"contained"} onPress={() => nextPageSignup()}
                    disabled={isEmailError || isPasswordError || email === "" || password === ""
                    || confirmPassword === "" || userType === ""}
                    style={{marginTop: 30, marginLeft: 5, marginRight: 5, flexDirection: "column-reverse"}}>
                Next
            </Button>
        </>
    )
}
