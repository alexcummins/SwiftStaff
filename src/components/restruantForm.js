import React from 'react';

import {View, StyleSheet, ScrollView, Text} from 'react-native';

import FormBuilder from 'react-native-paper-form-builder';

import {useForm} from 'react-hook-form';

import {Button} from 'react-native-paper';

function BasicExample() {
  const form = useForm({
    defaultValues: {
      email: '',

      password: '',
    },

    mode: 'onChange',
  });

  return (
    <View style={styles.containerStyle}>
      <Button
        title="Go back to home"
        onPress={() => navigation.navigate('Home')}
      />
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Text style={styles.headingStyle}>Request a Worker</Text>
        <FormBuilder
          form={form}
          formConfigArray={[
            {
              type: 'input',

              name: 'Hourly Rate',

              label: 'Hourly Rate',

              rules: {
                required: {
                  value: true,

                  message: 'Hourly Rate is required',
                },
              },

              textInputProps: {

                autoCapitalize: 'none',
              },
            },

            {
              type: 'input',

              name: 'Date',

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

              name: 'Start Time',

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

              name: 'End Time',

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

              name: 'Job Strategy',

              label: 'Job Strategy',
              options: [{value: 0, label:"Current Workers"}, {value: 1, label:"Previous Workers"}, {value: 2, label:"Open"}],

              rules: {
                required: {
                  value: false,
                },
              },

            },
            {
              type: 'input',

              name: 'Extra Info',

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

export default BasicExample;
