import React,  {useState} from 'react';

import {View, StyleSheet, ScrollView, Text, ToastAndroid, Platform, Alert} from 'react-native';

import FormBuilder from 'react-native-paper-form-builder';

import {useForm} from 'react-hook-form';

import {Button} from 'react-native-paper';
import {sendJobRequest} from '../api/APIUtils';

function RequestForm() {
  const [restaurantId, setRestaurantId] = useState("5ed97666d9f7426d776ae195");
  const [expertiseId, setExpertiseId] = useState(1);
  const form = useForm({
    defaultValues: {
      restaurantId: '5ed97666d9f7426d776ae195',
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

              label: 'Job Strategy',
              options: [{value: 0, label: 'Current Workers'}, {value: 1, label: 'Previous Workers'}, {
                value: 2,
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
              sendJobRequest(data, restaurantId, expertiseId ).then(r => console.log(r));
              console.log('form data', data);
            })}>
            Submit
          </Button>

        </FormBuilder>
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
