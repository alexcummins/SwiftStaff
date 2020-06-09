import React,  {useState} from 'react';

import {View, StyleSheet, ScrollView, Text, ToastAndroid, Platform, Alert, Keyboard} from 'react-native';

import FormBuilder from 'react-native-paper-form-builder';

import {useForm} from 'react-hook-form';

import {Button, TextInput} from 'react-native-paper';
import {sendJobRequest} from '../api/APIUtils';
import {notifyMessage} from '../api/Utils';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import DateTimePicker from "@react-native-community/datetimepicker";

function RequestForm() {
  const [restaurantId, setRestaurantId] = useState("")
  const [expertiseId, setExpertiseId] = useState(1)
  const [date, setDate] = useState(Date.now())
  const [dateString, setDateString] = useState(Date.now())
  const [show, setShow] = useState(false)

  function onChange(event, selectedDate) {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios')
    setDate(currentDate)
    setDateString(`${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`)
  }

  function showDatePicker() {
    setShow(true);
  }

  function checkDateString() {
    setDateString(dateString)
    setDateString("Hello")
  }

  const form = useForm({
    defaultValues: {
      restaurantId: ' ',
      sendStrategyId: 1,
      hourlyRate: '10.75',
      expertiseId: 1,
      date: new Date().toJSON().slice(0, 10).split('-').reverse().join('/').toString(),
      startTime: '',
      endTime: '',
      extraInfo: '',
    },

    mode: 'onChange',
  });


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
  return (
    <View style={styles.containerStyle}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Text style={styles.headingStyle}>Request a Worker</Text>
        <FormBuilder
          form={form}
          formConfigArray={[
            {
              type: 'input',

              name: 'hourlyRate',

              label: 'Hourly Rate',

              rules: {
                required: {
                  value: true,

                  message: 'Hourly Rate is Required',
                },
              },

              textInputProps: {
                autoCapitalize: 'none',
              },
            },

            {
              type: 'input',

              name: 'date',

              label: 'Date',

              rules: {
                required: {
                  value: true,

                  message: 'Date is required',
                },
              },

              textInputProps: {
                label: 'Date of birth',
                value: dateString,
                caretHidden: true,
                onFocus: showDatePicker,
                onKeyPress: Keyboard.dismiss,
                onChange: checkDateString,
                secureTextEntry: false,
              },
            },

            {
              type: 'input',

              name: 'startTime',

              label: 'Start Time',

              rules: {
                required: {
                  value: true,

                  message: 'Start time is required',
                },
              },

              textInputProps: {
                secureTextEntry: false,
              },
            },
            {
              type: 'input',

              name: 'endTime',

              label: 'End Time',

              rules: {
                required: {
                  value: true,

                  message: 'End time is required',
                },
              },

              textInputProps: {
                secureTextEntry: false,
              },
            },
            {
              type: 'select',

              name: 'sendStrategy',

              label: 'Job Category',
              options: [{value: 0, label: 'Cocktail Bar Staff'}, {value: 1, label: 'General Bar Staff'}, {
                value: 2,
                label: 'Wait Person',
              }, {
                value: 3,
                label: 'Front of House',
              }, {
                value: 4,
                label: 'Open',
              }],

              rules: {
                required: {
                  value: false,
                },
              },

            },
            {
              type: 'input',

              name: 'extraInfo',

              label: 'Extra Info',

              rules: {
                required: {
                  value: false,
                },
              },

              textInputProps: {
                secureTextEntry: false,
              },
            },
          ]}>
          <Button
            mode={'contained'}
            onPress={form.handleSubmit((data: any) => {
              sendJobRequest(data, restaurantId, expertiseId ).then(r => {
                console.log(r);
                notifyMessage("Job Request successfully submitted");
              });
              console.log('form data', data);
            })}>
            Submit
          </Button>

        </FormBuilder>

        {(show && <DateTimePicker
                testID="dateTimePicker"
                show={show}
                value={date}
                mode='date'
                display="default"
                onChange={onChange}
            />
        )}

      </ScrollView>
    </View>
  );
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

export default RequestForm;
