import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  ImageBackground
} from 'react-native';
import {
  Button,
  IconButton,
  Divider,
} from 'react-native-paper';
import {CommonActions, useNavigation} from '@react-navigation/native';
import MapView from 'react-native-maps';
import MapMarker from 'react-native-maps/lib/components/MapMarker';
import UserCardInfo from "../../components/UserCardInfo";

export default function RestaurantProfile({data}) {

  // const [name, setName] = useState(data.name);
  // const [address, setAddress] = useState(data.address);
  // const [phone, setPhone] = useState(data.phone);
  // const [longitude, setLongitude] = useState(data.longitude);
  // const [latitude, setLatitude] = useState(data.latitude);
  // const [facebookLink, setFacebookLink] = useState(data.facebookLink);
  // const [twitterLink, setTwitterLink] = useState(data.twitterLink);
  // const [instagramLink, setInstagramLink] = useState(data.instagramLink);
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
          onPress = {() => navigation.goBack()}
        />
      </ImageBackground>

      <View style={styles.userNameRow}>
        <Text style={styles.userNameText}>Eastside Cafe</Text>
      <View style={styles.userContactInfoContainer}>

      </View>
        <View style={styles.userContactInfoRow}>
          <Button icon='cellphone' onPress={() => console.log('number')}> 025699-84529
          </Button>
        </View>
        <View style={styles.userContactInfoRow}>
          <Button icon='email' onPress={() => console.log('email')}> eastsidecafe.com
          </Button>
        </View>
      </View>

      <Divider />


      <View style={styles.userBioRow}>
        <Text style={styles.userBioText}>Our mission is to serve the downtown business community by providing the highest-quality coffees, sandwiches, snacks, baked goods, noodles, rice and specialty laksa and Laksam in an atmosphere that meets the needs of customers who are in a hurry as well as those who want a place to relax and enjoy their beverages and food.</Text>
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

      <View style={[styles.userContactInfoRow, {paddingTop: 5, paddingBottom: 10}]}>
        <Button icon='map-marker' />
        <Text style={styles.userContactInfoRow}>
          Princes Gardens,
          London,
          SW72AZ
        </Text>
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
    color: 'rgba(237, 237, 237, 0.8)',
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