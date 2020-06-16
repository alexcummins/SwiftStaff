import React, {useState} from 'react';

import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    ToastAndroid,
    Platform,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import {useForm} from 'react-hook-form';

import {Button, Dialog, HelperText, Paragraph, Portal, TextInput} from 'react-native-paper';
import {sendJobRequest} from '../api/APIUtils';
import {notifyMessage} from '../api/Utils';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import DateTimePicker from "@react-native-community/datetimepicker";
import {max} from "react-native-reanimated";
import SelectCredentials from "./SelectCredentials";

function RequestForm() {

    useFocusEffect(
        React.useCallback(() => {
            (async () => {

                try {
                    let keys = await AsyncStorage.getAllKeys();
                    // console.log(JSON.stringify(keys))
                    let restId = await AsyncStorage.getItem("restaurantId");
                    // console.log(restId)
                    setRestaurantId(restId);
                } catch (e) {
                    console.log("no restaurantId found - setting default");
                }

            })();
        }), []);

    const [restaurantId, setRestaurantId] = useState("")

    const [hourlyRate, setHourlyRate] = useState("")
    const [isHourlyRateError, setIsHourlyRateError] = useState(false)
    const [date, setDate] = useState(new Date(Date.now()))
    const [dateString, setDateString] = useState(generateDateString(date))

    const [startOrEnd, setStartOrEnd] = useState("start")
    const [startTime, setStartTime] = useState(new Date(Date.now()))
    const [startString, setStartString] = useState("")
    const [endString, setEndString] = useState("")
    const [endTime, setEndTime] = useState(new Date(Date.now()))
    const [endTimeError, setEndTimeError] = useState(false)

    const [showDate, setShowDate] = useState(false)
    const [showTime, setShowTime] = useState(false)

    const [credentials, setCredentials] = useState([])

    const [extraInfo, setExtraInfo] = useState("")

    const [showJobConfirmation, setShowJobConfirmation] = useState(false)
    const [refresh, setRefresh] = useState(false)


    function clearForm(){
        setHourlyRate("")
        setIsHourlyRateError(false)
        setDate(new Date(Date.now()))
        setDateString(generateDateString(date))
        setStartOrEnd("start")
        setStartTime(new Date(Date.now()))
        setStartString("")
        setEndString("")
        setEndTime(new Date(Date.now()))
        setEndTimeError(false)
        setShowDate(false)
        setShowTime(false)
        setCredentials([])
        setExtraInfo("")
        setRefresh(!refresh)
        setShowJobConfirmation(false)
    }

    function generateDateString(d) {
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    function generateTimeString(time) {
        let hours = time.getHours()
        if (hours.toString().length === 1) {
            hours = `0${hours}`
        }
        let minutes = time.getMinutes()
        if (minutes.toString().length === 1) {
            minutes = `0${minutes}`
        }
        return `${hours}:${minutes}`
    }

    function onChangeDate(event, selectedDate) {
        const currentDate = selectedDate || date;
        setShowDate(Platform.OS === 'ios' ? showDate : false)
        setDate(currentDate)
        setDateString(generateDateString(currentDate))
    }

    function showDatePicker() {
        setShowDate(true);
    }

    function onChangeTime(event, selectedTime) {
        let currentTime;
        let start = startTime;
        let end = endTime;
        if (startOrEnd === "start") {
            currentTime = selectedTime || startTime;
            start = currentTime
            setShowTime(Platform.OS === 'ios' ? showTime : false)
            setStartTime(currentTime)
            setStartString(generateTimeString(currentTime))
        } else if (startOrEnd === "end") {
            currentTime = selectedTime || endTime;
            end = currentTime
            setShowTime(Platform.OS === 'ios' ? showTime : false)
            setEndTime(currentTime)
            setEndString(generateTimeString(currentTime))
        } else {
            throw (new Error("Time picker should be for start or end, no string supplied"))
        }
        if (startString !== "" || endString !== "") {
            if (start.getTime() > end.getTime()) {
                setEndTimeError(true)
            } else {
                setEndTimeError(false)
            }
        }
    }

    function showTimePicker(which) {
        setStartOrEnd(which)
        setShowTime(true);
    }

    function checkIsHourlyRateError() {
        if (isNaN(hourlyRate)) {
            setIsHourlyRateError(true)
        }
        else {
            setIsHourlyRateError(false)
        }
    }

    function jobSentConfirmation() {
        return <Portal>
            <Dialog
                visible={showJobConfirmation}
                onDismiss={() => setShowJobConfirmation(false)}>
                <Dialog.Title>Job request successfully submitted.</Dialog.Title>
                <Button onPress={() => clearForm()}>Ok</Button>
            </Dialog>
        </Portal>;
    }

    return (
        <View style={styles.containerStyle}>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <Text style={styles.headingStyle}>Request a Worker</Text>

                <View style={{marginBottom: 15}}>
                    <TextInput
                        mode='flat'
                        label={"Hourly rate (£)"}
                        value={hourlyRate}
                        onChangeText={rate => {setHourlyRate(rate);
                                               checkIsHourlyRateError()}}
                        autoCorrect={false}
                        autoCapitalize="none"
                        onEndEditing={checkIsHourlyRateError}
                        error={isHourlyRateError}
                        keyboardType="numeric"
                    >
                    </TextInput>

                    {isHourlyRateError && <HelperText
                        type="error"
                        visible={isHourlyRateError}
                    >
                        Hourly rate input is not a number.
                    </HelperText>}
                </View>

                <TouchableOpacity onPress={showDatePicker}>
                    <TextInput
                        label='Date of shift'
                        value={dateString}
                        editable={false}
                        style={{marginBottom: 15}}
                    />
                </TouchableOpacity>

                {(showDate && <DateTimePicker
                        testID="dateTimePicker"
                        show={showDate}
                        value={date}
                        mode='date'
                        display="default"
                        onChange={onChangeDate}
                        minimumDate={Date.now()}
                    />
                )}

                <View style={{flexDirection: "row", marginBottom: 15}}>
                    <TouchableOpacity onPress={() => showTimePicker("start")} style={{flex: 1}}>
                        <TextInput
                            label='Start Time'
                            value={startString}
                            style={{flex: 1, marginRight: 5}}
                            error={endTimeError}
                            editable={false}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => showTimePicker("end")} style={{flex: 1}}>
                        <TextInput
                            label='End Time'
                            value={endString}
                            style={{flex: 1, marginRight: 5}}
                            error={endTimeError}
                            editable={false}
                        />
                    </TouchableOpacity>
                </View>

                {endTimeError && <HelperText
                    type="error"
                    visible={endTimeError}
                >
                    End time must be after start time
                </HelperText>}

                {(showTime && <DateTimePicker
                        testID="timePicker"
                        show={showTime}
                        value={startTime}
                        mode='time'
                        display="default"
                        onChange={onChangeTime}
                        is24Hour={true}
                    />
                )}

                <SelectCredentials selectedCredentials={setCredentials}
                                   title={"What kind of worker would you like to request?"}
                refresh={refresh}>
                </SelectCredentials>

                <TextInput
                    mode='flat'
                    label={"Extra Info:"}
                    value={extraInfo}
                    onChangeText={info => setExtraInfo(info)}
                    multiline={true}
                    numberOfLines={5}
                />

            </ScrollView>
            <View style={{margin: 15}}>
                <Button
                    mode={'contained'}
                    disabled={hourlyRate === "" || isHourlyRateError
                    || dateString === "" || startString === ""
                    || endString === "" || endTimeError || credentials.length === 0}
                    onPress={() => {
                        sendJobRequest({
                            restaurantId: restaurantId,
                            hourlyRate: hourlyRate,
                            date: dateString,
                            startTime: startString,
                            endTime: endString,
                            credentials: credentials,
                            extraInfo: extraInfo
                        }).then(r => {
                            console.log(r);
                            // notifyMessage("Job Request successfully submitted");
                            setShowJobConfirmation(true)
                        });
                    }}>
                    Submit
                </Button>
            </View>
            {jobSentConfirmation()}
        </View>
    );
}

const styles = StyleSheet.create({

    flexGrow: 1,

    containerStyle: {
        flex: 1,
        flexGrow: 1,
    },

    scrollViewStyle: {
        padding: 15,
        justifyContent: 'center',
    },

    headingStyle: {
        fontSize: 30,

        textAlign: 'center',

        marginTop: 20,
        marginBottom: 40,
    },
});

export default RequestForm;
