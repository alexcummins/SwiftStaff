import {Button, Text, TextInput} from "react-native-paper";
import React, {useState} from "react";
import {View, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard} from "react-native";
import {sendRestaurantSignup} from "../../api/APIUtils";
import {CommonActions} from "@react-navigation/native";
import {notifyMessage} from "../../api/utils";
import FormBuilder from "react-native-paper-form-builder";
import {useForm} from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-community/async-storage";

export default function RestaurantSignup({route, navigation}) {
    const {email} = route.params
    const {password} = route.params
    const [loading, setloading] = useState(false);

    async function createAccount(data) {
        data.email = JSON.stringify(email)
        data.password = JSON.stringify(password)
        setloading(true)
        let response = await sendRestaurantSignup(data)
        console.log(JSON.stringify(response))
        if (response.isSuccessful) {
            await AsyncStorage.multiSet(
                [
                    ['userId', response.data.id],
                    ['userType', "1"],
                    ['email', data.email],
                    ['restaurantEmail', data.restaurantEmailAddress],
                    ['restaurantName', data.name],
                    ['restaurantAddress', data.address],
                    ['restaurantPhone', data.phone.toString()]
                ])
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {name: 'HomeRestaurant'}
                    ],
                }));
        } else {
            setloading(false)
            notifyMessage("Signup failed. Please check your internet connection and try again.")
            console.log("Signup failed. Please check your internet connection and try again.")
        }
    }

    const form = useForm({
        defaultValues: {
            name: '',

            address: '',

            phone: '',

            restaurantEmailAddress: ''
        },
        mode: 'onChange',
    });

    return (
        <View style={styles.containerStyle}>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <Text style={styles.headingStyle}>About you</Text>
                <FormBuilder
                    form={form}
                    formConfigArray={[
                        {

                            type: 'input',

                            name: 'name', // Same as defined in default values

                            label: "Restaurant name",

                            variant: 'outlined',

                            rules: {
                                required: {
                                    value: true,

                                    message: 'First name is required',
                                },

                            }
                        },

                        {

                            type: 'input',

                            name: 'address', // Same as defined in default values

                            label: "Restaurant address",

                            variant: 'outlined',

                            rules: {
                                required: {
                                    value: true,

                                    message: 'Address is required',
                                },
                            },
                        },

                        {

                            type: 'input',

                            name: 'phone', // Same as defined in default values

                            label: "Restaurant phone number",

                            variant: 'outlined',

                            rules: {
                                required: {
                                    value: true,

                                    message: 'Phone number is required',
                                },
                            },

                            textInputProps: {
                                keyboardType: 'numeric'
                            }
                        },

                        {

                            type: 'input',

                            name: 'restaurantEmailAddress', // Same as defined in default values

                            label: "Restaurant email address",

                            variant: 'outlined',

                            rules: {
                                required: {
                                    value: true,

                                    message: 'Address is required',
                                },
                            },
                        }
                    ]}>
                </FormBuilder>

                <Button icon="account" mode={"contained"}
                        onPress={form.handleSubmit((data: any) => createAccount(data))}
                        disabled={loading}
                        loading={loading}
                        style={{marginTop: 30, marginLeft: 5, marginRight: 5, flexDirection: "column-reverse"}}>
                    Sign up
                </Button>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
    },

    scrollViewStyle: {
        flex: 1,

        padding: 15,

        justifyContent: 'center',
    },

    headingStyle: {
        fontSize: 30,

        textAlign: 'center',

        marginBottom: 40,
    },
});
