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
    Dimensions
} from 'react-native';

import {useForm} from 'react-hook-form';

import {Button, HelperText, TextInput} from 'react-native-paper';
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
          console.log(JSON.stringify(keys))
          let restId = await AsyncStorage.getItem("restaurantId");
          console.log(restId)
          setRestaurantId(restId);
        } catch (e) {
          console.log("no restaurantId found setting defualt");
        }

      })();
    }), []);

    const [restaurantId, setRestaurantId] = useState("")

    const [hourlyRate, setHourlyRate] = useState("")
    const [isHourlyRateError, setIsHourlyRateError] = useState("")
    const [date, setDate] = useState(new Date(Date.now()))
    const [dateString, setDateString] = useState(generateDateString(date))

    const [startOrEnd, setStartOrEnd] = useState("start")
    const [startTime, setStartTime] = useState(new Date(Date.now()))
    const [startString, setStartString] = useState("")
    const [endString, setEndString] = useState("")
    const [endTime, setEndTime] = useState("")

    const [showDate, setShowDate] = useState(false)
    const [showTime, setShowTime] = useState(false)

    const [credentials, setCredentials] = useState([])

    const [extraInfo, setExtraInfo] = useState("")

    function generateDateString(d) {
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    function generateTimeString(time) {
        return `${time.getHours()}:${time.getMinutes()}`
    }

    function onChangeDate(event, selectedDate) {
        const currentDate = selectedDate || date;
        setShowDate(Platform.OS === 'ios')
        setDate(currentDate)
        setDateString(generateDateString(currentDate))
    }

    function showDatePicker() {
        setShowDate(true);
    }

    function onChangeTime(event, selectedTime) {
        let currentTime;
        if (startOrEnd === "start") {
            currentTime = selectedTime || startTime;
            setShowTime(Platform.OS === 'ios')
            setStartTime(currentTime)
            setStartString(generateTimeString(currentTime))
        } else if (startOrEnd === "end") {
            currentTime = selectedTime || endTime;
            setShowTime(Platform.OS === 'ios')
            setEndTime(currentTime)
            setEndString(generateTimeString(currentTime))
        } else {
            throw (new Error("Time picker should be for start or end, no string supplied"))
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
    }

    return (
        <View style={styles.containerStyle}>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <Text style={styles.headingStyle}>Request a Worker</Text>

                <View>
                    <TextInput
                        mode='flat'
                        label={"Hourly rate (£)"}
                        value={hourlyRate}
                        onChangeText={rate => setHourlyRate(rate)}
                        autoCorrect={false}
                        autoCapitalize="none"
                        onEndEditing={checkIsHourlyRateError}
                        error={isHourlyRateError}
                        keyboardType="numeric"
                    >
                    </TextInput>
                    <HelperText
                        type="error"
                        visible={isHourlyRateError}
                    >
                        Hourly rate input is not a number.
                    </HelperText>
                </View>

                <TouchableWithoutFeedback>
                    <TextInput
                        label='Date of shift'
                        value={dateString}
                        caretHidden={true}
                        onFocus={showDatePicker}
                        onKeyPress={() => Keyboard.dismiss()}
                        style={{marginBottom: 15}}
                    />
                </TouchableWithoutFeedback>

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
                    <TouchableWithoutFeedback>
                        <TextInput
                            label='Start Time'
                            value={startString}
                            caretHidden={true}
                            onFocus={() => showTimePicker("start")}
                            onKeyPress={() => Keyboard.dismiss()}
                            style={{flex: 1, marginRight: 5}}
                        />
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback>
                        <TextInput
                            label='End time'
                            value={endString}
                            caretHidden={true}
                            onFocus={() => showTimePicker("end")}
                            onKeyPress={() => Keyboard.dismiss()}
                            style={{flex: 1, marginLeft: 5}}
                        />
                    </TouchableWithoutFeedback>
                </View>

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

                <SelectCredentials selectedCredentials={setCredentials}>
                </SelectCredentials>

                <Text>{credentials.toString()}</Text>

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
                            notifyMessage(JSON.stringify(r));
                            notifyMessage("Job Request successfully submitted");
                        });
                    }}>
                    Submit
                </Button>
            </View>
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
