import {Text, View} from 'react-native';
import styles from 'react-native-login-screen/lib/src/components/Logo/Logo.style';
import Icon from 'react-native-dynamic-vector-icons/lib/components/Icon';
import { Avatar } from 'react-native-paper';
import React from 'react';

export default function () {


  return (
    <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.textStyle}>SwiftStaff</Text>
          <View style={styles.iconStyle}>
            <Avatar.Image size={24} source={require('../../resources/img/logo.png')} />
          </View>
        </View>
    </View>
  );
}
