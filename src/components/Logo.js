import {Text, View, Image, Dimensions, StyleSheet} from 'react-native';
import styles from 'react-native-login-screen/lib/src/components/Logo/Logo.style';
import Icon from 'react-native-dynamic-vector-icons/lib/components/Icon';
import {Avatar, Surface} from 'react-native-paper';
import React from 'react';

export default function () {


    return (
        <View style={styles.container}>
            <View style={styles.row}>
                    <Image source={require('../../resources/img/SwiftStaffLogoCroppedSmall.png')}
                           style={{flex: 1, height: screenHeight * 0.2, width: screenWidth * 0.5}}
                           resizeMode="contain"/>
            </View>
        </View>
    );
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
