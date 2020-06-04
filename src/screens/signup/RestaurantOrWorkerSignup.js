import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Avatar, Button, HelperText, RadioButton, Surface, Text, TextInput, Title} from 'react-native-paper';
import {sendSignup} from "../../api/APIUtils";
import {CommonActions} from "@react-navigation/native";
import {notifyMessage, userTypeEnumClass} from '../../api/utils';

export default function RestaurantOrWorkerSignup({navigation}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [userType, setUserType] = useState("");
    const [loading, setloading] = useState(false);
    const userTypeEnum = new userTypeEnumClass()
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

    async function createAccount() {
        setloading(true)
        const response = await sendSignup({email: email, password: password, userType: userType})
        if (response.isSuccessful) {
            if (userType === userTypeEnum.RESTAURANT) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'HomeRestaurant' }
                        ],
                    }));
            }
            else if (userType === userTypeEnum.WORKER) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'HomeTempWorker' }
                        ],
                    }));
            }
        }
        else {
            setloading(false)
            notifyMessage("Signup failed. Please check your internet connection and try again.")
            console.log("Signup failed. Please check your internet connection and try again.")
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
                        label={"Are you a:"}
                        onValueChange={value => setUserType(value)}
                        value={userType}
                    >
                        <RadioButton.Item icon="food" label="Restaurant Manager" value={userTypeEnum.restaurant}/>
                        <RadioButton.Item icon="worker" label="Worker" value={userTypeEnum.worker}/>
                    </RadioButton.Group>
                </Surface>
            </View>
            <Button icon="account" mode={"contained"} onPress={() => createAccount()}
                    disabled={isEmailError || isPasswordError || email === "" || password === ""
                              || confirmPassword === "" || userType === "" || loading}
                    loading={loading}
                    style={{marginTop: 30, marginLeft: 5, marginRight: 5, flexDirection: "column-reverse"}}>
                Sign up
            </Button>
        </>
    )
}
