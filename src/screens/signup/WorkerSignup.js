import {Button, Text, TextInput} from "react-native-paper";
import React, {useState} from "react";
import {View, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard} from "react-native";
import {sendSignup} from "../../api/APIUtils";
import {CommonActions} from "@react-navigation/native";
import {notifyMessage} from "../../api/utils";
import FormBuilder from "react-native-paper-form-builder";
import {useForm} from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function WorkerSignup({route, navigation}) {
    const {email} = route.params
    const {password} = route.params
    const [dob, setDob] = useState(new Date(2000, 0, 1));
    const [show, setShow] = useState(false)
    const [loading, setloading] = useState(false);

    async function createAccount(data) {
        data.email = JSON.stringify(email)
        data.password = JSON.stringify(password)
        setloading(true)
        const response = await sendSignup(data)
        if (response.isSuccessful) {
            // navigation.dispatch(
            //     CommonActions.reset({
            //         index: 0,
            //         routes: [
            //             {name: 'HomeRestaurant'}
            //         ],
            //     }));
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {name: 'HomeTempWorker'}
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
            fName: '',

            lName: '',
        },
        mode: 'onChange',
    });

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dob;
        setShow(Platform.OS === 'ios')
        setDob(currentDate);
    };

    function showDatePicker() {
        console.log("focused on dob text field")
        setShow(true);
    }

    function getDOBString() {
        return `${dob.getDay()}/${dob.getMonth() + 1}/${dob.getFullYear()}`;
    }

    return (
        <View style={styles.containerStyle}>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <Text style={styles.headingStyle}>About you</Text>
                <FormBuilder
                    form={form}
                    formConfigArray={[
                        {

                            type: 'input',

                            name: 'fName', // Same as defined in default values

                            label: "First name",

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

                            name: 'lName', // Same as defined in default values

                            label: "Last name",

                            variant: 'outlined',

                            rules: {
                                required: {
                                    value: true,

                                    message: 'Last name is required',
                                },
                            },
                        },

                        {

                            type: 'input',

                            name: 'phone', // Same as defined in default values

                            label: "Phone number",

                            variant: 'outlined',

                            rules: {
                                required: {
                                    value: true,

                                    message: 'Last name is required',
                                },
                            },

                            textInputProps: {
                                keyboardType: 'numeric'
                            }
                        },
                    ]}>
                </FormBuilder>

                <TouchableWithoutFeedback>
                    <TextInput
                        label='Date of birth'
                        value={getDOBString()}
                        caretHidden={true}
                        onFocus={showDatePicker}
                        onKeyPress={Keyboard.dismiss()}
                    />
                </TouchableWithoutFeedback>

                {(show && <DateTimePicker
                        testID="dateTimePicker"
                        show={show}
                        value={dob}
                        mode='date'
                        display="default"
                        onChange={onChange}
                    />
                )}

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


