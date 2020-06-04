import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  ToastAndroid,
  Alert,
  Image,
  Dimensions,
  ImageBackground
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  IconButton, Divider,
} from 'react-native-paper';
import {CommonActions, useNavigation} from '@react-navigation/native';
import MapView from 'react-native-maps';
import MapMarker from 'react-native-maps/lib/components/MapMarker';
import UserCardInfo from "../../components/UserCardInfo";

export default function RestaurantProfileScreen({restaurant}) {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <ImageBackground
        source={require('../../../resources/img/restaurantfront.jpg')}
        style={styles.imageContainer}
      >
        <IconButton
          icon='chevron-left-circle'
          size={30}
          color='rgb(237, 237, 237)'

          style={styles.buttonAlign}
        />
      </ImageBackground>


      <View style={styles.userNameRow}>
        <Text style={styles.userNameText}>Restaurant Name</Text>
      <View style={styles.userContactInfoContainer}>

      </View>
        <View style={styles.userContactInfoRow}>
          <Button icon='cellphone' onPress={() => console.log('number')}/>
          <Text style={styles.userContactInfoRow}>Number</Text>
        </View>
        <View style={styles.userContactInfoRow}>
          <Button icon='email' onPress={() => console.log('email address')}/>
          <Text style={styles.userContactInfoRow}>Email Address</Text>
        </View>
      </View>

      <Divider />


      <View style={styles.userBioRow}>
        <Text style={styles.userBioText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
      </View>

      <View style={styles.socialRow}>
        <IconButton
          icon='twitter'
          size={35}
          color='#56ACEE'
          onPress={() => console.log('twitter')}
        />
        <IconButton
          icon='facebook'
          size={35}
          color='#3B5A98'
          onPress={() => console.log('facebook')}
        />
        <IconButton
          icon='instagram'
          size={35}
          color='#bc2a8d'
          onPress={() => console.log('instagram')}
        />
      </View>

      <Divider />

      <View style={[styles.userContactInfoRow, {paddingTop: 5, paddingBottom: 5}]}>
        <Button icon='map-marker' />
        <Text style={styles.userContactInfoRow}>Location</Text>
      </View>

      <View style={styles.container}>
        <MapView style={styles.mapStyle} showsUserLocation={true}
                 initialRegion={{
                   latitude: 51.499014,
                   longitude: -0.172002,
                   latitudeDelta: 0.1,
                   longitudeDelta: 0.1,
                 }}>
          <MapMarker coordinate={{latitude: 51.499014, longitude: -0.172002}}/>
        </MapView>
      </View>

    </ScrollView>
  )

}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    height: width * (3 / 5),
  },
  buttonAlign: {
    alignItems: 'flex-start',
  },
  titleContainer: {
    // color: 'rgba(237, 237, 237, 0.8)',
    fontSize: 28,
    fontWeight: '600',
    paddingLeft: 15,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  userNameRow: {
    marginTop: 15,
    marginBottom: 10,
  },
  userBioRow: {
    marginLeft: 40,
    marginRight: 40,
  },
  userNameText: {
    color: '#5B5A5A',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userBioText: {
    paddingTop: 10,
    color: 'rgba(77, 88, 96, 0.7)',
    fontSize: 13.5,
    textAlign: 'center',
  },
  userContactInfoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -5,

  },
  userContactInfoText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userContactInfoContainer: {
    flexDirection: 'column',
  },
  mapStyle: {
    width,
    height: width * (3/4),
  },

});